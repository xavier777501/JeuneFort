import { Category, Product, Service } from '../types';

// ─────────────────────────────────────────────
// CATÉGORIES (exactement celles du CDC)
// ─────────────────────────────────────────────
export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Poussins',
    slug: 'poussins',
    description:
      'Poussins d\'un jour et d\'un mois vaccinés — pondeuses, coquelets, goliathaux, pintadeaux, cailleteaux.',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
  {
    id: 'cat-2',
    name: 'Intrants Santé',
    slug: 'intrants-sante',
    description:
      'Probiotiques et médicaments naturels à base de plantes médicinales pour un élevage sain sans antibiotiques.',
    image:
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80',
    itemCount: 3,
  },
  {
    id: 'cat-3',
    name: 'Équipements d\'Élevage',
    slug: 'equipements',
    description:
      'Couveuses automatiques, poussinières, cages en batterie inox/galvanisé, cages d\'engraissement.',
    image: '/images/produits/cages_poulet.jpeg',
    itemCount: 4,
  },
  {
    id: 'cat-4',
    name: 'Animaux Réformés',
    slug: 'animaux-reformes',
    description:
      'Poulets, cailles, pintades et lapins — vendus vivants ou abattus prêts pour la cuisson.',
    image:
      'https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
  {
    id: 'cat-5',
    name: 'Produits Alimentaires',
    slug: 'oeufs',
    description:
      'Œufs de table frais et œufs de caille frais pour la consommation, ramassés quotidiennement.',
    image: '/images/produits/caille_oeuf.jpeg',
    itemCount: 2,
  },
  {
    id: 'cat-6',
    name: 'Provende',
    slug: 'provende',
    description:
      'Aliments complets formulés par phase : démarrage, croissance, pré-ponte, ponte et finition.',
    image:
      'https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=800&q=80',
    itemCount: 4,
  },
];

