"""Table 1/10 — Utilisateurs (clients + admins). US-13/14/16/32."""

from datetime import datetime
from sqlalchemy import String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import UserRole
from sqlalchemy import Enum as SAEnum


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    nom: Mapped[str] = mapped_column(String(150), nullable=False)
    telephone: Mapped[str] = mapped_column(String(30), unique=True, nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(190), unique=True, nullable=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(SAEnum(UserRole, native_enum=False, length=20), default=UserRole.CLIENT, nullable=False)
    adresse: Mapped[str | None] = mapped_column(String(500), nullable=True)
    ville: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    orders: Mapped[list["Order"]] = relationship(back_populates="user")
