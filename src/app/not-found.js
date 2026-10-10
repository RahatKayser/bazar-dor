import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-10 text-center shadow-sm">
      <p className="text-6xl">🛒</p>
      <h1 className="mt-4 text-3xl font-bold text-gray-900">৪০৪</h1>
      <p className="mt-2 text-gray-600">
        দুঃখিত, আপনি যে পাতাটি খুঁজছেন সেটি পাওয়া যায়নি।
      </p>
      <Link href="/" className="btn btn-success mt-6 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}