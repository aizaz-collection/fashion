function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-full ${className}`} />;
}

export default function ShopSkeleton() {
  return (
    <div className="min-h-screen bg-ink" aria-label="Loading collection" aria-busy="true">
      <section className="relative overflow-hidden border-b border-white/[0.06] py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.12),transparent_58%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <SkeletonLine className="mx-auto h-3 w-36" />
          <SkeletonLine className="mx-auto mt-5 h-12 w-full max-w-2xl" />
          <SkeletonLine className="mx-auto mt-5 h-4 w-full max-w-xl" />
          <div className="mt-10 flex justify-center gap-3">
            <SkeletonLine className="h-11 w-36" />
            <SkeletonLine className="h-11 w-36" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden space-y-7 lg:block">
            <SkeletonLine className="h-4 w-24" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonLine key={index} className="h-10 w-full" />
              ))}
            </div>
            <SkeletonLine className="h-4 w-20" />
            <SkeletonLine className="h-12 w-full" />
          </aside>

          <div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <SkeletonLine className="h-14 flex-1" />
              <SkeletonLine className="h-14 w-full sm:w-52" />
            </div>
            <SkeletonLine className="mt-7 h-3 w-48" />
            <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-[1.35rem] border border-white/[0.06] bg-charcoal">
                  <div className="skeleton aspect-[4/5] w-full" />
                  <div className="space-y-3 p-5">
                    <SkeletonLine className="h-3 w-20" />
                    <SkeletonLine className="h-5 w-4/5" />
                    <SkeletonLine className="h-4 w-24" />
                    <SkeletonLine className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
