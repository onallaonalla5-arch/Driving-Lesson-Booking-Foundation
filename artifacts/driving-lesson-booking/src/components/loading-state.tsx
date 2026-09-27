export function DashboardSkeleton() {
  return (
    <div className="space-y-6 page-enter" aria-label="جارٍ التحميل" data-testid="loading-dashboard">
      <div className="skeleton h-8 w-48 rounded-xl" />
      <div className="skeleton h-24 w-full rounded-3xl" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="skeleton h-56 rounded-3xl" />
        <div className="skeleton h-56 rounded-3xl" />
      </div>
    </div>
  );
}

export function InlineError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 text-center" data-testid="status-api-error">
      <p className="font-semibold text-foreground">تعذّر تحميل البيانات الآن</p>
      <p className="mt-1 text-sm text-muted-foreground">تحقّق من الاتصال وحاول مرة أخرى.</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]"
        data-testid="button-retry-api"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}