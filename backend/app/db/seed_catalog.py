"""Seed catalogue US-01/06 : 4 services + 22 produits (données reprises des mocks frontend validés).

Usage : python -m app.db.seed_catalog — idempotent (skip si slug existe).
"""

from app.db.session import SessionLocal
from app.models import Category, Product, ProductImage, Service
from app.models.enums import ProductStatus

SERVICES = [
    {
        "title": "Rédaction de Projet & Plan d'Affaires Personnalisé",
        "slug": "redaction-projet-plan-affaires",
        "short_description": "Étude de faisabilité, analyse financière et rédaction d'un plan d'affaires complet pour votre projet d'élevage.",
        "full_description": "Notre équipe d'ingénieurs agronomes vous accompagne dans la formalisation de votre projet avicole ou cunicole : étude de marché locale, calcul de rentabilité, plan de financement et rédaction du business plan prêt pour les banques et les partenaires.",
        "image_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
        "icon_name": "FileText",
        "features": ["Étude de faisabilité technique et financière", "Analyse du marché local et de la concurrence",
                     "Plan de financement (fonds propres / crédit)", "Business plan bankable en français"],
    },
    {
        "title": "Installation, Suivi & Accompagnement Technique des Fermes",
        "slug": "installation-suivi-accompagnement-fermes",
        "short_description": "Conception du bâtiment, installation des équipements, protocole sanitaire et suivi technique régulier sur le terrain.",
        "full_description": "De la conception bioclimatique de votre poulailler à la mise en route de l'élevage, nos techniciens vous accompagnent à chaque étape : plan d'implantation, choix des équipements, protocole de vaccination, et visites de suivi périodiques pour garantir vos performances.",
        "image_url": "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
        "icon_name": "Building",
        "features": ["Plan d'implantation et orientation bioclimatique", "Calendrier de vaccination personnalisé",
                     "Visites terrain périodiques de contrôle", "Tableau de bord et suivi des performances"],
    },
    {
        "title": "Installation & Test des Équipements d'Élevage",
        "slug": "installation-test-equipements",
        "short_description": "Fourniture, installation et mise en service de tous les équipements d'élevage avec formation de vos ouvriers.",
        "full_description": "Nous livrons, installons et testons l'ensemble des équipements : couveuses, poussinières, cages en batterie, systèmes d'alimentation et d'abreuvement automatiques. Une formation pratique de vos ouvriers est incluse pour assurer une prise en main rapide.",
        "image_url": "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
        "icon_name": "Settings",
        "features": ["Fourniture & livraison des équipements", "Installation et câblage électrique",
                     "Tests de fonctionnement complets", "Formation pratique des ouvriers incluse"],
    },
    {
        "title": "Gestion Complète des Fermes d'Élevage",
        "slug": "gestion-complete-fermes",
        "short_description": "Prise en charge totale de la gestion opérationnelle et technique de votre ferme avicole.",
        "full_description": "Pour les investisseurs ou porteurs de projets qui ne peuvent pas être présents en permanence, nous proposons une gestion déléguée complète : recrutement et encadrement du personnel, gestion des achats d'intrants, suivi sanitaire, reporting mensuel et optimisation de la rentabilité.",
        "image_url": "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80",
        "icon_name": "BarChart",
        "features": ["Recrutement & encadrement du personnel", "Gestion des achats d'intrants et de provende",
                     "Suivi sanitaire et protocoles vétérinaires", "Reporting mensuel de performance & rentabilité"],
    },
]

