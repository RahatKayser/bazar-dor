import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { bn, changeInfo, num, unitBn } from "@/lib/format";

function Stat({ label, value, note }) {
  return (
    <div className="rounded-xl border border-green-100 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{note}</p>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitBn(product.unit);
  const c = changeInfo(product.change);

  
  const diff = product.today - product.yesterday;
  const diffText =
    diff > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${num(diff)} টাকা`
      : diff < 0
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${num(Math.abs(diff))} টাকা`
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  
  const rows = (product.markets ?? [])
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.min - b.min || a.max - b.max);

  const hasMarkets = rows.length > 0;
  const minRow = hasMarkets ? rows[0] : null;
  const maxRow = hasMarkets
    ? rows.reduce((best, r) => (r.max > best.max ? r : best), rows[0])
    : null;
  const overallAvg = hasMarkets
    ? Math.round(rows.reduce((sum, r) => sum + r.avg, 0) / rows.length)
    : null;

  return (
    <div>
      
      <nav className="text-sm text-gray-500">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span className="mx-2">›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:underline"
        >
          {product.categoryNameBn}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>

      
      <section className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="text-6xl">{product.image}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-700">
              {diffText}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.cls}`}
              >
                {c.symbol} {c.text}
              </span>
            </p>
          </div>
        </div>

        <div className="sm:text-right">
          <p className="text-sm text-gray-500">আজকের দাম</p>
          <p className="text-5xl font-bold text-green-800">
            {bn(product.today)}
          </p>
          <p className="text-sm text-gray-500">টাকা / {unit}</p>
        </div>
      </section>

      
      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        {hasMarkets ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Stat
              label="সর্বনিম্ন দাম"
              value={`${num(minRow.min)} টাকা`}
              note={`সবচেয়ে কম দামের বাজার: ${minRow.market}`}
            />
            <Stat
              label="সর্বাধিক দাম"
              value={`${num(maxRow.max)} টাকা`}
              note={`সবচেয়ে বেশি দামের বাজার: ${maxRow.market}`}
            />
            <Stat
              label="গড় দাম"
              value={`${num(overallAvg)} টাকা`}
              note={`প্রতি ${unit}-এর হিসাবে`}
            />
          </div>
        ) : (
          <p className="mt-4 text-gray-500">বাজারের তথ্য পাওয়া যায়নি।</p>
        )}
      </section>

      
      {hasMarkets && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-green-100 bg-white">
            <table className="table">
              <thead>
                <tr className="text-gray-600">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={`${r.market}-${r.division}`}>
                    <td className="font-medium">{r.market}</td>
                    <td>{r.division}</td>
                    <td className="text-right">{num(r.min)} টাকা</td>
                    <td className="text-right">{num(r.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {num(r.avg)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}