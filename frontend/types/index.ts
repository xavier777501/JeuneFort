export type ProductStatus = 'EN_STOCK' | 'SUR_COMMANDE' | 'INDISPONIBLE';

export type CategorySlug = 
  | 'poussins'
  | 'intrants-sante'
  | 'equipements'
  | 'animaux-reformes'
  | 'oeufs'
  | 'provende';

export interface Category {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
  image: string;
  itemCount: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: CategorySlug;
  categoryName: string;
  price: number; // En FCFA
  unit: string; // ex: "l'unité", "le carton", "le sac de 50kg", "le poussin"
  status: ProductStatus;
  stockQuantity: number;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: { label: string; value: string }[];
  isFeatured?: boolean;
  minOrderQuantity?: number;
  rating?: number;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  iconName: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
