"""Endpoints système versionnés (US-S2). Montés sous /api/v1 via app.api.router."""

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db

router = APIRouter(tags=["system"])


@router.get("/health")
def health() -> dict:
    return {"status": "healthy", "service": settings.APP_NAME, "env": settings.APP_ENV}


@router.get("/health/db")
def health_db(db: Session = Depends(get_db)) -> dict:
    db.execute(text("SELECT 1"))
    tables = db.execute(text("SHOW TABLES")).fetchall()
    return {"status": "healthy", "database": "connected", "tables": len(tables)}
