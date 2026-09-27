import { ArrowRight, ShieldAlert } from 'lucide-react';
import { Link } from 'wouter';
import { BrandMark } from '@/components/brand-mark';

export default function Unauthorized() {
  return (
    <main className="app-shell mesh-grid flex min-h-[100dvh] items-center justify-center px-5 py-10" dir="rtl">
      <div className="w-full max-w-lg rounded-[2rem] border border-border bg-card p-8 text-center shadow-[var(--shadow-lift)] sm:p-12 page-enter">
        <BrandMark />
        <div className="mx-auto mt-14 flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/25 text-primary">
          <ShieldAlert size={28} strokeWidth={1.7} />
        </div>
        <p className="mt-7 text-sm font-bold text-primary">صلاحيات الحساب</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">هذه المساحة ليست متاحة لحسابك</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-muted-foreground">تم تسجيل دخولك بنجاح، لكن دور حسابك لا يطابق هذه الصفحة. اختر المساحة المناسبة لك من البداية.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]" data-testid="link-unauthorized-home">
          <ArrowRight size={17} />
          العودة للرئيسية
        </Link>
      </div>
    </main>
  );
}