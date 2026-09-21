"""Table 7/10 — Commandes (tunnel + invité + suivi). US-15/17/18/19/27/28/39/40/41."""

from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, DateTime, func
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import DeliveryMode, OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    reference: Mapped[str] = mapped_column(String(50), unique=True, nullable=False, index=True)
    user_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    # Infos invité (US-15 : tunnel complet sans compte, à partir du téléphone)
    guest_name: Mapped[str | None] = mapped_column(String(150), nullable=True)
    guest_phone: Mapped[str | None] = mapped_column(String(30), nullable=True, index=True)
    guest_email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    delivery_mode: Mapped[DeliveryMode] = mapped_column(
        SAEnum(DeliveryMode, native_enum=False, length=20), default=DeliveryMode.DOMICILE, nullable=False,
    )
    zone_id: Mapped[int | None] = mapped_column(ForeignKey("delivery_zones.id", ondelete="SET NULL"), nullable=True)
    delivery_address: Mapped[str | None] = mapped_column(String(500), nullable=True)
    subtotal: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    delivery_fee: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    total: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[OrderStatus] = mapped_column(
        SAEnum(OrderStatus, native_enum=False, length=30),
        default=OrderStatus.EN_ATTENTE_PAIEMENT, nullable=False, index=True,
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    user: Mapped["User | None"] = relationship(back_populates="orders")
    zone: Mapped["DeliveryZone | None"] = relationship(back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")
    payment: Mapped["Payment | None"] = relationship(back_populates="order", cascade="all, delete-orphan", uselist=False)
