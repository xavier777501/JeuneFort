"""Table 5/10 — Services (4 services sans prix + CRUD admin). US-06/07/08."""

from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, Text, func, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    slug: Mapped[str] = mapped_column(String(190), unique=True, nullable=False, index=True)
    short_description: Mapped[str | None] = mapped_column(String(500), nullable=True)
    full_description: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    icon_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    features: Mapped[list | None] = mapped_column(JSON, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    requests: Mapped[list["ContactRequest"]] = relationship(back_populates="service")
