const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor", 
];

async function request(path) {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
      
    }
  }
  return null;
}

export async function getProducts() {
  const data = await request("/products");
  if (Array.isArray(data)) return data;
  return data?.products ?? data?.data ?? [];
}

export async function getProductBySlug(slug) {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}


export function getCategories(products) {
  const seen = new Map();
  for (const p of products) {
    if (!seen.has(p.category)) {
      seen.set(p.category, {
        slug: p.category,
        name: p.categoryNameBn,
        icon: p.categoryIcon,
      });
    }
  }
  return [...seen.values()];
}