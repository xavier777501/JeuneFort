"""Routeur racine /api/v1 (US-S2). Chaque domaine ajoutera son router ici."""

from fastapi import APIRouter

from app.api.routes import auth, catalog, orders, system

api_router = APIRouter()
api_router.include_router(system.router)
api_router.include_router(auth.router)
api_router.include_router(catalog.router)
api_router.include_router(orders.router)
# Prochaines étapes : paiements, admin...
