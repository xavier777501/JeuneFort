"""Tests US-S1 — les 10 tables sont modélisées et la migration existe."""

import os
from app.db.base import Base
import app.models  # noqa: F401


def test_dix_tables_enregistrees():
    tables = set(Base.metadata.tables.keys())
    attendues = {
        "users", "categories", "products", "product_images", "services",
        "delivery_zones", "orders", "order_items", "payments", "contact_requests",
    }
    assert attendues.issubset(tables), f"Tables manquantes : {attendues - tables}"


def test_migration_initiale_existe():
    versions = os.path.join(os.path.dirname(__file__), "..", "alembic", "versions")
    fichiers = [f for f in os.listdir(versions) if f.endswith(".py")]
    assert len(fichiers) >= 1, "Aucune migration Alembic trouvée"
