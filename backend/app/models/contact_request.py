"""Table 10/10 — Demandes (contact US-29/43 + devis US-07, même back-office admin/demandes)."""

from datetime import datetime
from sqlalchemy import String, Text, ForeignKey, DateTime, func
from sqlalchemy import Enum as SAEnum
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.enums import RequestType, RequestStatus


class ContactRequest(Base):
    __tablename__ = "contact_requests"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    type: Mapped[RequestType] = mapped_column(
        SAEnum(RequestType, native_enum=False, length=20),
        default=RequestType.CONTACT, nullable=False, index=True,
    )
    service_id: Mapped[int | None] = mapped_column(ForeignKey("services.id", ondelete="SET NULL"), nullable=True)
    nom: Mapped[str] = mapped_column(String(150), nullable=False)
    telephone: Mapped[str] = mapped_column(String(30), nullable=False, index=True)
    email: Mapped[str | None] = mapped_column(String(255), nullable=True)
    sujet: Mapped[str | None] = mapped_column(String(255), nullable=True)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    statut: Mapped[RequestStatus] = mapped_column(
        SAEnum(RequestStatus, native_enum=False, length=20),
        default=RequestStatus.NOUVEAU, nullable=False, index=True,
    )
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)

    service: Mapped["Service | None"] = relationship(back_populates="requests")
