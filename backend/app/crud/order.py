"""CRUD commandes : création transactionnelle + stock + statuts + notifications stub (US-21)."""

import logging
import secrets
from datetime import datetime

from sqlalchemy.orm import Session, joinedload

from app.models import DeliveryZone, Order, OrderItem, Product, User
from app.models.enums import DeliveryMode, OrderStatus

logger = logging.getLogger(__name__)

# Transitions autorisées (US-27/40)
ALLOWED_TRANSITIONS: dict[OrderStatus, set[OrderStatus]] = {
    OrderStatus.EN_ATTENTE_PAIEMENT: {OrderStatus.PAYEE, OrderStatus.ANNULEE},
    OrderStatus.PAYEE: {OrderStatus.EN_PREPARATION, OrderStatus.ANNULEE},
    OrderStatus.EN_PREPARATION: {OrderStatus.EXPEDIEE, OrderStatus.PRETE, OrderStatus.ANNULEE},
    OrderStatus.EXPEDIEE: {OrderStatus.LIVREE},
    OrderStatus.PRETE: {OrderStatus.RECUPEREE},
    OrderStatus.LIVREE: set(),
    OrderStatus.RECUPEREE: set(),
    OrderStatus.ANNULEE: set(),
}


def notify_order_created(order: Order) -> None:
    """Stub US-21 : loggé en attendant SMTP/SMS configurés."""
    contact = order.guest_phone or (order.user.telephone if order.user else "?")
    logger.info("NOTIF commande %s (%d FCFA) -> %s [stub, SMTP non configuré]", order.reference, order.total, contact)


def _new_reference(db: Session) -> str:
    year = datetime.now().year
    for _ in range(5):
        ref = f"JFA-{year}-{secrets.randbelow(900000) + 100000}"
        if not db.query(Order).filter_by(reference=ref).first():
            return ref
    raise RuntimeError("Impossible de générer une référence unique")


def create_order(
    db: Session, items: list[tuple[str, int]], user: User | None,
    guest_name: str | None, guest_phone: str | None, guest_email: str | None,
    delivery_mode: DeliveryMode, zone_id: int | None, delivery_address: str | None,
) -> Order:
    if user is None and not guest_phone:
        raise ValueError("Téléphone invité requis sans compte (US-15)")
    if delivery_mode == DeliveryMode.DOMICILE and not delivery_address:
        raise ValueError("Adresse de livraison requise pour domicile")

    fee = 0
    if delivery_mode == DeliveryMode.DOMICILE and zone_id is not None:
        zone = db.get(DeliveryZone, zone_id)
        if zone is None or not zone.is_active:
            raise ValueError("Zone de livraison invalide")
        fee = zone.fee

    order = Order(
        reference=_new_reference(db),
        user_id=user.id if user else None,
        guest_name=guest_name, guest_phone=guest_phone, guest_email=guest_email,
        delivery_mode=delivery_mode, zone_id=zone_id, delivery_address=delivery_address,
        status=OrderStatus.EN_ATTENTE_PAIEMENT,
    )
    db.add(order)
    db.flush()

    subtotal = 0
    for slug, qty in items:
        p = db.query(Product).filter(
            ((Product.slug == slug) | (Product.id == int(slug)) if slug.isdigit() else (Product.slug == slug)),
            Product.is_active.is_(True),
        ).first()
        if p is None:
            raise ValueError(f"Produit introuvable : {slug}")
        if p.stock_quantity < qty:
            raise ValueError(f"Stock insuffisant pour {p.name} (reste {p.stock_quantity})")
        p.stock_quantity -= qty
        line_total = p.price * qty
        subtotal += line_total
        db.add(OrderItem(order_id=order.id, product_id=p.id, quantity=qty, unit_price=p.price, total_price=line_total))

    order.subtotal = subtotal
    order.delivery_fee = fee
    order.total = subtotal + fee
    db.commit()
    db.refresh(order)
    notify_order_created(order)
    return order


def order_to_out(order: Order) -> dict:
    db_order = order
    return {
        "id": db_order.id,
        "reference": db_order.reference,
        "delivery_mode": db_order.delivery_mode.value,
        "zone_name": db_order.zone.name if db_order.zone else None,
        "delivery_address": db_order.delivery_address,
        "subtotal": db_order.subtotal,
        "delivery_fee": db_order.delivery_fee,
        "total": db_order.total,
        "status": db_order.status.value,
        "items": [
            {"product_slug": it.product.slug, "product_name": it.product.name, "quantity": it.quantity,
             "unit_price": it.unit_price, "total_price": it.total_price}
            for it in db_order.items
        ],
    }


def get_order_full(db: Session, order_id: int) -> Order | None:
    return (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product), joinedload(Order.zone), joinedload(Order.user))
        .filter(Order.id == order_id)
        .first()
    )


def change_status(db: Session, order: Order, new_status: OrderStatus) -> Order:
    if new_status not in ALLOWED_TRANSITIONS[order.status] and new_status != order.status:
        raise ValueError(f"Transition {order.status.value} -> {new_status.value} interdite")
    if new_status == OrderStatus.ANNULEE and order.status != OrderStatus.ANNULEE:
        for it in order.items:  # restock
            it.product.stock_quantity += it.quantity
    order.status = new_status
    db.commit()
    db.refresh(order)
    logger.info("NOTIF commande %s -> statut %s [stub]", order.reference, new_status.value)
    return order
