"""Schémas Pydantic commandes + livraison (US-12/17/18/19/20/27/28)."""

from pydantic import BaseModel, Field


class OrderItemIn(BaseModel):
    slug: str = Field(description="Slug (ou id) du produit")
    quantity: int = Field(ge=1, le=1000)


class OrderCreateIn(BaseModel):
    items: list[OrderItemIn] = Field(min_length=1, max_length=50)
    guest_name: str | None = Field(default=None, max_length=150)
    guest_phone: str | None = Field(default=None, max_length=30)
    guest_email: str | None = Field(default=None, max_length=255)
    delivery_mode: str = Field(default="domicile", description="domicile | retrait")
    zone_id: int | None = None
    delivery_address: str | None = Field(default=None, max_length=500)


class OrderItemOut(BaseModel):
    product_slug: str
    product_name: str
    quantity: int
    unit_price: int
    total_price: int


class OrderOut(BaseModel):
    id: int
    reference: str
    delivery_mode: str
    zone_name: str | None = None
    delivery_address: str | None
    subtotal: int
    delivery_fee: int
    total: int
    status: str
    items: list[OrderItemOut]


class OrderStatusIn(BaseModel):
    status: str


class ZoneOut(BaseModel):
    id: int
    name: str
    description: str | None
    fee: int
    estimated_delay: str | None

    model_config = {"from_attributes": True}
