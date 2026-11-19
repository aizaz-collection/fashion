export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8" aria-label="Loading">
      <div className="skeleton h-4 w-32 rounded" />
      <div className="skeleton mt-5 h-12 w-full max-w-xl rounded" />
      <div className="skeleton mt-4 h-4 w-full max-w-md rounded" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-white/5 bg-charcoal">
            <div className="skeleton aspect-[4/5]" />
            <div className="space-y-3 p-4">
              <div className="skeleton h-3 w-16 rounded" />
              <div className="skeleton h-5 w-4/5 rounded" />
              <div className="skeleton h-5 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
