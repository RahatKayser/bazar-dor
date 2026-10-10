import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=%2Fprofile");

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="mt-1 text-sm text-gray-500">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-16 w-16 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-2xl font-bold text-white">
                {(user.name || "?").trim().charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <h2 className="font-semibold text-gray-900">তথ্য</h2>
          <div className="mt-3">
            <p className="text-sm text-gray-500">নাম</p>
            <p className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">
              {user.name}
            </p>
          </div>
          <Link
            href="/profile/update"
            className="btn btn-success mt-4 text-white"
          >
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}