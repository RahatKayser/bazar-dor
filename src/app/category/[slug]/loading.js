export default function Loading() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-full" />
        <div className="skeleton h-8 w-40" />
      </div>
      <div className="mt-6 flex justify-end">
        <div className="skeleton h-8 w-48" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}