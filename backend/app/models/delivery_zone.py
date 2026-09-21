"""Table 6/10 — Zones de livraison + frais. US-18/19/20/42."""

from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Text, Integer, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class DeliveryZone(Base):
    __tablename__ = "delivery_zones"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    fee: Mapped[int] = mapped_column(Integer, default=0, nullable=False)  # FCFA
    estimated_delay: Mapped[str | None] = mapped_column(String(150), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    orders: Mapped[list["Order"]] = relationship(back_populates="zone")
