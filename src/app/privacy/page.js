export const metadata = {
  title: "Privacy Policy | Bazar Dor",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-1 text-sm text-gray-500">Bazar Dor (বাজার দর)</p>

      <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="font-semibold text-gray-900">What we collect</h2>
          <p className="mt-1">
            When you create an account or sign in with Google or GitHub, we
            receive your name, email address and profile picture. If you sign
            up with email, we also store a securely hashed password.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">How we use it</h2>
          <p className="mt-1">
            This information is used only to create your account, sign you in,
            and show your name and profile picture inside the app. We do not
            use it for advertising.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Storage and sharing</h2>
          <p className="mt-1">
            Account data is stored in a MongoDB database. We do not sell, rent
            or share your personal information with third parties.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-gray-900">Your choices</h2>
          <p className="mt-1">
            You can update your name from the profile page. To have your
            account deleted, contact us using the email address listed on the
            sign-in consent screen.
          </p>
        </section>

        <p className="text-xs text-gray-500">
          This app is a learning project. Last updated: October 2026.
        </p>
      </div>
    </div>
  );
}