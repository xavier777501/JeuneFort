"""Seed minimal US-S1 : 6 catégories (slugs = frontend) + zones livraison. Usage : python -m app.db.seed"""

from app.db.session import SessionLocal
from app.models import Category, DeliveryZone

CATEGORIES = [
    ("Poussins", "poussins", "Poussins d'un jour et d'un mois vaccinés."),
    ("Intrants Santé", "intrants-sante", "Probiotiques et santé naturelle."),
    ("Équipements d'Élevage", "equipements", "Couveuses, poussinières, cages."),
    ("Animaux Réformés", "animaux-reformes", "Poulets, cailles, pintades, lapins."),
    ("Produits Alimentaires", "oeufs", "Œufs de table et œufs de caille."),
    ("Provende", "provende", "Aliments complets par phase."),
]

ZONES = [
    ("Porto-Novo", "Ville siège", 1000, "24h"),
    ("Cotonou", "Livraison Cotonou", 1500, "24-48h"),
    ("Retrait sur place", "Retrait gratuit au siège", 0, "Immédiat"),
]


def seed() -> None:
    db = SessionLocal()
    try:
        for name, slug, desc in CATEGORIES:
            if not db.query(Category).filter_by(slug=slug).first():
                db.add(Category(name=name, slug=slug, description=desc))
        for name, desc, fee, delay in ZONES:
            if not db.query(DeliveryZone).filter_by(name=name).first():
                db.add(DeliveryZone(name=name, description=desc, fee=fee, estimated_delay=delay))
        db.commit()
        print(f"Seed OK : {db.query(Category).count()} catégories, {db.query(DeliveryZone).count()} zones.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
