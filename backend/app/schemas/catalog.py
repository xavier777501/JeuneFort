"""Schémas Pydantic catalogue + services + demandes (US-01/08, US-29)."""

from pydantic import BaseModel, Field


# ── Catégories ──
class CategoryOut(BaseModel):
    id: int
    name: str
    slug: str
    description: str | None
    image_url: str | None
    product_count: int = 0

    model_config = {"from_attributes": True}


class CategoryCreateIn(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    slug: str = Field(min_length=2, max_length=100)
    description: str | None = None
    image_url: str | None = Field(default=None, max_length=500)


class CategoryUpdateIn(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=150)
    description: str | None = None
    image_url: str | None = Field(default=None, max_length=500)
    is_active: bool | None = None


# ── Produits ──
class ProductOut(BaseModel):
    id: int
    name: str
    slug: str
    category_slug: str
    category_name: str
    price: int
    unit: str
    status: str
    stock_quantity: int
    images: list[str] = []
    short_description: str | None
    full_description: str | None
    specifications: list | None = None
    is_featured: bool
    min_order_quantity: int
    rating: float | None


class ProductListOut(BaseModel):
    total: int
    page: int
    size: int
    items: list[ProductOut]


class ProductCreateIn(BaseModel):
    name: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=190)
    category_slug: str
    short_description: str | None = Field(default=None, max_length=500)
    full_description: str | None = None
    specifications: list | None = None
    price: int = Field(ge=0)
    unit: str = Field(default="l'unité", max_length=100)
    stock_quantity: int = Field(default=0, ge=0)
    status: str = "EN_STOCK"
    images: list[str] = []
    is_featured: bool = False
    min_order_quantity: int = Field(default=1, ge=1)
    rating: float | None = Field(default=None, ge=0, le=5)


class ProductUpdateIn(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=255)
    short_description: str | None = Field(default=None, max_length=500)
    full_description: str | None = None
    specifications: list | None = None
    price: int | None = Field(default=None, ge=0)
    unit: str | None = Field(default=None, max_length=100)
    stock_quantity: int | None = Field(default=None, ge=0)
    status: str | None = None
    images: list[str] | None = None
    is_featured: bool | None = None
    min_order_quantity: int | None = Field(default=None, ge=1)
    rating: float | None = Field(default=None, ge=0, le=5)
    is_active: bool | None = None


class StockUpdateIn(BaseModel):
    stock_quantity: int = Field(ge=0)
    status: str | None = None


# ── Services ──
class ServiceOut(BaseModel):
    id: int
    title: str
    slug: str
    short_description: str | None
    full_description: str | None
    image_url: str | None
    icon_name: str | None
    features: list | None = None

    model_config = {"from_attributes": True}


class ServiceCreateIn(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    slug: str = Field(min_length=2, max_length=190)
    short_description: str | None = Field(default=None, max_length=500)
    full_description: str | None = None
    image_url: str | None = Field(default=None, max_length=500)
    icon_name: str | None = Field(default=None, max_length=100)
    features: list | None = None


class ServiceUpdateIn(BaseModel):
    title: str | None = Field(default=None, min_length=2, max_length=255)
    short_description: str | None = Field(default=None, max_length=500)
    full_description: str | None = None
    image_url: str | None = Field(default=None, max_length=500)
    icon_name: str | None = Field(default=None, max_length=100)
    features: list | None = None
    is_active: bool | None = None


# ── Demandes (contact US-29 + devis US-07) ──
class ContactIn(BaseModel):
    nom: str = Field(min_length=2, max_length=150)
    telephone: str = Field(min_length=8, max_length=30)
    email: str | None = Field(default=None, max_length=255)
    sujet: str | None = Field(default=None, max_length=255)
    message: str = Field(min_length=5)
    service_slug: str | None = None  # pour un devis lié à un service


class RequestOut(BaseModel):
    id: int
    type: str
    service_slug: str | None = None
    nom: str
    telephone: str
    statut: str

    model_config = {"from_attributes": True}


class RequestStatusIn(BaseModel):
    statut: str
