"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateNameForm({ initialName }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      toast.error("Name cannot be empty.");
      return;
    }
    if (trimmed === initialName) {
      toast("No changes to save.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        toast.error("Could not update your name. Please try again.");
        return;
      }
      toast.success("Name updated successfully.");
      router.push("/profile");
      router.refresh();
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
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
          className="input input-bordered w-full bg-white"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn btn-success text-white"
        >
          {loading ? <span className="loading loading-spinner" /> : "সংরক্ষণ করুন"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="btn btn-ghost"
        >
          বাতিল
        </button>
      </div>
    </form>
  );
}