import { products, productsEn } from "../data/products";
import { collections } from "../data/collections";
import { articles, articlesEn } from "../data/content";

export function searchAll(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { products: [], collections: [], articles: [] };

  const matchedProducts = products.filter((product) => {
    const en = productsEn[product.id];
    return (
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      en.name.toLowerCase().includes(q) ||
      en.description.toLowerCase().includes(q)
    );
  });

  const matchedCollections = collections.filter(
    (collection) =>
      collection.name.toLowerCase().includes(q) ||
      collection.nameEn.toLowerCase().includes(q) ||
      collection.description.toLowerCase().includes(q)
  );

  const matchedArticles = articles.filter((article) => {
    const en = articlesEn[article.id];
    return (
      article.title.toLowerCase().includes(q) ||
      article.description.toLowerCase().includes(q) ||
      en.title.toLowerCase().includes(q) ||
      en.description.toLowerCase().includes(q)
    );
  });

  return { products: matchedProducts, collections: matchedCollections, articles: matchedArticles };
}