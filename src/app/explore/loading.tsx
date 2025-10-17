export default function Loading() {
  return (
    <main className="items-center justify-center">
      <section className="py-10">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-6">
            <div className="h-7 w-40 bg-muted rounded" />
            <div className="h-4 w-72 bg-muted rounded mt-2" />
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4 animate-pulse">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="break-inside-avoid">
                <div
                  className={
                    i % 3 === 0
                      ? "h-64 bg-muted rounded-lg"
                      : i % 3 === 1
                      ? "h-80 bg-muted rounded-lg"
                      : "h-48 bg-muted rounded-lg"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
