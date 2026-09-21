"""Base déclarative SQLAlchemy partagée par tous les modèles (US-S1)."""

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass
