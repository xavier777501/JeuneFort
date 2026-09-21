from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="API e-commerce Jeune Fort Agrobusiness - documentation Swagger",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API versionnée (contrats consommés par le frontend Next.js)
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


@app.get("/", tags=["system"])
def root() -> dict:
    return {"service": settings.APP_NAME, "status": "ok"}


@app.get("/health", tags=["system"])
def health() -> dict:
    return {"status": "healthy"}
