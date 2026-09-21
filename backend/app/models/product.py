"""Table 3/10 — Produits. US-02/03/05/34/35/36/38."""

from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Text, Integer, Float, ForeignKey, func, JSON
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import ProductStatus


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False, index=True)
    slug: Mapped[str] = mapped_column(String(190), unique=True, nullable=False, index=True)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id", ondelete="RESTRICT"), nullable=False, index=True)
    short_description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    full_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    specifications: Mapped[list | None] = mapped_column(JSON, nullable=True)  # [{label, value}]
    price: Mapped[int] = mapped_column(Integer, nullable=False)  # FCFA
    unit: Mapped[str] = mapped_column(String(100), default="l'unité", nullable=False)
    stock_quantity: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[ProductStatus] = mapped_column(
        SAEnum(ProductStatus, native_enum=False, length=20),
        default=ProductStatus.EN_STOCK, nullable=False, index=True,
    )
    is_featured: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    min_order_quantity: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    rating: Mapped[float | None] = mapped_column(Float, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    category: Mapped["Category"] = relationship(back_populates="products")
    images: Mapped[list["ProductImage"]] = relationship(back_populates="product", cascade="all, delete-orphan")
    order_items: Mapped[list["OrderItem"]] = relationship(back_populates="product")
