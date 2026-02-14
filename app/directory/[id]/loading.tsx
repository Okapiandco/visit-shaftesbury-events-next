export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-20 border-b border-border" />
      <main className="flex-1">
        <div className="h-64 md:h-80 bg-muted animate-pulse" />
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="h-4 w-32 bg-muted mb-8" />
            <div className="h-6 w-24 bg-muted mb-4" />
            <div className="h-12 w-2/3 bg-muted mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 w-24 bg-muted" />
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-3/4 bg-muted" />
              </div>
              <div className="border border-border p-6 space-y-4 animate-pulse">
                <div className="h-6 w-32 bg-muted" />
                <div className="h-4 w-full bg-muted" />
                <div className="h-4 w-full bg-muted" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
