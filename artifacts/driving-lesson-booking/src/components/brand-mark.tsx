import { Link } from 'wouter';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-3 no-underline"
      data-testid="link-brand-home"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent shadow-[0_7px_0_hsl(var(--primary)/.12)] transition-transform duration-300 group-hover:-translate-y-0.5">
        <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
          <path d="M8 19.5A7.5 7.5 0 0 1 15.5 12H25v6.5h-9.5a1 1 0 1 0 0 2H25V24h-9.5A7.5 7.5 0 0 1 8 19.5Z" fill="hsl(var(--sidebar))" />
          <path d="M15 7.5A2.5 2.5 0 0 1 17.5 5H22a2.5 2.5 0 0 1 2.5 2.5V12H15V7.5Z" fill="hsl(var(--sidebar))" />
        </svg>
      </span>
      {!compact && (
        <span className="text-right leading-none">
          <span className="block text-[1.08rem] font-bold tracking-[-0.04em] text-foreground">مسار</span>
          <span className="mt-1 block text-[0.63rem] font-semibold tracking-[0.18em] text-muted-foreground">DRIVE · IN ORDER</span>
        </span>
      )}
    </Link>
  );
}