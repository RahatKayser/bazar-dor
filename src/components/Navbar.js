
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function Avatar({ user }) {
  if (user.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt={user.name}
        referrerPolicy="no-referrer"
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
      {(user.name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default function Navbar({ categories }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);

  const user = session?.user;
  const firstName = user?.name?.trim().split(" ")[0];

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  async function handleSignOut() {
    setOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signout successful");
          router.push("/");
          router.refresh();
        },
        onError: () => toast.error("Signout failed"),
      },
    });
  }

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

          {isPending ? (
            <div className="skeleton h-9 w-32 rounded-full" />
          ) : user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full border border-green-200 py-1 pl-1 pr-3 hover:bg-green-50"
              >
                <Avatar user={user} />
                <span className="text-sm font-medium">{firstName} ▾</span>
              </button>

              {open && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpen(false)}
                  />
                  <div className="absolute right-0 z-20 mt-2 w-60 rounded-xl border border-green-100 bg-white p-2 shadow-lg">
                    <div className="border-b border-gray-100 px-3 py-2">
                      <p className="truncate font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-green-50"
                    >
                      👤 আমার প্রোফাইল
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      ↩ সাইন আউট
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                href="/signin"
                className="btn btn-outline btn-success btn-sm sm:btn-md"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-success btn-sm text-white sm:btn-md"
              >
                সাইন আপ
              </Link>
            </div>
          )}
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