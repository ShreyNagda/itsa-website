"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-10">
      <h2 className="text-xl font-semibold text-red-600">Failed to load Explore</h2>
      <p className="text-muted-foreground mt-2">{error.message}</p>
    </main>
  );
}
