import Link from "next/link";
import { bn, changeInfo, unitBn } from "@/lib/format";

export default function ProductCard({ product }) {
  const c = changeInfo(product.change);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-xl border border-green-100 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-4xl">{product.image}</span>
        <div>
          <h3 className="font-semibold text-gray-900">{product.nameBn}</h3>
          <p className="text-sm text-gray-500">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {bn(product.today)} টাকা
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${c.cls}`}
        >
          {c.symbol} {c.text}
        </span>
      </div>
    </Link>
  );
}