"""Tests catalogue public + admin (US-01/02/03/06/29/34/37)."""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

ADMIN = {"identifiant": "0190000001", "password": "admin123"}


def _admin_token():
    r = client.post("/api/v1/admin/login", json=ADMIN)
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


def test_categories():
    r = client.get("/api/v1/categories")
    assert r.status_code == 200
    slugs = {c["slug"] for c in r.json()}
    assert {"poussins", "intrants-sante", "equipements", "animaux-reformes", "oeufs", "provende"} <= slugs


def test_products_list_filters():
    r = client.get("/api/v1/products", params={"size": 50})
    assert r.status_code == 200
    assert r.json()["total"] >= 22

    r = client.get("/api/v1/products", params={"category": "provende"})
    assert r.status_code == 200
    assert r.json()["total"] == 4
    assert all(i["category_slug"] == "provende" for i in r.json()["items"])

    r = client.get("/api/v1/products", params={"q": "couveuse"})
    assert r.json()["total"] == 1

    r = client.get("/api/v1/products", params={"featured": "true"})
    assert r.json()["total"] >= 8

    r = client.get("/api/v1/products", params={"status": "SUR_COMMANDE"})
    assert r.json()["total"] >= 7

    r = client.get("/api/v1/products", params={"min_price": 100000})
    assert all(i["price"] >= 100000 for i in r.json()["items"])

    r = client.get("/api/v1/products", params={"status": "BIDON"})
    assert r.status_code == 422


def test_product_detail():
    r = client.get("/api/v1/products/couveuse-automatique-96-oeufs")
    assert r.status_code == 200
    assert r.json()["price"] == 185000
    assert len(r.json()["images"]) >= 1
    assert client.get("/api/v1/products/slug-inexistant").status_code == 404


def test_services():
    r = client.get("/api/v1/services")
    assert r.status_code == 200
    assert len(r.json()) == 4
    r = client.get("/api/v1/services/gestion-complete-fermes")
    assert r.status_code == 200
    assert "BarChart" in (r.json()["icon_name"] or "")
    assert client.get("/api/v1/services/bidon").status_code == 404


def test_contact_devis():
    r = client.post("/api/v1/contact", json={"nom": "Client Test", "telephone": "0198111111", "message": "Bonjour, question sur la provende."})
    assert r.status_code == 201, r.text
    assert r.json()["type"] == "contact"

    r = client.post("/api/v1/devis", json={"nom": "Client Test", "telephone": "0198222222",
                                           "message": "Devis pour installation ferme.", "service_slug": "gestion-complete-fermes"})
    assert r.status_code == 201
    assert r.json()["type"] == "devis"

    r = client.post("/api/v1/devis", json={"nom": "X", "telephone": "0198333333", "message": "Test", "service_slug": "bidon"})
    assert r.status_code in (404, 422)


def test_admin_product_crud():
    import uuid
    token = _admin_token()
    headers = {"Authorization": f"Bearer {token}"}
    slug = f"produit-test-{uuid.uuid4().hex[:8]}"
    r = client.post("/api/v1/admin/products", json={
        "name": "Produit Test CRUD", "slug": slug, "category_slug": "oeufs",
        "price": 1000, "stock_quantity": 10, "status": "EN_STOCK", "images": ["http://x/y.jpg"],
    }, headers=headers)
    assert r.status_code == 201, r.text

    r = client.patch(f"/api/v1/admin/products/{slug}/stock", json={"stock_quantity": 3, "status": "SUR_COMMANDE"}, headers=headers)
    assert r.status_code == 200
    assert r.json()["stock_quantity"] == 3

    r = client.delete(f"/api/v1/admin/products/{slug}", headers=headers)
    assert r.status_code == 204
    assert client.get(f"/api/v1/products/{slug}").status_code == 404

    # non-admin refusé
    assert client.post("/api/v1/admin/products", json={"name": "X", "slug": "x", "category_slug": "oeufs", "price": 1}).status_code in (401, 403)
