"""Routes catalogue public + admin (US-01/02/03/06/07/08/29/34/35/36/37/38).

Contrats pour Charles (remplacent lib/mock-data.ts) :
- GET /api/v1/categories
- GET /api/v1/products?category=&q=&status=&min_price=&max_price=&featured=&page=&size=
- GET /api/v1/products/{slug} (slug ou id)
- GET /api/v1/services, GET /api/v1/services/{slug}
- POST /api/v1/contact, POST /api/v1/devis
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.api.deps import require_admin
from app.crud import catalog as crud
from app.db.session import get_db
from app.models import Category, Product, ProductImage, Service
from app.models.enums import ProductStatus, RequestStatus, RequestType
from app.schemas.catalog import (
    CategoryCreateIn, CategoryOut, CategoryUpdateIn, ContactIn,
    ProductCreateIn, ProductListOut, ProductOut, ProductUpdateIn,
    RequestOut, RequestStatusIn, ServiceCreateIn, ServiceOut, ServiceUpdateIn, StockUpdateIn,
)

router = APIRouter(tags=["catalogue"])


# ── Public : catégories ──
@router.get("/categories", response_model=list[CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    cats = crud.list_categories(db)
    return [
        CategoryOut(
            id=c.id, name=c.name, slug=c.slug, description=c.description, image_url=c.image_url,
            product_count=db.query(Product).filter(Product.category_id == c.id, Product.is_active.is_(True)).count(),
        )
        for c in cats
    ]


# ── Public : produits ──
@router.get("/products", response_model=ProductListOut)
def get_products(
    category: str | None = None, q: str | None = Query(default=None, max_length=100),
    status: str | None = None, min_price: int | None = Query(default=None, ge=0),
    max_price: int | None = Query(default=None, ge=0), featured: bool | None = None,
    page: int = Query(default=1, ge=1), size: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    if status and status not in [s.value for s in ProductStatus]:
        raise HTTPException(status_code=422, detail=f"status invalide : {status}")
    total, items = crud.list_products(db, category, q, status, min_price, max_price, featured, page, size)
    return ProductListOut(total=total, page=page, size=size, items=[ProductOut(**crud.product_to_out(p)) for p in items])


@router.get("/products/{slug}", response_model=ProductOut)
def get_product(slug: str, db: Session = Depends(get_db)):
    p = crud.get_product(db, slug)
    if p is None:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    return ProductOut(**crud.product_to_out(p))


# ── Public : services ──
@router.get("/services", response_model=list[ServiceOut])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).filter(Service.is_active.is_(True)).order_by(Service.id).all()


@router.get("/services/{slug}", response_model=ServiceOut)
def get_service(slug: str, db: Session = Depends(get_db)):
    s = db.query(Service).filter(Service.slug == slug, Service.is_active.is_(True)).first()
    if s is None:
        raise HTTPException(status_code=404, detail="Service introuvable")
    return s


# ── Public : contact + devis ──
def _create_demande(data: ContactIn, type_: RequestType, db: Session) -> RequestOut:
    service_id = None
    service_slug = None
    if data.service_slug:
        s = db.query(Service).filter(Service.slug == data.service_slug).first()
        if s is None:
            raise HTTPException(status_code=404, detail="Service introuvable")
        service_id, service_slug = s.id, s.slug
    req = crud.create_request(db, type_, data.nom, data.telephone, data.email, data.sujet, data.message, service_id)
    return RequestOut(id=req.id, type=req.type.value, service_slug=service_slug, nom=req.nom,
                      telephone=req.telephone, statut=req.statut.value)


@router.post("/contact", response_model=RequestOut, status_code=201)
def post_contact(data: ContactIn, db: Session = Depends(get_db)):
    return _create_demande(data, RequestType.CONTACT, db)


@router.post("/devis", response_model=RequestOut, status_code=201)
def post_devis(data: ContactIn, db: Session = Depends(get_db)):
    return _create_demande(data, RequestType.DEVIS, db)


# ── Admin : catégories ──
@router.post("/admin/categories", response_model=CategoryOut, status_code=201)
def admin_create_category(data: CategoryCreateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Category).filter(Category.slug == data.slug).first():
        raise HTTPException(status_code=409, detail="Slug déjà utilisé")
    c = Category(name=data.name, slug=data.slug, description=data.description, image_url=data.image_url)
    db.add(c)
    db.commit()
    db.refresh(c)
    return CategoryOut(id=c.id, name=c.name, slug=c.slug, description=c.description, image_url=c.image_url, product_count=0)


@router.patch("/admin/categories/{slug}", response_model=CategoryOut)
def admin_update_category(slug: str, data: CategoryUpdateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    c = db.query(Category).filter(Category.slug == slug).first()
    if c is None:
        raise HTTPException(status_code=404, detail="Catégorie introuvable")
    for field in ("name", "description", "image_url", "is_active"):
        value = getattr(data, field)
        if value is not None:
            setattr(c, field, value)
    db.commit()
    db.refresh(c)
    return CategoryOut(id=c.id, name=c.name, slug=c.slug, description=c.description, image_url=c.image_url, product_count=0)


# ── Admin : produits ──
@router.post("/admin/products", response_model=ProductOut, status_code=201)
def admin_create_product(data: ProductCreateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    cat = db.query(Category).filter(Category.slug == data.category_slug).first()
    if cat is None:
        raise HTTPException(status_code=404, detail="Catégorie introuvable")
    if db.query(Product).filter(Product.slug == data.slug, Product.is_active.is_(True)).first():
        raise HTTPException(status_code=409, detail="Slug déjà utilisé")
    try:
        status = ProductStatus(data.status)
    except ValueError:
        raise HTTPException(status_code=422, detail=f"status invalide : {data.status}")
    p = Product(name=data.name, slug=data.slug, category_id=cat.id, short_description=data.short_description,
                full_description=data.full_description, specifications=data.specifications, price=data.price,
                unit=data.unit, stock_quantity=data.stock_quantity, status=status,
                is_featured=data.is_featured, min_order_quantity=data.min_order_quantity, rating=data.rating)
    db.add(p)
    db.flush()
    for i, url in enumerate(data.images):
        db.add(ProductImage(product_id=p.id, image_url=url, position=i))
    db.commit()
    p = crud.get_product(db, data.slug)
    return ProductOut(**crud.product_to_out(p))


@router.patch("/admin/products/{slug}", response_model=ProductOut)
def admin_update_product(slug: str, data: ProductUpdateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    p = db.query(Product).filter(Product.slug == slug).first()
    if p is None:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    payload = data.model_dump(exclude_unset=True, exclude={"images"})
    if "status" in payload and payload["status"] is not None:
        try:
            payload["status"] = ProductStatus(payload["status"])
        except ValueError:
            raise HTTPException(status_code=422, detail="status invalide")
    for field, value in payload.items():
        setattr(p, field, value)
    if data.images is not None:
        db.query(ProductImage).filter(ProductImage.product_id == p.id).delete()
        for i, url in enumerate(data.images):
            db.add(ProductImage(product_id=p.id, image_url=url, position=i))
    db.commit()
    p = crud.get_product(db, slug)
    return ProductOut(**crud.product_to_out(p))


@router.patch("/admin/products/{slug}/stock", response_model=ProductOut)
def admin_update_stock(slug: str, data: StockUpdateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    return admin_update_product(slug, ProductUpdateIn(stock_quantity=data.stock_quantity, status=data.status), db)


@router.delete("/admin/products/{slug}", status_code=204)
def admin_delete_product(slug: str, db: Session = Depends(get_db), _=Depends(require_admin)):
    p = db.query(Product).filter(Product.slug == slug).first()
    if p is None:
        raise HTTPException(status_code=404, detail="Produit introuvable")
    p.is_active = False
    db.commit()
    return None


# ── Admin : services ──
@router.post("/admin/services", response_model=ServiceOut, status_code=201)
def admin_create_service(data: ServiceCreateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    if db.query(Service).filter(Service.slug == data.slug).first():
        raise HTTPException(status_code=409, detail="Slug déjà utilisé")
    s = Service(**data.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


@router.patch("/admin/services/{slug}", response_model=ServiceOut)
def admin_update_service(slug: str, data: ServiceUpdateIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    s = db.query(Service).filter(Service.slug == slug).first()
    if s is None:
        raise HTTPException(status_code=404, detail="Service introuvable")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(s, field, value)
    db.commit()
    db.refresh(s)
    return s


# ── Admin : demandes ──
@router.get("/admin/requests", response_model=list[RequestOut])
def admin_list_requests(type: str | None = None, statut: str | None = None,
                        db: Session = Depends(get_db), _=Depends(require_admin)):
    from app.models import ContactRequest
    query = db.query(ContactRequest).order_by(ContactRequest.created_at.desc())
    if type:
        query = query.filter(ContactRequest.type == RequestType(type))
    if statut:
        query = query.filter(ContactRequest.statut == RequestStatus(statut))
    return [RequestOut(id=r.id, type=r.type.value, service_slug=r.service.slug if r.service else None,
                       nom=r.nom, telephone=r.telephone, statut=r.statut.value) for r in query.limit(200).all()]


@router.patch("/admin/requests/{id}", response_model=RequestOut)
def admin_update_request(id: int, data: RequestStatusIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    from app.models import ContactRequest
    try:
        statut = RequestStatus(data.statut)
    except ValueError:
        raise HTTPException(status_code=422, detail="statut invalide")
    r = db.get(ContactRequest, id)
    if r is None:
        raise HTTPException(status_code=404, detail="Demande introuvable")
    r.statut = statut
    db.commit()
    db.refresh(r)
    return RequestOut(id=r.id, type=r.type.value, service_slug=r.service.slug if r.service else None,
                      nom=r.nom, telephone=r.telephone, statut=r.statut.value)
