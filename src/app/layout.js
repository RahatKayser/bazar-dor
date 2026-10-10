import "./globals.css";
import { Hind_Siliguri } from "next/font/google";
import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";
import { getProducts, getCategories } from "@/lib/api";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default async function RootLayout({ children }) {
  const products = await getProducts();
  const categories = getCategories(products);

  return (
    <html lang="bn" data-theme="light">
      <body className={`${font.className} flex min-h-screen flex-col`}>
        <Navbar categories={categories} />
        <Marquee products={products} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}