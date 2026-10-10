export default function Loading() {
  return (
    <div>
      <div className="skeleton h-4 w-56" />
      <div className="skeleton mt-4 h-32 w-full rounded-2xl" />
      <div className="skeleton mt-8 h-6 w-40" />
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-24 w-full rounded-xl" />
        ))}
      </div>
      <div className="skeleton mt-8 h-64 w-full rounded-xl" />
    </div>
  );
}