"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully.");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("Could not sign out."),
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="btn btn-outline btn-error btn-sm"
    >
      ↩ সাইন আউট
    </button>
  );
}