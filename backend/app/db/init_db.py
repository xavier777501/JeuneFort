"""Création des tables + seed minimal (US-S1). Usage : python -m app.db.init_db"""

from app.db.base import Base
from app.db.session import engine
import app.models  # noqa: F401 — enregistre les 10 tables


def init_db() -> None:
    Base.metadata.create_all(bind=engine)
    print(f"Tables créées : {sorted(Base.metadata.tables.keys())}")


if __name__ == "__main__":
    init_db()
