"""Table 9/10 — Paiements Kkiapay. US-22/23/24/25/26."""

from datetime import datetime
from sqlalchemy import String, Integer, ForeignKey, DateTime, func, JSON
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import PaymentMethod, PaymentStatus


class Payment(Base):
    __tablename__ = "payments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"), unique=True, nullable=False, index=True)
    provider: Mapped[str] = mapped_column(String(50), default="kkiapay", nullable=False)
    method: Mapped[PaymentMethod] = mapped_column(
        SAEnum(PaymentMethod, native_enum=False, length=20), nullable=False,
    )
    amount: Mapped[int] = mapped_column(Integer, nullable=False)  # FCFA
    currency: Mapped[str] = mapped_column(String(10), default="XOF", nullable=False)
    transaction_ref: Mapped[str | None] = mapped_column(String(150), unique=True, nullable=True, index=True)
    status: Mapped[PaymentStatus] = mapped_column(
        SAEnum(PaymentStatus, native_enum=False, length=20),
        default=PaymentStatus.EN_ATTENTE, nullable=False, index=True,
    )
    raw_response: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    order: Mapped["Order"] = relationship(back_populates="payment")
