"""Tests Auth JWT client + admin (US-13/14/16/32)."""

import uuid
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import SessionLocal
from app.models import User
from app.models.enums import UserRole
from app.core.security import hash_password

client = TestClient(app)


def _phone():
    return "0190" + uuid.uuid4().hex[:8]


def test_register_login_me_update():
    phone = _phone()
    email = f"t_{uuid.uuid4().hex[:8]}@example.com"
    r = client.post("/api/v1/auth/register", json={
        "nom": "Testeur", "telephone": phone, "email": email,
        "password": "secret123", "ville": "Porto-Novo",
    })
    assert r.status_code == 201, r.text
    token = r.json()["access_token"]
    assert r.json()["user"]["telephone"] == phone

    # doublon téléphone -> 409
    r2 = client.post("/api/v1/auth/register", json={"nom": "Dupont", "telephone": phone, "password": "secret123"})
    assert r2.status_code == 409

    # login par téléphone
    r3 = client.post("/api/v1/auth/login", json={"identifiant": phone, "password": "secret123"})
    assert r3.status_code == 200, r3.text

    # login par email
    r4 = client.post("/api/v1/auth/login", json={"identifiant": email, "password": "secret123"})
    assert r4.status_code == 200

    # mauvais mot de passe -> 401
    r5 = client.post("/api/v1/auth/login", json={"identifiant": phone, "password": "faux"})
    assert r5.status_code == 401

    # me sans token -> 401, avec token -> 200
    assert client.get("/api/v1/auth/me").status_code == 401
    r6 = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert r6.status_code == 200
    assert r6.json()["ville"] == "Porto-Novo"

    # patch profil
    r7 = client.patch("/api/v1/auth/me", json={"ville": "Cotonou"}, headers={"Authorization": f"Bearer {token}"})
    assert r7.status_code == 200
    assert r7.json()["ville"] == "Cotonou"

    # client -> /admin/login doit être refusé (403)
    r8 = client.post("/api/v1/admin/login", json={"identifiant": phone, "password": "secret123"})
    assert r8.status_code == 403


def test_admin_login_ok():
    phone = _phone()
    db = SessionLocal()
    try:
        admin = User(nom="Admin Test", telephone=phone, email=f"a_{uuid.uuid4().hex[:6]}@example.com",
                     password_hash=hash_password("admin123"), role=UserRole.ADMIN)
        db.add(admin)
        db.commit()
        r = client.post("/api/v1/admin/login", json={"identifiant": phone, "password": "admin123"})
        assert r.status_code == 200, r.text
        token = r.json()["access_token"]
        r2 = client.get("/api/v1/admin/me", headers={"Authorization": f"Bearer {token}"})
        assert r2.status_code == 200
        assert r2.json()["role"] == "admin"
    finally:
        db.query(User).filter(User.telephone == phone).delete()
        db.commit()
        db.close()
