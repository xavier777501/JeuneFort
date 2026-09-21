"""Registre des modèles — importé par Alembic (env.py) et init_db."""

from app.models.enums import (
    UserRole, ProductStatus, DeliveryMode, OrderStatus,
    PaymentMethod, PaymentStatus, RequestType, RequestStatus,
)
from app.models.user import User
from app.models.category import Category
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.service import Service
from app.models.delivery_zone import DeliveryZone
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.payment import Payment
from app.models.contact_request import ContactRequest

__all__ = [
    "User", "Category", "Product", "ProductImage", "Service",
    "DeliveryZone", "Order", "OrderItem", "Payment", "ContactRequest",
    "UserRole", "ProductStatus", "DeliveryMode", "OrderStatus",
    "PaymentMethod", "PaymentStatus", "RequestType", "RequestStatus",
]
