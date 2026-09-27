import { Link } from 'wouter';
import { BrandMark } from '@/components/brand-mark';

export default function NotFound() {
  return (
    <main className="app-shell flex min-h-[100dvh] items-center justify-center px-6 text-center" dir="rtl">
      <div>
        <BrandMark />
        <p className="mt-14 text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground">هذه الصفحة غير موجودة</h1>
        <p className="mt-3 text-muted-foreground">ربما تغيّر الرابط أو لم يعد متاحاً.</p>
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]" data-testid="link-back-home">
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>
    </main>
  );
}
