import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateNameForm from "@/components/UpdateNameForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirect=%2Fprofile%2Fupdate");

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">নাম আপডেট করুন</h1>
      <p className="mt-1 text-sm text-gray-500">
        আপনার প্রোফাইলের নাম বদলাতে নতুন নাম লিখুন।
      </p>
      <UpdateNameForm initialName={session.user.name} />
    </div>
  );
}