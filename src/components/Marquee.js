import Link from "next/link";
import { bn, changeInfo, unitBn } from "@/lib/format";

export default function Marquee({ products }) {
  if (!products.length) return null;

  const renderItems = (prefix) =>
    products.map((p) => {
      const c = changeInfo(p.change);
      const color =
        p.change?.dir === "up"
          ? "text-green-300"
          : p.change?.dir === "down"
          ? "text-red-300"
          : "text-gray-300";
      return (
        <Link
          key={`${prefix}-${p.id}`}
          href={`/product/${p.slug}`}
          className="flex items-center gap-2 whitespace-nowrap px-5 text-sm hover:bg-green-800"
        >
          <span>{p.image}</span>
          <span>{p.nameBn}</span>
          <span className="font-semibold">
            {bn(p.today)} টাকা/{unitBn(p.unit)}
          </span>
          <span className={color}>
            {c.symbol} {c.text}
          </span>
        </Link>
      );
    });

  return (
    <div className="marquee overflow-hidden bg-green-900 py-2 text-white">
      <div className="marquee-track">
        {renderItems("a")}
        {renderItems("b")}
      </div>
    </div>
  );
}