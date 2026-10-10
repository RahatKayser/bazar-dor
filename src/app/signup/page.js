"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SocialButtons from "@/components/SocialButtons";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirm) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        const msg = String(error.message || "").toLowerCase();
        toast.error(
          msg.includes("exist")
            ? "An account with this email already exists."
            : "Registration failed. Please try again."
        );
        return;
      }

      toast.success("Account created! Please sign in.");
      router.push("/signin");
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // function handleSocial(provider) {

  //   toast(`${provider} login is not connected yet.`);

  // }

  async function handleSocial(provider) {
    setLoading(true);
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      toast.error("Could not sign in. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mt-1 text-sm text-gray-500">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            className="input input-bordered w-full bg-white"
          />
        </div>

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

        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder=""
            className="input input-bordered w-full bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success w-full text-white"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <SocialButtons onSocial={handleSocial} disabled={loading} />

      <p className="mt-5 text-center text-sm text-gray-600">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-green-700 hover:underline">
          সাইন ইন করুন
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