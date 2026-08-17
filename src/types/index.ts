export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
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

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  categoryId: string;
  colors: string[];
  usage: string[];
}