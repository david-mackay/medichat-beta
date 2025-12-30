export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          <div className="h-4 w-[520px] max-w-full rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-9 w-24 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          <div className="h-9 w-36 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          <div className="h-9 w-20 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 transition-colors duration-200"
          >
            <div className="h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
            <div className="mt-2 h-7 w-16 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
            <div className="mt-2 h-3 w-40 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          </div>
        ))}
      </section>

      <section className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-3 transition-colors duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <div className="h-4 w-36 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
            <div className="h-3 w-[560px] max-w-full rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          </div>
          <div className="h-9 w-28 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
        </div>
        <div className="h-1 rounded bg-zinc-100 dark:bg-zinc-900 medichat-progress" />
        <div className="space-y-2">
          <div className="h-4 w-[92%] max-w-[640px] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          <div className="h-4 w-[86%] max-w-[620px] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
          <div className="h-4 w-[72%] max-w-[520px] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-3 transition-colors duration-200"
          >
            <div className="h-4 w-32 rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
            <div className="space-y-2">
              <div className="h-3 w-[88%] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
              <div className="h-3 w-[76%] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
              <div className="h-3 w-[64%] rounded bg-zinc-100 dark:bg-zinc-900 medichat-skeleton" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}


