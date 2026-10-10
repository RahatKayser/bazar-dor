"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="border-b border-green-100 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="leading-tight">
            <span className="text-xl font-bold text-green-800">🛒 বাজার দর</span>
            <span
              className="block text-xs text-gray-500"
              suppressHydrationWarning
            >
              {today}
            </span>
          </Link>

          
          <div className="flex gap-2">
            <Link href="/signin" className="btn btn-outline btn-success btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-success btn-sm text-white sm:btn-md">
              সাইন আপ
            </Link>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-3">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-sm ${
                  active
                    ? "border-green-700 bg-green-700 text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-green-50"
                }`}
              >
                {c.icon} {c.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}