# (name, slug, category_slug, price, unit, status, stock, short, featured, min_qty, rating, [images])
PRODUCTS = [
    ("Poussins d'un jour — Pondeuses ISA Brown", "poussins-jour-pondeuses-isa-brown", "poussins", 750, "le poussin", "EN_STOCK", 3000,
     "Poussins pondeuses d'un jour souche ISA Brown, vaccinés Marek + Newcastle à l'éclosion.", True, 100, 4.9,
     ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"]),
    ("Poussins d'un jour — Coquelets Goliath (Chair)", "poussins-jour-coquelets-goliath", "poussins", 650, "le poussin", "EN_STOCK", 2000,
     "Coquelets d'un jour race Goliath, rusticité et croissance rapide adaptées au marché béninois.", True, 50, 4.8,
     ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"]),
    ("Poussins d'un mois — Pondeuses (déjà chauffées & vaccinées)", "poussins-mois-pondeuses-chauffees", "poussins", 1800, "le poussin", "EN_STOCK", 500,
     "Pondeuses d'un mois déjà chauffées, vaccinées et sevrées — prêtes à intégrer votre élevage.", False, 50, 4.7,
     ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80"]),
    ("Pintadeaux d'un jour", "pintadeaux-un-jour", "poussins", 500, "le pintadeau", "SUR_COMMANDE", 0,
     "Pintadeaux d'un jour robustes, pour les éleveurs ciblant la pintade locale très prisée au Bénin.", False, 100, 4.5,
     ["/images/produits/pintadeaux.jpeg", "/images/produits/cailleteau.png"]),
    ("Cailleteaux d'un jour", "cailleteaux-un-jour", "poussins", 300, "le cailleteau", "SUR_COMMANDE", 0,
     "Cailleteaux d'un jour pour la production d'œufs de caille et la vente en animaux de boucherie.", False, 200, 4.6,
     ["/images/produits/cailleteau.png"]),
    ("Probiotique Naturel Avicole — Flacon 1 L", "probiotique-naturel-avicole-1l", "intrants-sante", 9500, "le flacon de 1 L", "EN_STOCK", 80,
     "Mélange de ferments lactiques et d'extraits de plantes médicinales locales pour renforcer l'immunité.", True, 1, 4.9,
     ["https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80"]),
    ("Décoction Anti-Parasitaire à base de Neem — 500 ml", "decoction-neem-anti-parasitaire-500ml", "intrants-sante", 5500, "le flacon de 500 ml", "EN_STOCK", 60,
     "Solution naturelle antiparasitaire externe à base de feuilles de Neem et d'huiles essentielles.", False, 1, 4.7,
     ["https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80"]),
    ("Complément Immunitaire à base de Gingembre & Ail — 250 ml", "complement-immunitaire-gingembre-ail-250ml", "intrants-sante", 3800, "le flacon de 250 ml", "EN_STOCK", 120,
     "Stimulant naturel de l'immunité à base de gingembre, ail et citronnelle pour volailles et lapins.", False, 2, 4.8,
     ["https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80"]),
    ("Couveuse Automatique 96 Œufs", "couveuse-automatique-96-oeufs", "equipements", 185000, "l'unité", "EN_STOCK", 8,
     "Couveuse entièrement automatique (retournement, température, humidité) pour 96 œufs de poule.", True, 1, 4.8,
     ["/images/produits/Couveuse_automatiques.jpeg"]),
    ("Poussinière Équipée — 500 Sujets", "poussiniere-equipee-500-sujets", "equipements", 320000, "l'unité", "SUR_COMMANDE", 0,
     "Poussinière complète 500 sujets avec radiant gaz, système d'alimentation et d'abreuvement automatique.", False, 1, 4.9,
     ["/images/produits/poussiniere-4-etages-h-25-cm.jpg"]),
    ("Cage en Batterie Superposée Inox — 4 Étages (80 pondeuses)", "cage-batterie-inox-4-etages-80-pondeuses", "equipements", 450000, "la colonne", "SUR_COMMANDE", 0,
     "Cage en batterie superposée acier inoxydable + galvanisé, 4 étages pour 80 pondeuses.", True, 1, 4.7,
     ["/images/produits/cages_poulet.jpeg", "/images/produits/cages_poulet2.jpeg"]),
    ("Cage d'Engraissement Lapin — 6 Compartiments Galvanisé", "cage-engraissement-lapin-6-compartiments", "equipements", 95000, "l'unité", "EN_STOCK", 12,
     "Cage d'engraissement 6 compartiments pour lapins, acier galvanisé anti-rouille résistant aux UV.", False, 1, 4.6,
     ["/images/produits/Carges_d'angraissements.jpeg", "/images/produits/Engraisse_poulet_cargess.jpeg"]),
    ("Poulets de Réforme Vivants — Lot de 10", "poulets-reforme-vivants-lot-10", "animaux-reformes", 55000, "le lot de 10 poulets", "EN_STOCK", 20,
     "Poulets de réforme bien nourris, poids moyen 1,8 – 2,2 kg, vendus vivants.", False, 1, 4.7,
     ["https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80"]),
    ("Poulets Abattus & Prêts à Cuire — Lot de 5", "poulets-abattus-prets-cuire-lot-5", "animaux-reformes", 32500, "le lot de 5 poulets", "SUR_COMMANDE", 0,
     "Poulets abattus, plumés et éviscérés — prêts à cuire, emballés sous film.", False, 1, 4.8,
     ["https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80"]),
    ("Pintades de Réforme Vivantes — Lot de 5", "pintades-reforme-vivantes-lot-5", "animaux-reformes", 37500, "le lot de 5 pintades", "SUR_COMMANDE", 0,
     "Pintades de réforme vendues vivantes, chair fine très recherchée.", False, 1, 4.6,
     ["https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80"]),
    ("Lapins de Boucherie Vivants — Lot de 4", "lapins-boucherie-vivants-lot-4", "animaux-reformes", 28000, "le lot de 4 lapins", "SUR_COMMANDE", 0,
     "Lapins de chair prêts pour la boucherie, race locale améliorée.", False, 1, 4.5,
     ["https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80"]),
    ("Œufs de Table Frais — Plateau de 30 (Calibre Gros)", "oeufs-table-frais-plateau-30", "oeufs", 2400, "le plateau de 30 œufs", "EN_STOCK", 500,
     "Œufs frais de ferme ramassés quotidiennement, jaune bien coloré, coquille solide calibre L.", True, 5, 5.0,
     ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=80"]),
    ("Œufs de Caille Frais — Barquette de 60", "oeufs-caille-frais-barquette-60", "oeufs", 3500, "la barquette de 60 œufs", "EN_STOCK", 200,
     "Œufs de caille japonaise frais pour la consommation, riches en protéines et en vitamines.", True, 5, 4.9,
     ["/images/produits/caille_oeuf.jpeg"]),
    ("Provende Démarrage — Sac 50 kg (0 – 4 semaines)", "provende-demarrage-50kg", "provende", 19500, "le sac de 50 kg", "EN_STOCK", 150,
     "Aliment mietté démarrage, 22 % protéines, pour poussins de 0 à 4 semaines.", True, 1, 4.8,
     ["https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80"]),
    ("Provende Croissance — Sac 50 kg (4 – 8 semaines)", "provende-croissance-50kg", "provende", 18000, "le sac de 50 kg", "EN_STOCK", 120,
     "Aliment granulé croissance 19 % protéines pour une prise de poids optimale.", False, 1, 4.7,
     ["https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80"]),
    ("Provende Ponte — Sac 50 kg", "provende-ponte-50kg", "provende", 17500, "le sac de 50 kg", "EN_STOCK", 200,
     "Aliment farine ponte enrichi en calcium pour des coquilles solides et un taux de ponte élevé.", True, 2, 4.9,
     ["https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80"]),
    ("Provende Finition — Sac 50 kg (Poulets de Chair)", "provende-finition-50kg", "provende", 17000, "le sac de 50 kg", "EN_STOCK", 90,
     "Aliment finition faible en protéines pour abattage rapide des poulets de chair.", False, 1, 4.6,
     ["https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80"]),
]


def seed() -> None:
    db = SessionLocal()
    try:
        n_srv = n_prod = 0
        for s in SERVICES:
            if not db.query(Service).filter_by(slug=s["slug"]).first():
                db.add(Service(**s))
                n_srv += 1
        for name, slug, cat_slug, price, unit, status, stock, short, featured, min_qty, rating, images in PRODUCTS:
            if db.query(Product).filter_by(slug=slug).first():
                continue
            cat = db.query(Category).filter_by(slug=cat_slug).first()
            if cat is None:
                print(f"WARN: catégorie {cat_slug} introuvable, produit {slug} ignoré")
                continue
            p = Product(name=name, slug=slug, category_id=cat.id, short_description=short, price=price,
                        unit=unit, stock_quantity=stock, status=ProductStatus(status),
                        is_featured=featured, min_order_quantity=min_qty, rating=rating)
            db.add(p)
            db.flush()
            for i, url in enumerate(images):
                db.add(ProductImage(product_id=p.id, image_url=url, position=i))
            n_prod += 1
        db.commit()
        print(f"Seed catalogue OK : +{n_srv} services ({db.query(Service).count()} total), "
              f"+{n_prod} produits ({db.query(Product).count()} total).")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
