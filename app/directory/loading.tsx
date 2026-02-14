export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="h-20 border-b border-border" />

      <main className="flex-1">
        {/* Hero skeleton */}
        <section className="bg-foreground py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="h-12 w-64 bg-primary-foreground/10 mx-auto mb-4" />
            <div className="h-6 w-96 bg-primary-foreground/10 mx-auto" />
          </div>
        </section>

        {/* Grid skeleton */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-border animate-pulse">
                <div className="h-52 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-6 bg-muted w-3/4" />
                  <div className="h-4 bg-muted w-1/2" />
                  <div className="h-4 bg-muted w-full" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
