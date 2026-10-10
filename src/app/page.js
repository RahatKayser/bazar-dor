import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";
import { bn } from "@/lib/format";

function Section({ title, subtitle, id, products }) {
  return (
    <section id={id} className="mt-10 scroll-mt-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const products = await getProducts();
  const categories = getCategories(products);

  const byPct = (a, b) =>
    Math.abs(b.change?.pct ?? 0) - Math.abs(a.change?.pct ?? 0);
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort(byPct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort(byPct)
    .slice(0, 6);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
  const marketCount = products[0]?.markets?.length ?? 0;

  return (
    <>
      {/* Hero */}
      <section className="grid items-center gap-6 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div>
          <p className="text-sm font-medium text-green-700">{today}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-3 text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn btn-success mt-5 text-white"
          >
            সব পণ্য দেখুন
          </a>

          <div className="mt-6 flex gap-6 text-sm">
            <div>
              <p className="text-2xl font-bold text-green-800">
                {bn(products.length)}
              </p>
              <p className="text-gray-500">টি নিত্যদিনের পণ্য</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">
                {bn(marketCount)}
              </p>
              <p className="text-gray-500">টি বাজার অন্তর্ভুক্ত</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">
                {bn(categories.length)}
              </p>
              <p className="text-gray-500">টি বিভাগের তথ্য</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            width={315}
            height={263}
            priority
            className="h-auto w-full max-w-sm"
          />
        </div>
      </section>

      <Section title="আজ দাম বেড়েছে ▲" products={risers} />
      <Section title="আজ দাম কমেছে ▼" products={fallers} />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${bn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        products={products}
      />
    </>
  );
}