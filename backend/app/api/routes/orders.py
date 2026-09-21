"""Routes commandes + livraison (US-15/17/18/19/20/27/28/39/40/41).

Contrats pour Charles :
- GET /api/v1/delivery-zones -> [{id, name, fee...}] (calcul frais côté client US-20)
- POST /api/v1/orders (public, JWT optionnel) -> 201 OrderOut
- GET /api/v1/orders/{reference} (public) -> suivi sans compte
- GET /api/v1/orders/me (Bearer) -> historique client
- GET /api/v1/admin/orders?status=&q= + PATCH /api/v1/admin/orders/{id}/status
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_user, require_admin
from app.crud import order as crud
from app.db.session import get_db
from app.models import DeliveryZone, Order, User
from app.models.enums import DeliveryMode, OrderStatus
from app.schemas.order import OrderCreateIn, OrderOut, OrderStatusIn, ZoneOut

router = APIRouter(tags=["commandes"])
optional_bearer = HTTPBearer(auto_error=False)


def _optional_user(
    creds: HTTPAuthorizationCredentials | None = Depends(optional_bearer),
    db: Session = Depends(get_db),
) -> User | None:
    if creds is None:
        return None
    try:
        from app.core.security import decode_token
        payload = decode_token(creds.credentials)
        user = db.get(User, int(payload.get("sub", 0)))
        return user if user and user.is_active else None
    except Exception:
        return None


@router.get("/delivery-zones", response_model=list[ZoneOut])
def get_zones(db: Session = Depends(get_db)):
    return db.query(DeliveryZone).filter(DeliveryZone.is_active.is_(True)).order_by(DeliveryZone.fee).all()


@router.post("/orders", response_model=OrderOut, status_code=201)
def create_order(data: OrderCreateIn, db: Session = Depends(get_db), user: User | None = Depends(_optional_user)):
    try:
        mode = DeliveryMode(data.delivery_mode)
    except ValueError:
        raise HTTPException(status_code=422, detail="delivery_mode invalide (domicile | retrait)")
    try:
        order = crud.create_order(
            db, [(i.slug, i.quantity) for i in data.items], user,
            data.guest_name, data.guest_phone, data.guest_email, mode, data.zone_id, data.delivery_address,
        )
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return OrderOut(**crud.order_to_out(crud.get_order_full(db, order.id)))


@router.get("/orders/me", response_model=list[OrderOut])
def my_orders(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    orders = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(crud.OrderItem.product), joinedload(Order.zone))
        .filter(Order.user_id == user.id).order_by(Order.created_at.desc()).limit(100).all()
    )
    return [OrderOut(**crud.order_to_out(o)) for o in orders]


@router.get("/orders/{reference}", response_model=OrderOut)
def track_order(reference: str, db: Session = Depends(get_db)):
    order = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(crud.OrderItem.product), joinedload(Order.zone), joinedload(Order.user))
        .filter(Order.reference == reference).first()
    )
    if order is None:
        raise HTTPException(status_code=404, detail="Commande introuvable")
    return OrderOut(**crud.order_to_out(order))


@router.get("/admin/orders", response_model=list[OrderOut])
def admin_orders(status: str | None = None, q: str | None = Query(default=None, max_length=100),
                 db: Session = Depends(get_db), _=Depends(require_admin)):
    query = db.query(Order).options(
        joinedload(Order.items).joinedload(crud.OrderItem.product), joinedload(Order.zone), joinedload(Order.user))
    if status:
        try:
            query = query.filter(Order.status == OrderStatus(status))
        except ValueError:
            raise HTTPException(status_code=422, detail="status invalide")
    if q:
        like = f"%{q}%"
        query = query.filter(or_(Order.reference.ilike(like), Order.guest_phone.ilike(like), Order.guest_name.ilike(like)))
    return [OrderOut(**crud.order_to_out(o)) for o in query.order_by(Order.created_at.desc()).limit(200).all()]


@router.patch("/admin/orders/{id}/status", response_model=OrderOut)
def admin_status(id: int, data: OrderStatusIn, db: Session = Depends(get_db), _=Depends(require_admin)):
    try:
        new_status = OrderStatus(data.status)
    except ValueError:
        raise HTTPException(status_code=422, detail="status invalide")
    order = crud.get_order_full(db, id)
    if order is None:
        raise HTTPException(status_code=404, detail="Commande introuvable")
    try:
        order = crud.change_status(db, order, new_status)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    return OrderOut(**crud.order_to_out(crud.get_order_full(db, order.id)))
