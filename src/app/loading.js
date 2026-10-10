export default function Loading() {
  return (
    <div>
      <div className="skeleton h-64 w-full rounded-2xl" />
      <div className="skeleton mt-10 h-6 w-48" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}