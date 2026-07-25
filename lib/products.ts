import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

export const products = productsData as Product[];

export const collections = [
  "Minimal Calm",
  "Earth Tones",
  "Modern Geometry",
  "Ocean Escape",
  "Golden Light",
  "Architectural Lines",
  "Nature Collection",
  "Luxury Living",
  "Black Edition",
  "Organic Shapes",
];

export function getProductById(id: string) {
  return products.find((item) => item.id === id);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((item) => item.id !== product.id && item.collection === product.collection)
    .slice(0, count);
}
