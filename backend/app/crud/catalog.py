"""CRUD catalogue : catégories, produits, services, demandes."""

from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.models import Category, ContactRequest, Product, ProductImage, Service
from app.models.enums import ProductStatus, RequestStatus, RequestType


def product_to_out(p: Product) -> dict:
    return {
        "id": p.id,
        "name": p.name,
        "slug": p.slug,
        "category_slug": p.category.slug,
        "category_name": p.category.name,
        "price": p.price,
        "unit": p.unit,
        "status": p.status.value,
        "stock_quantity": p.stock_quantity,
        "images": [img.image_url for img in sorted(p.images, key=lambda i: i.position)],
        "short_description": p.short_description,
        "full_description": p.full_description,
        "specifications": p.specifications,
        "is_featured": p.is_featured,
        "min_order_quantity": p.min_order_quantity,
        "rating": p.rating,
    }


def list_categories(db: Session) -> list[Category]:
    return db.query(Category).filter(Category.is_active.is_(True)).order_by(Category.name).all()


def list_products(
    db: Session, category: str | None = None, q: str | None = None,
    status: str | None = None, min_price: int | None = None,
    max_price: int | None = None, featured: bool | None = None,
    page: int = 1, size: int = 20,
) -> tuple[int, list[Product]]:
    query = (
        db.query(Product)
        .join(Category)
        .options(joinedload(Product.images), joinedload(Product.category))
        .filter(Product.is_active.is_(True))
    )
    if category:
        query = query.filter(Category.slug == category)
    if q:
        like = f"%{q}%"
        query = query.filter(or_(Product.name.ilike(like), Product.short_description.ilike(like)))
    if status:
        query = query.filter(Product.status == ProductStatus(status))
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)
    if featured is not None:
        query = query.filter(Product.is_featured.is_(featured))
    total = query.count()
    items = query.order_by(Product.is_featured.desc(), Product.name).offset((page - 1) * size).limit(size).all()
    return total, items


def get_product(db: Session, slug_or_id: str) -> Product | None:
    query = db.query(Product).options(joinedload(Product.images), joinedload(Product.category)).filter(Product.is_active.is_(True))
    p = query.filter(Product.slug == slug_or_id).first()
    if p is None and slug_or_id.isdigit():
        p = query.filter(Product.id == int(slug_or_id)).first()
    return p


def create_request(db: Session, type_: RequestType, nom: str, telephone: str, email: str | None,
                   sujet: str | None, message: str, service_id: int | None = None) -> ContactRequest:
    req = ContactRequest(type=type_, nom=nom.strip(), telephone=telephone.strip(), email=email,
                         sujet=sujet, message=message.strip(), service_id=service_id,
                         statut=RequestStatus.NOUVEAU)
    db.add(req)
    db.commit()
    db.refresh(req)
    return req
