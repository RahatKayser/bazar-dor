"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function CategoryProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sorted = [...products];
  if (sort === "asc") sorted.sort((a, b) => a.today - b.today);
  if (sort === "desc") sorted.sort((a, b) => b.today - a.today);

  return (
    <>
      <div className="mt-6 flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-sm bg-white"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}