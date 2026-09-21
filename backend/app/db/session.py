"""Connexion MySQL + session SQLAlchemy (US-S1).

Utilise DATABASE_URL depuis .env (WAMP local par défaut :
mysql+pymysql://root@localhost:3306/jeune_fort_agrobusiness).
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from typing import Generator

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    pool_recycle=3600,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


def get_db() -> Generator[Session, None, None]:
    """Dépendance FastAPI : fournit une session DB par requête."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
