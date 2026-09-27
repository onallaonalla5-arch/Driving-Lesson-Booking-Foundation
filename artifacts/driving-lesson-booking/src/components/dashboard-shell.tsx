import type { ReactNode } from 'react';
import { LogOut, PanelRight, UserRound } from 'lucide-react';
import { useClerk } from '@clerk/react';
import { Link, useLocation } from 'wouter';
import { BrandMark } from '@/components/brand-mark';

type Role = 'student' | 'instructor' | 'admin';

export function DashboardShell({
  role,
  displayName,
  children,
}: {
  role: Role;
  displayName: string;
  children: ReactNode;
}) {
  const { signOut } = useClerk();
  const [location] = useLocation();
  const isStudent = role === 'student';
  const nav = isStudent
    ? [{ href: '/student', label: 'نظرة عامة' }]
    : [{ href: '/instructor', label: 'نظرة عامة' }];

  return (
    <div className="app-shell noise flex min-h-[100dvh] flex-col md:flex-row" dir="rtl">
      <aside className="hidden w-72 shrink-0 flex-col justify-between bg-sidebar px-5 py-6 text-sidebar-foreground md:flex">
        <div>
          <div className="mb-12 flex items-center justify-between">
            <BrandMark />
            <span className="rounded-full border border-sidebar-border px-2 py-1 text-[10px] font-semibold tracking-[0.15em] text-sidebar-foreground/60">WORKSPACE</span>
          </div>
          <nav className="space-y-1" aria-label="التنقل الرئيسي">
            {nav.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${active ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_8px_20px_hsl(var(--sidebar-primary)/.14)]' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'}`}
                  data-testid={`link-nav-${role}`}
                >
                  <span>{item.label}</span>
                  <PanelRight size={17} className={active ? 'opacity-100' : 'opacity-45'} />
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-sidebar-border pt-5">
          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-sidebar-accent/60 p-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              {displayName.slice(0, 1)}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">{displayName}</span>
              <span className="mt-0.5 block text-xs text-sidebar-foreground/55">{isStudent ? 'متعلّم' : 'مدرّب'}</span>
            </span>
          </div>
          <button type="button" onClick={() => signOut({ redirectUrl: '/' })} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/65 transition hover:bg-sidebar-accent hover:text-sidebar-foreground" data-testid="button-sign-out">
            <LogOut size={17} />
            تسجيل الخروج
          </button>
        </div>
      </aside>
      <header className="flex items-center justify-between border-b border-border bg-card/80 px-5 py-4 backdrop-blur md:hidden">
        <BrandMark compact />
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">{displayName}</span>
          <button type="button" onClick={() => signOut({ redirectUrl: '/' })} className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground" aria-label="تسجيل الخروج" data-testid="button-mobile-sign-out">
            <LogOut size={17} />
          </button>
        </div>
      </header>
      <main className="min-w-0 flex-1 px-5 py-7 md:px-10 md:py-10 lg:px-14">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

export function UserPill({ displayName }: { displayName: string }) {
  return (
    <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground sm:flex" data-testid="text-user-name">
      <UserRound size={16} className="text-primary" />
      <span>{displayName}</span>
    </div>
  );
}