// ─────────────────────────────────────────────
// PRODUITS
// ─────────────────────────────────────────────
export const MOCK_PRODUCTS: Product[] = [

  // ── POUSSINS ──────────────────────────────
  {
    id: 'prod-1',
    name: 'Poussins d\'un jour — Pondeuses ISA Brown',
    slug: 'poussins-jour-pondeuses-isa-brown',
    categorySlug: 'poussins',
    categoryName: 'Poussins',
    price: 750,
    unit: 'le poussin',
    status: 'EN_STOCK',
    stockQuantity: 3000,
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Poussins pondeuses d\'un jour souche ISA Brown, vaccinés Marek + Newcastle à l\'éclosion.',
    fullDescription:
      `La souche ISA Brown est mondialement reconnue pour sa ponte exceptionnelle (jusqu'à 320 œufs/an) et son excellent indice de consommation alimentaire. Nos poussins sont issus de reproducteurs rigoureusement sélectionnés et vaccinés dès l'éclosion.\n\nIdéaux pour les éleveurs ciblant la production d'œufs de table.`,
    specifications: [
      { label: 'Souche', value: 'ISA Brown' },
      { label: 'Objectif', value: 'Ponte d\'œufs de table' },
      { label: 'Âge', value: '1 jour' },
      { label: 'Vaccins', value: 'Marek + Newcastle (HB1)' },
      { label: 'Pic de ponte', value: '93 – 95 %' },
      { label: 'Commande min.', value: '100 sujets' },
    ],
    isFeatured: true,
    minOrderQuantity: 100,
    rating: 4.9,
  },
  {
    id: 'prod-2',
    name: 'Poussins d\'un jour — Coquelets Goliath (Chair)',
    slug: 'poussins-jour-coquelets-goliath',
    categorySlug: 'poussins',
    categoryName: 'Poussins',
    price: 650,
    unit: 'le poussin',
    status: 'EN_STOCK',
    stockQuantity: 2000,
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Coquelets d\'un jour race Goliath, rusticité et croissance rapide adaptées au marché béninois.',
    fullDescription:
      `La race Goliath est la référence de la volaille locale améliorée au Bénin. Reconnue pour sa rusticité, son adaptation au climat tropical et sa chair très appréciée des consommateurs locaux.\n\nNos sujets sont vaccinés à l'éclosion et certifiés indemnes de maladies transmissibles.`,
    specifications: [
      { label: 'Souche', value: 'Goliath Bénin' },
      { label: 'Objectif', value: 'Chair' },
      { label: 'Âge', value: '1 jour' },
      { label: 'Vaccins', value: 'Marek + Newcastle (HB1)' },
      { label: 'Poids à 8 sem.', value: '1,8 – 2,2 kg' },
      { label: 'Commande min.', value: '50 sujets' },
    ],
    isFeatured: true,
    minOrderQuantity: 50,
    rating: 4.8,
  },
  {
    id: 'prod-3',
    name: 'Poussins d\'un mois — Pondeuses (déjà chauffées & vaccinées)',
    slug: 'poussins-mois-pondeuses-chauffees',
    categorySlug: 'poussins',
    categoryName: 'Poussins',
    price: 1800,
    unit: 'le poussin',
    status: 'EN_STOCK',
    stockQuantity: 500,
    images: [
      'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Pondeuses d\'un mois déjà chauffées, vaccinées et sevrées — prêtes à intégrer votre élevage.',
    fullDescription:
      `Pour les éleveurs qui ne souhaitent pas gérer la phase critique de démarrage, nous proposons des poussins d'un mois déjà passés en poussinière, vaccinés (protocole complet) et sevrés du chauffage.\n\nLivraison possible sur une grande partie du Bénin.`,
    specifications: [
      { label: 'Âge', value: '4 semaines' },
      { label: 'Protocole vaccinal', value: 'Marek, Newcastle, Gumboro' },
      { label: 'Poids moyen', value: '200 – 280 g' },
      { label: 'Commande min.', value: '50 sujets' },
    ],
    isFeatured: false,
    minOrderQuantity: 50,
    rating: 4.7,
  },
  {
    id: 'prod-4',
    name: 'Pintadeaux d\'un jour',
    slug: 'pintadeaux-un-jour',
    categorySlug: 'poussins',
    categoryName: 'Poussins',
    price: 500,
    unit: 'le pintadeau',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      '/images/produits/pintadeaux.jpeg',
      '/images/produits/cailleteau.png',
    ],
    shortDescription:
      'Pintadeaux d\'un jour robustes, pour les éleveurs ciblant la pintade locale très prisée au Bénin.',
    fullDescription:
      `La pintade commune (Numida meleagris) est très appréciée pour sa chair savoureuse. Nos pintadeaux sont éclos en couvoir contrôlé et disponibles sur réservation.`,
    specifications: [
      { label: 'Espèce', value: 'Pintade commune' },
      { label: 'Âge', value: '1 jour' },
      { label: 'Commande min.', value: '100 sujets' },
      { label: 'Délai', value: '7 jours après confirmation' },
    ],
    isFeatured: false,
    minOrderQuantity: 100,
    rating: 4.5,
  },
  {
    id: 'prod-5',
    name: 'Cailleteaux d\'un jour',
    slug: 'cailleteaux-un-jour',
    categorySlug: 'poussins',
    categoryName: 'Poussins',
    price: 300,
    unit: 'le cailleteau',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      '/images/produits/cailleteau.png',
    ],
    shortDescription:
      'Cailleteaux d\'un jour pour la production d\'œufs de caille et la vente en animaux de boucherie.',
    fullDescription:
      `La caille japonaise (Coturnix coturnix japonica) est une espèce à croissance ultra-rapide (ponte dès 45 jours). Idéale pour les petits espaces et les projets à faible capital de démarrage.`,
    specifications: [
      { label: 'Espèce', value: 'Caille japonaise' },
      { label: 'Âge', value: '1 jour' },
      { label: 'Commande min.', value: '200 sujets' },
      { label: 'Délai', value: '7 jours après confirmation' },
    ],
    isFeatured: false,
    minOrderQuantity: 200,
    rating: 4.6,
  },

  // ── INTRANTS SANTÉ ────────────────────────
  {
    id: 'prod-6',
    name: 'Probiotique Naturel Avicole — Flacon 1 L',
    slug: 'probiotique-naturel-avicole-1l',
    categorySlug: 'intrants-sante',
    categoryName: 'Intrants Santé',
    price: 9500,
    unit: 'le flacon de 1 L',
    status: 'EN_STOCK',
    stockQuantity: 80,
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Mélange de ferments lactiques et d\'extraits de plantes médicinales locales pour renforcer l\'immunité.',
    fullDescription:
      `Formulé à partir d'ingrédients 100 % naturels et de plantes médicinales d'Afrique de l'Ouest, ce probiotique améliore la flore intestinale, réduit la mortalité au démarrage et renforce les défenses immunitaires sans résidu d'antibiotiques.`,
    specifications: [
      { label: 'Composition', value: 'Lactobacillus spp. + extraits de plantes' },
      { label: 'Dosage', value: '1 ml / litre d\'eau de boisson' },
      { label: 'Cible', value: 'Toutes volailles, lapins' },
      { label: 'Conservation', value: 'Lieu frais, à l\'abri de la lumière' },
    ],
    isFeatured: true,
    minOrderQuantity: 1,
    rating: 4.9,
  },
  {
    id: 'prod-7',
    name: 'Décoction Anti-Parasitaire à base de Neem — 500 ml',
    slug: 'decoction-neem-anti-parasitaire-500ml',
    categorySlug: 'intrants-sante',
    categoryName: 'Intrants Santé',
    price: 5500,
    unit: 'le flacon de 500 ml',
    status: 'EN_STOCK',
    stockQuantity: 60,
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Solution naturelle antiparasitaire externe à base de feuilles de Neem et d\'huiles essentielles.',
    fullDescription:
      `Utilisé en pulvérisation sur les animaux et dans les locaux d'élevage, ce produit à base de Neem (Azadirachta indica) repousse efficacement les poux, acariens et mouches sans danger pour les volailles ni pour le consommateur.`,
    specifications: [
      { label: 'Principe actif', value: 'Azadirachtine (Neem)' },
      { label: 'Usage', value: 'Pulvérisation animaux & locaux' },
      { label: 'Fréquence', value: 'Tous les 15 jours en préventif' },
      { label: 'Format', value: '500 ml' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.7,
  },
  {
    id: 'prod-8',
    name: 'Complément Immunitaire à base de Gingembre & Ail — 250 ml',
    slug: 'complement-immunitaire-gingembre-ail-250ml',
    categorySlug: 'intrants-sante',
    categoryName: 'Intrants Santé',
    price: 3800,
    unit: 'le flacon de 250 ml',
    status: 'EN_STOCK',
    stockQuantity: 120,
    images: [
      'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Stimulant naturel de l\'immunité à base de gingembre, ail et citronnelle pour volailles et lapins.',
    fullDescription:
      `Ce concentré naturel associe le gingembre (Zingiber officinale), l'ail (Allium sativum) et la citronnelle pour stimuler l'immunité des volailles, améliorer l'appétit et réduire le stress thermique en saison chaude.`,
    specifications: [
      { label: 'Ingrédients', value: 'Gingembre, Ail, Citronnelle' },
      { label: 'Dosage', value: '5 ml / litre d\'eau' },
      { label: 'Usage', value: 'Périodes de stress, chaleurs, vaccinations' },
      { label: 'Format', value: '250 ml' },
    ],
    isFeatured: false,
    minOrderQuantity: 2,
    rating: 4.8,
  },

  // ── ÉQUIPEMENTS ───────────────────────────
  {
    id: 'prod-9',
    name: 'Couveuse Automatique 96 Œufs',
    slug: 'couveuse-automatique-96-oeufs',
    categorySlug: 'equipements',
    categoryName: 'Équipements d\'Élevage',
    price: 185000,
    unit: 'l\'unité',
    status: 'EN_STOCK',
    stockQuantity: 8,
    images: [
      '/images/produits/Couveuse_automatiques.jpeg',
    ],
    shortDescription:
      'Couveuse entièrement automatique (retournement, température, humidité) pour 96 œufs de poule.',
    fullDescription:
      `Couveuse à retournement automatique toutes les 2 heures, régulation électronique de la température (37,5 °C) et de l'humidité. Panneau solaire optionnel disponible pour les zones sans électricité stable.\n\nTaux d'éclosion garanti ≥ 85 % sur œufs fécondés sains.`,
    specifications: [
      { label: 'Capacité', value: '96 œufs de poule (ou 200 œufs de caille)' },
      { label: 'Retournement', value: 'Automatique toutes les 2h' },
      { label: 'Alimentation', value: '220V / option panneau solaire' },
      { label: 'Dimensions', value: '56 × 42 × 35 cm' },
      { label: 'Garantie', value: '12 mois' },
    ],
    isFeatured: true,
    minOrderQuantity: 1,
    rating: 4.8,
  },
  {
    id: 'prod-10',
    name: 'Poussinière Équipée — 500 Sujets (alimentation & abreuvement auto)',
    slug: 'poussiniere-equipee-500-sujets',
    categorySlug: 'equipements',
    categoryName: 'Équipements d\'Élevage',
    price: 320000,
    unit: 'l\'unité',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      '/images/produits/poussiniere-4-etages-h-25-cm.jpg',
    ],
    shortDescription:
      'Poussinière complète 500 sujets avec radiant gaz, système d\'alimentation et d\'abreuvement automatique.',
    fullDescription:
      `Kit complet pour la phase de démarrage : radiant gaz ou électrique, mangeoires linéaires, abreuvoirs siphoïdes et ligne d'eau automatique. Montage et mise en service inclus dans un rayon de 50 km de Cotonou.`,
    specifications: [
      { label: 'Capacité', value: '500 poussins' },
      { label: 'Chauffage', value: 'Radiant gaz (au choix électrique)' },
      { label: 'Alimentation', value: 'Mangeoires linéaires anti-gaspillage' },
      { label: 'Abreuvement', value: 'Ligne d\'eau + abreuvoirs auto' },
      { label: 'Montage', value: 'Inclus (rayon 50 km Cotonou)' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.9,
  },
  {
    id: 'prod-11',
    name: 'Cage en Batterie Superposée Inox — 4 Étages (80 pondeuses)',
    slug: 'cage-batterie-inox-4-etages-80-pondeuses',
    categorySlug: 'equipements',
    categoryName: 'Équipements d\'Élevage',
    price: 450000,
    unit: 'la colonne',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      '/images/produits/cages_poulet.jpeg',
      '/images/produits/cages_poulet2.jpeg',
    ],
    shortDescription:
      'Cage en batterie superposée acier inoxydable + galvanisé, 4 étages pour 80 pondeuses.',
    fullDescription:
      `Structure en acier inoxydable et galvanisé à chaud pour une longévité maximale. Équipée d'auges à eau et à aliment, avec plan incliné pour collecte automatique des œufs. Idéale pour l'intensification de la production pondeuse.`,
    specifications: [
      { label: 'Matériau', value: 'Acier inox + galvanisé à chaud' },
      { label: 'Étages', value: '4' },
      { label: 'Capacité', value: '80 pondeuses par colonne' },
      { label: 'Collecte œufs', value: 'Plan incliné automatique' },
      { label: 'Délai fabrication', value: '10 – 15 jours ouvrés' },
    ],
    isFeatured: true,
    minOrderQuantity: 1,
    rating: 4.7,
  },
  {
    id: 'prod-12',
    name: 'Cage d\'Engraissement Lapin — 6 Compartiments Galvanisé',
    slug: 'cage-engraissement-lapin-6-compartiments',
    categorySlug: 'equipements',
    categoryName: 'Équipements d\'Élevage',
    price: 95000,
    unit: 'l\'unité',
    status: 'EN_STOCK',
    stockQuantity: 12,
    images: [
      '/images/produits/Carges_d\'angraissements.jpeg',
      '/images/produits/Engraisse_poulet_cargess.jpeg',
    ],
    shortDescription:
      'Cage d\'engraissement 6 compartiments pour lapins, acier galvanisé anti-rouille résistant aux UV.',
    fullDescription:
      `Cage modulaire en grillage galvanisé à mailles adaptées aux lapins. Chaque compartiment dispose d'une mangeoire fixe et d'un abreuvoir automatique. Facilement désinfectable.`,
    specifications: [
      { label: 'Compartiments', value: '6 (2 lapins / compartiment)' },
      { label: 'Matériau', value: 'Grillage galvanisé soudé' },
      { label: 'Dimensions', value: '180 × 60 × 45 cm' },
      { label: 'Accessoires', value: 'Mangeoires + abreuvoirs inclus' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.6,
  },

  // ── ANIMAUX RÉFORMÉS ──────────────────────
  {
    id: 'prod-13',
    name: 'Poulets de Réforme Vivants — Lot de 10',
    slug: 'poulets-reforme-vivants-lot-10',
    categorySlug: 'animaux-reformes',
    categoryName: 'Animaux Réformés',
    price: 55000,
    unit: 'le lot de 10 poulets',
    status: 'EN_STOCK',
    stockQuantity: 20,
    images: [
      'https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Poulets de réforme bien nourris, poids moyen 1,8 – 2,2 kg, vendus vivants.',
    fullDescription:
      `Poules pondeuses en fin de cycle, bien conformées et en bonne santé. Idéales pour la boucherie, la restauration ou les cérémonies. Vendues vivantes, enlèvement à la ferme ou livraison selon disponibilité.`,
    specifications: [
      { label: 'Poids moyen', value: '1,8 – 2,2 kg / sujet' },
      { label: 'État', value: 'Vivant' },
      { label: 'Enlèvement', value: 'Ferme Jeune Fort ou livraison' },
      { label: 'Commande min.', value: '10 sujets' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.7,
  },
  {
    id: 'prod-14',
    name: 'Poulets Abattus & Prêts à Cuire — Lot de 5',
    slug: 'poulets-abattus-prets-cuire-lot-5',
    categorySlug: 'animaux-reformes',
    categoryName: 'Animaux Réformés',
    price: 32500,
    unit: 'le lot de 5 poulets',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      'https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Poulets abattus, plumés et éviscérés — prêts à cuire, emballés sous film.',
    fullDescription:
      `Service d'abattage et de conditionnement sur place. Les poulets sont abattus, plumés, éviscérés et emballés sous film alimentaire dans les heures précédant la livraison pour garantir la fraîcheur maximale.`,
    specifications: [
      { label: 'Poids net moyen', value: '1,5 – 1,9 kg / sujet' },
      { label: 'Conditionnement', value: 'Film alimentaire sous vide partiel' },
      { label: 'Délai', value: 'Commande J-1 avant 18h' },
      { label: 'Commande min.', value: '5 sujets' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.8,
  },
  {
    id: 'prod-15',
    name: 'Pintades de Réforme Vivantes — Lot de 5',
    slug: 'pintades-reforme-vivantes-lot-5',
    categorySlug: 'animaux-reformes',
    categoryName: 'Animaux Réformés',
    price: 37500,
    unit: 'le lot de 5 pintades',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      'https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Pintades de réforme vendues vivantes, chair fine très recherchée.',
    fullDescription:
      `La pintade est prisée pour sa viande maigre au goût typé. Nos sujets de réforme sont issus d'un élevage en bande et disponibles sur commande.`,
    specifications: [
      { label: 'Poids moyen', value: '1,2 – 1,5 kg / sujet' },
      { label: 'État', value: 'Vivant' },
      { label: 'Commande min.', value: '5 sujets' },
      { label: 'Délai', value: '3 – 5 jours ouvrés' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.6,
  },
  {
    id: 'prod-16',
    name: 'Lapins de Boucherie Vivants — Lot de 4',
    slug: 'lapins-boucherie-vivants-lot-4',
    categorySlug: 'animaux-reformes',
    categoryName: 'Animaux Réformés',
    price: 28000,
    unit: 'le lot de 4 lapins',
    status: 'SUR_COMMANDE',
    stockQuantity: 0,
    images: [
      'https://images.unsplash.com/photo-1587593132723-a89e0dc4cb8a?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Lapins de chair prêts pour la boucherie, race locale améliorée.',
    fullDescription:
      `Lapins de chair engraissés sur 70 – 80 jours, issus de reproducteurs sélectionnés. Disponibles vivants ou abattus sur demande.`,
    specifications: [
      { label: 'Poids vif', value: '1,8 – 2,5 kg / sujet' },
      { label: 'État', value: 'Vivant (abattu sur demande)' },
      { label: 'Commande min.', value: '4 sujets' },
      { label: 'Délai', value: '3 – 7 jours selon disponibilité' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.5,
  },

  // ── PRODUITS ALIMENTAIRES ─────────────────
  {
    id: 'prod-17',
    name: 'Œufs de Table Frais — Plateau de 30 (Calibre Gros)',
    slug: 'oeufs-table-frais-plateau-30',
    categorySlug: 'oeufs',
    categoryName: 'Produits Alimentaires',
    price: 2400,
    unit: 'le plateau de 30 œufs',
    status: 'EN_STOCK',
    stockQuantity: 500,
    images: [
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518569656558-1f25e69d2049?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Œufs frais de ferme ramassés quotidiennement, jaune bien coloré, coquille solide calibre L.',
    fullDescription:
      `Issus de poules pondeuses nourries avec notre provende maison enrichie en maïs et minéraux. Ramassage quotidien, tri et emballage soigné en plateau cartonné alvéolé de 30 œufs.\n\nQualité supérieure garantie — aucune mauvaise odeur, jaune orangé naturel.`,
    specifications: [
      { label: 'Calibre', value: 'Gros — L (63 – 68 g / œuf)' },
      { label: 'Conditionnement', value: 'Plateau carton alvéolé 30 œufs' },
      { label: 'Fraîcheur', value: 'Ramassage du jour' },
      { label: 'Origine', value: 'Ferme Avicole Jeune Fort' },
      { label: 'Commande min.', value: '5 plateaux' },
    ],
    isFeatured: true,
    minOrderQuantity: 5,
    rating: 5.0,
  },
  {
    id: 'prod-18',
    name: 'Œufs de Caille Frais — Barquette de 60',
    slug: 'oeufs-caille-frais-barquette-60',
    categorySlug: 'oeufs',
    categoryName: 'Produits Alimentaires',
    price: 3500,
    unit: 'la barquette de 60 œufs',
    status: 'EN_STOCK',
    stockQuantity: 200,
    images: [
      '/images/produits/caille_oeuf.jpeg',
    ],
    shortDescription:
      'Œufs de caille japonaise frais pour la consommation, riches en protéines et en vitamines.',
    fullDescription:
      `Les œufs de caille sont reconnus pour leur richesse nutritionnelle (protéines, vitamines B12, fer). Idéaux pour la restauration, la cuisine gastronomique et la consommation familiale.`,
    specifications: [
      { label: 'Espèce', value: 'Caille japonaise' },
      { label: 'Poids moyen', value: '10 – 12 g / œuf' },
      { label: 'Conditionnement', value: 'Barquette plastique 60 œufs' },
      { label: 'Commande min.', value: '5 barquettes' },
    ],
    isFeatured: true,
    minOrderQuantity: 5,
    rating: 4.9,
  },

  // ── PROVENDE ─────────────────────────────
  {
    id: 'prod-19',
    name: 'Provende Démarrage — Sac 50 kg (0 – 4 semaines)',
    slug: 'provende-demarrage-50kg',
    categorySlug: 'provende',
    categoryName: 'Provende',
    price: 19500,
    unit: 'le sac de 50 kg',
    status: 'EN_STOCK',
    stockQuantity: 150,
    images: [
      'https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Aliment mietté démarrage, 22 % protéines, pour poussins de 0 à 4 semaines.',
    fullDescription:
      `Formule spéciale démarrage à haute teneur en protéines pour maximiser le gain moyen quotidien (GMQ) et renforcer l'immunité des poussins durant la phase critique des 4 premières semaines.`,
    specifications: [
      { label: 'Phase', value: 'Démarrage (semaines 1 à 4)' },
      { label: 'Protéines', value: '22 %' },
      { label: 'Énergie métab.', value: '3 050 kcal / kg' },
      { label: 'Présentation', value: 'Miette' },
      { label: 'Conditionnement', value: 'Sac tissé 50 kg' },
    ],
    isFeatured: true,
    minOrderQuantity: 1,
    rating: 4.8,
  },
  {
    id: 'prod-20',
    name: 'Provende Croissance — Sac 50 kg (4 – 8 semaines)',
    slug: 'provende-croissance-50kg',
    categorySlug: 'provende',
    categoryName: 'Provende',
    price: 18000,
    unit: 'le sac de 50 kg',
    status: 'EN_STOCK',
    stockQuantity: 120,
    images: [
      'https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Aliment granulé croissance 19 % protéines pour une prise de poids optimale.',
    fullDescription:
      `Formulé pour la phase de croissance active (4 à 8 semaines), cet aliment granulé assure une prise de poids régulière et un bon indice de consommation, adapté aux coquelets chair et aux pondeuses en croissance.`,
    specifications: [
      { label: 'Phase', value: 'Croissance (semaines 4 à 8)' },
      { label: 'Protéines', value: '19 %' },
      { label: 'Énergie métab.', value: '3 000 kcal / kg' },
      { label: 'Présentation', value: 'Granulé' },
      { label: 'Conditionnement', value: 'Sac tissé 50 kg' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.7,
  },
  {
    id: 'prod-21',
    name: 'Provende Ponte — Sac 50 kg',
    slug: 'provende-ponte-50kg',
    categorySlug: 'provende',
    categoryName: 'Provende',
    price: 17500,
    unit: 'le sac de 50 kg',
    status: 'EN_STOCK',
    stockQuantity: 200,
    images: [
      'https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Aliment farine ponte enrichi en calcium pour des coquilles solides et un taux de ponte élevé.',
    fullDescription:
      `Spécialement formulé pour les pondeuses en production, avec un apport renforcé en calcium (3,5 %) et en phosphore pour garantir la solidité des coquilles et maintenir un taux de ponte ≥ 90 % sur les souches performantes.`,
    specifications: [
      { label: 'Phase', value: 'Ponte (à partir de 18 semaines)' },
      { label: 'Protéines', value: '17 %' },
      { label: 'Calcium', value: '3,5 %' },
      { label: 'Présentation', value: 'Farine' },
      { label: 'Conditionnement', value: 'Sac tissé 50 kg' },
    ],
    isFeatured: true,
    minOrderQuantity: 2,
    rating: 4.9,
  },
  {
    id: 'prod-22',
    name: 'Provende Finition — Sac 50 kg (Poulets de Chair)',
    slug: 'provende-finition-50kg',
    categorySlug: 'provende',
    categoryName: 'Provende',
    price: 17000,
    unit: 'le sac de 50 kg',
    status: 'EN_STOCK',
    stockQuantity: 90,
    images: [
      'https://images.unsplash.com/photo-1595855759920-8658239e7280?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDescription:
      'Aliment finition faible en protéines pour abattage rapide des poulets de chair.',
    fullDescription:
      `La provende finition est utilisée les 2 dernières semaines avant l'abattage. Sa formulation réduit les teneurs en protéines et augmente l'énergie pour favoriser le dépôt de gras intramusculaire et améliorer la saveur de la viande.`,
    specifications: [
      { label: 'Phase', value: 'Finition (2 dernières semaines avant abattage)' },
      { label: 'Protéines', value: '15 %' },
      { label: 'Énergie métab.', value: '3 150 kcal / kg' },
      { label: 'Présentation', value: 'Granulé' },
      { label: 'Conditionnement', value: 'Sac tissé 50 kg' },
    ],
    isFeatured: false,
    minOrderQuantity: 1,
    rating: 4.6,
  },
];

// ─────────────────────────────────────────────
// SERVICES (exactement ceux du CDC)
// ─────────────────────────────────────────────
export const MOCK_SERVICES: Service[] = [
  {
    id: 'serv-1',
    title: 'Rédaction de Projet & Plan d\'Affaires Personnalisé',
    slug: 'redaction-projet-plan-affaires',
    shortDescription:
      'Étude de faisabilité, analyse financière et rédaction d\'un plan d\'affaires complet pour votre projet d\'élevage.',
    fullDescription:
      'Notre équipe d\'ingénieurs agronomes vous accompagne dans la formalisation de votre projet avicole ou cunicole : étude de marché locale, calcul de rentabilité, plan de financement et rédaction du business plan prêt pour les banques et les partenaires.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    iconName: 'FileText',
    features: [
      'Étude de faisabilité technique et financière',
      'Analyse du marché local et de la concurrence',
      'Plan de financement (fonds propres / crédit)',
      'Business plan bankable en français',
    ],
  },
  {
    id: 'serv-2',
    title: 'Installation, Suivi & Accompagnement Technique des Fermes',
    slug: 'installation-suivi-accompagnement-fermes',
    shortDescription:
      'Conception du bâtiment, installation des équipements, protocole sanitaire et suivi technique régulier sur le terrain.',
    fullDescription:
      'De la conception bioclimatique de votre poulailler à la mise en route de l\'élevage, nos techniciens vous accompagnent à chaque étape : plan d\'implantation, choix des équipements, protocole de vaccination, et visites de suivi périodiques pour garantir vos performances.',
    image:
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    iconName: 'Building',
    features: [
      'Plan d\'implantation et orientation bioclimatique',
      'Calendrier de vaccination personnalisé',
      'Visites terrain périodiques de contrôle',
      'Tableau de bord et suivi des performances',
    ],
  },
  {
    id: 'serv-3',
    title: 'Installation & Test des Équipements d\'Élevage',
    slug: 'installation-test-equipements',
    shortDescription:
      'Fourniture, installation et mise en service de tous les équipements d\'élevage avec formation de vos ouvriers.',
    fullDescription:
      'Nous livrons, installons et testons l\'ensemble des équipements : couveuses, poussinières, cages en batterie, systèmes d\'alimentation et d\'abreuvement automatiques. Une formation pratique de vos ouvriers est incluse pour assurer une prise en main rapide.',
    image:
      'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    iconName: 'Settings',
    features: [
      'Fourniture & livraison des équipements',
      'Installation et câblage électrique',
      'Tests de fonctionnement complets',
      'Formation pratique des ouvriers incluse',
    ],
  },
  {
    id: 'serv-4',
    title: 'Gestion Complète des Fermes d\'Élevage',
    slug: 'gestion-complete-fermes',
    shortDescription:
      'Prise en charge totale de la gestion opérationnelle et technique de votre ferme avicole.',
    fullDescription:
      'Pour les investisseurs ou porteurs de projets qui ne peuvent pas être présents en permanence, nous proposons une gestion déléguée complète : recrutement et encadrement du personnel, gestion des achats d\'intrants, suivi sanitaire, reporting mensuel et optimisation de la rentabilité.',
    image:
      'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=800&q=80',
    iconName: 'BarChart',
    features: [
      'Recrutement & encadrement du personnel',
      'Gestion des achats d\'intrants et de provende',
      'Suivi sanitaire et protocoles vétérinaires',
      'Reporting mensuel de performance & rentabilité',
    ],
  },
];
