"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Provide Email and Password");
      return;
    }

    setLoading(true);
    
    toast("লগইন এখনো সংযুক্ত করা হয়নি।");
    setLoading(false);
  }

  function handleSocial(provider) {
    
    toast(`${provider} লগইন এখনো সংযুক্ত করা হয়নি।`);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">সাইন ইন</h1>
      <p className="mt-1 text-sm text-gray-500">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            className="input input-bordered w-full bg-white"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success w-full text-white"
        >
          {loading ? <span className="loading loading-spinner" /> : "সাইন ইন"}
        </button>
      </form>

      <SocialButtons onSocial={handleSocial} disabled={loading} />

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-green-700 hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
      <p className="mt-3 text-center text-sm">
        <Link href="/" className="text-gray-500 hover:underline">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}