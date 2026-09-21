export type StockMode = 'stock' | 'made_to_order' | 'discontinued'
export type EffectiveAvailability = 'available' | 'limited' | 'made_to_order' | 'unavailable'
export type ProductAvailability = EffectiveAvailability

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  categoryIds: string[];
  colors: string[];
  usage: string[];
  stock: number;
  lowStockThreshold?: number;
  stockMode: StockMode;
  /** Legacy persisted value; new availability is calculated from stockMode and stock. */
  availability?: ProductAvailability;
}
export interface Collection {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  image: string;
  href: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
}
export interface NavLink {
  label: string;
  href: string;
}

export interface Hotspot {
  id: string;
  label: string;
  price: string;
  top: string;
  right: string;
}

export interface InspirationImage {
  id: string;
  category: string;
  image: string;
  size: "tall" | "wide" | "square";
}

