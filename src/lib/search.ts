"use client";

import { create, insert, search, Orama } from "@orama/orama";
import { PRODUCTS, Product } from "@/lib/product-data";

let searchDb: Orama<any> | null = null;
let isInitializing = false;

// Initialize the search database
export async function initSearchDb() {
  // Return existing db if already initialized
  if (searchDb) return searchDb;
  
  // Prevent double initialization
  if (isInitializing) {
    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    return searchDb;
  }

  isInitializing = true;

  try {
    searchDb = await create({
      schema: {
        id: "string",
        name: "string",
        price: "number",
        color: "string",
        category: "string",
        description: "string",
      },
    });

    // Index all products
    for (const product of PRODUCTS) {
      await insert(searchDb, {
        id: String(product.id),
        name: product.name,
        price: product.price,
        color: product.colors[0] || "",
        category: product.category,
        description: product.description,
      });
    }
  } finally {
    isInitializing = false;
  }

  return searchDb;
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  if (!searchDb) {
    await initSearchDb();
  }

  if (!query.trim()) {
    return PRODUCTS;
  }

  const results = await search(searchDb!, {
    term: query,
    properties: ["name", "color", "category", "description"],
    tolerance: 1, // Allow typos
    limit: 20,
  });

  // Map search results back to full product data
  const productIds = results.hits.map((hit) => Number(hit.document.id));
  return PRODUCTS.filter((p) => productIds.includes(p.id));
}

// Get search suggestions (autocomplete)
export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!searchDb || !query.trim()) {
    return [];
  }

  const results = await search(searchDb, {
    term: query,
    properties: ["name", "category"],
    tolerance: 1,
    limit: 5,
  });

  const suggestions = new Set<string>();
  results.hits.forEach((hit) => {
    suggestions.add(hit.document.name);
    suggestions.add(hit.document.category);
  });

  return Array.from(suggestions).slice(0, 5);
}
