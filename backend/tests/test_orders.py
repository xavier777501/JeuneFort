"""Tests commandes + livraison (US-12/15/17/18/19/20/27/28/39/40)."""

from fastapi.testclient import TestClient
from app.main import app
from app.db.session import SessionLocal
from app.models import Product

client = TestClient(app)
ADMIN = {"identifiant": "0190000001", "password": "admin123"}


def _admin_headers():
    r = client.post("/api/v1/admin/login", json=ADMIN)
    assert r.status_code == 200, r.text
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


def _zones():
    r = client.get("/api/v1/delivery-zones")
    assert r.status_code == 200
    assert len(r.json()) >= 3
    return {z["name"]: z for z in r.json()}


def test_zones():
    zones = _zones()
    assert zones["Retrait sur place"]["fee"] == 0
    assert zones["Porto-Novo"]["fee"] == 1000


def test_order_guest_ok_and_tracking():
    zones = _zones()
    r = client.post("/api/v1/orders", json={
        "items": [{"slug": "oeufs-table-frais-plateau-30", "quantity": 5}],
        "guest_name": "Invité Test", "guest_phone": "0198000001",
        "delivery_mode": "domicile", "zone_id": zones["Porto-Novo"]["id"],
        "delivery_address": "Quartier Test, Porto-Novo",
    })
    assert r.status_code == 201, r.text
    data = r.json()
    assert data["reference"].startswith("JFA-")
    assert data["subtotal"] == 5 * 2400
    assert data["delivery_fee"] == 1000
    assert data["total"] == 13000
    assert data["status"] == "en_attente_paiement"

    # suivi public par référence
    r2 = client.get(f"/api/v1/orders/{data['reference']}")
    assert r2.status_code == 200
    assert r2.json()["total"] == 13000
    assert client.get("/api/v1/orders/JFA-2000-000000").status_code == 404


def test_order_errors():
    # sans téléphone invité -> 422
    r = client.post("/api/v1/orders", json={"items": [{"slug": "provende-ponte-50kg", "quantity": 1}], "delivery_mode": "retrait"})
    assert r.status_code == 422
    # domicile sans adresse -> 422
    r = client.post("/api/v1/orders", json={"items": [{"slug": "provende-ponte-50kg", "quantity": 1}],
                                            "guest_phone": "0198000002", "delivery_mode": "domicile"})
    assert r.status_code == 422
    # produit inexistant -> 422
    r = client.post("/api/v1/orders", json={"items": [{"slug": "bidon", "quantity": 1}],
                                            "guest_phone": "0198000003", "delivery_mode": "retrait"})
    assert r.status_code == 422
    # stock insuffisant -> 422
    r = client.post("/api/v1/orders", json={"items": [{"slug": "couveuse-automatique-96-oeufs", "quantity": 9999}],
                                            "guest_phone": "0198000004", "delivery_mode": "retrait"})
    assert r.status_code == 422


def test_order_status_flow_and_restock():
    zones = _zones()
    db = SessionLocal()
    before = db.query(Product).filter_by(slug="oeufs-caille-frais-barquette-60").first().stock_quantity
    db.close()

    r = client.post("/api/v1/orders", json={
        "items": [{"slug": "oeufs-caille-frais-barquette-60", "quantity": 2}],
        "guest_phone": "0198000005", "delivery_mode": "retrait",
    })
    assert r.status_code == 201
    ref = r.json()["reference"]
    order_id = r.json()["id"]
    headers = _admin_headers()

    # transition interdite : en_attente -> livree
    r = client.patch(f"/api/v1/admin/orders/{order_id}/status", json={"status": "livree"}, headers=headers)
    assert r.status_code == 422

    # flux valide
    for st in ["payee", "en_preparation", "prete", "recuperee"]:
        r = client.patch(f"/api/v1/admin/orders/{order_id}/status", json={"status": st}, headers=headers)
        assert r.status_code == 200, (st, r.text)
    assert client.get(f"/api/v1/orders/{ref}").json()["status"] == "recuperee"

    # stock décrémenté de 2
    db = SessionLocal()
    after = db.query(Product).filter_by(slug="oeufs-caille-frais-barquette-60").first().stock_quantity
    db.close()
    assert after == before - 2

    # annulation -> restock
    r = client.post("/api/v1/orders", json={"items": [{"slug": "oeufs-caille-frais-barquette-60", "quantity": 1}],
                                            "guest_phone": "0198000006", "delivery_mode": "retrait"})
    oid = r.json()["id"]
    r = client.patch(f"/api/v1/admin/orders/{oid}/status", json={"status": "annulee"}, headers=headers)
    assert r.status_code == 200
    db = SessionLocal()
    restored = db.query(Product).filter_by(slug="oeufs-caille-frais-barquette-60").first().stock_quantity
    db.close()
    assert restored == after  # -1 (création) +1 (restock annulation) = net 0

    # admin liste + filtre
    r = client.get("/api/v1/admin/orders", params={"status": "recuperee"}, headers=headers)
    assert r.status_code == 200
    assert any(o["reference"] == ref for o in r.json())


def test_order_authenticated_history():
    r = client.post("/api/v1/auth/register", json={"nom": "Acheteur", "telephone": "0198111222", "password": "secret123"})
    token = r.json()["access_token"] if r.status_code == 201 else client.post(
        "/api/v1/auth/login", json={"identifiant": "0198111222", "password": "secret123"}).json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    r = client.post("/api/v1/orders", json={"items": [{"slug": "provende-demarrage-50kg", "quantity": 1}],
                                            "delivery_mode": "retrait"}, headers=headers)
    assert r.status_code == 201, r.text
    r = client.get("/api/v1/orders/me", headers=headers)
    assert r.status_code == 200
    assert len(r.json()) >= 1
    assert client.get("/api/v1/orders/me").status_code == 401
