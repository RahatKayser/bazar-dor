import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getProducts } from "@/lib/api";
import { bn } from "@/lib/format";

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const all = await getProducts();
  const products = all.filter((p) => p.category === slug);

  
  if (products.length === 0) notFound();

  const { categoryIcon, categoryNameBn } = products[0];

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-4xl">{categoryIcon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
          <p className="text-sm text-gray-500">
            মোট {bn(products.length)}টি পণ্য
          </p>
        </div>
      </div>

      <CategoryProducts products={products} />
    </div>
  );
}