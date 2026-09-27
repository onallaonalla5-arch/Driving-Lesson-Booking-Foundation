import { ArrowLeft, Check, Clock3, Route, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, Redirect } from 'wouter';
import { useAuth } from '@clerk/react';
import { useHealthCheck, useGetAuthSession, getGetAuthSessionQueryKey, getHealthCheckQueryKey } from '@workspace/api-client-react';
import { BrandMark } from '@/components/brand-mark';

export default function Home() {
  const { isSignedIn } = useAuth();
  const { data: session } = useGetAuthSession({
    query: { enabled: Boolean(isSignedIn), queryKey: getGetAuthSessionQueryKey() },
  });
  const health = useHealthCheck({ query: { staleTime: 60_000, queryKey: getHealthCheckQueryKey() } });

  if (isSignedIn && session?.user?.role === 'student') return <Redirect to="/student" />;
  if (isSignedIn && session?.user?.role === 'instructor') return <Redirect to="/instructor" />;
  if (isSignedIn && session?.user?.role === 'admin') return <Redirect to="/instructor" />;

  return (
    <main className="app-shell noise overflow-hidden" dir="rtl">
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8 md:py-7">
        <BrandMark />
        <nav className="flex items-center gap-3">
          <Link href="/sign-in" className="hidden rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary sm:inline-flex" data-testid="link-home-sign-in">
            تسجيل الدخول
          </Link>
          <Link href="/sign-up" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]" data-testid="link-home-sign-up">
            إنشاء حساب
            <ArrowLeft size={16} />
          </Link>
        </nav>
      </header>

      <section className="relative mx-auto max-w-7xl px-5 pb-20 pt-10 md:px-8 md:pb-32 md:pt-20">
        <div className="pointer-events-none absolute -left-28 top-0 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="page-enter">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-bold text-primary" data-testid="status-home-health">
              <span className={`h-1.5 w-1.5 rounded-full ${health.isError ? 'bg-destructive' : 'bg-primary'}`} />
              {health.isError ? 'المساحة غير متصلة' : 'مساحتك المنظمة لتعلّم القيادة'}
            </div>
            <h1 className="display-ar max-w-2xl text-balance text-[clamp(2.8rem,7vw,6.35rem)] font-bold leading-[1.08] text-foreground">
              كل حصة تبدأ
              <span className="relative mx-2 inline-block text-primary">
                بوضوح
                <span className="absolute -bottom-1 right-0 h-1.5 w-2/3 rounded-full bg-accent" />
              </span>
              وتنتهي بتقدّم.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              مسار يجمع الطالب والمدرّب حول جدول مفهوم، ومواعيد مؤكدة، ومساحة واحدة تعرف منها ما التالي.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/sign-up" className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]" data-testid="link-hero-sign-up">
                ابدأ من هنا
                <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
              </Link>
              <Link href="/sign-in" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-card/60 px-6 py-4 text-sm font-bold text-foreground transition hover:border-primary/30 hover:bg-card" data-testid="link-hero-sign-in">
                لدي حساب بالفعل
              </Link>
            </div>
            <p className="mt-5 text-xs font-medium text-muted-foreground">مصمّم للعربية أولاً، ومهيّأ للغات أخرى لاحقاً.</p>
          </div>

          <div className="relative page-enter stagger-2">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-primary/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-5 shadow-[var(--shadow-lift)] md:p-7">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">مساحة الطالب</p>
                  <p className="mt-1 text-lg font-bold text-foreground">أهلاً بك في مسارك</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/25 text-primary"><Route size={19} /></span>
              </div>
              <div className="mt-6 rounded-2xl bg-sidebar p-5 text-sidebar-foreground">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-sidebar-foreground/60">موعدك القادم</p>
                    <p className="mt-2 text-xl font-bold">حين يتم التأكيد</p>
                  </div>
                  <Clock3 size={20} className="text-sidebar-primary" />
                </div>
                <div className="mt-7 h-2 overflow-hidden rounded-full bg-sidebar-accent">
                  <div className="h-full w-[42%] rounded-full bg-sidebar-primary" />
                </div>
                <div className="mt-2 flex justify-between text-[11px] text-sidebar-foreground/55"><span>البداية</span><span>التقدم يحتاج موعداً</span></div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-secondary/65 p-4"><ShieldCheck size={18} className="text-primary" /><p className="mt-3 text-sm font-bold text-foreground">واضح</p><p className="mt-1 text-xs text-muted-foreground">كل التفاصيل في مكانها</p></div>
                <div className="rounded-2xl bg-accent/15 p-4"><Sparkles size={18} className="text-primary" /><p className="mt-3 text-sm font-bold text-foreground">هادئ</p><p className="mt-1 text-xs text-muted-foreground">أقل تشتتاً، أكثر تركيزاً</p></div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-5 text-xs font-semibold text-muted-foreground"><Check size={15} className="text-primary" /> بدون جداول متفرقة أو رسائل ضائعة</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/45">
        <div className="mx-auto grid max-w-7xl gap-px px-5 md:grid-cols-3 md:px-8">
          {[
            { icon: Clock3, title: 'اعرف ما التالي', body: 'المواعيد المؤكدة والفتحات المتاحة تظهر بترتيب مفهوم.' },
            { icon: ShieldCheck, title: 'ثقة في كل خطوة', body: 'حسابك ومساحتك مصمّمان بحسب دورك، دون ضوضاء إضافية.' },
            { icon: Route, title: 'تقدّم له اتجاه', body: 'يتشارك الطالب والمدرّب نفس الصورة التشغيلية الواضحة.' },
          ].map(({ icon: Icon, title, body }, index) => (
            <div className="flex gap-4 px-2 py-8 md:px-8 md:py-12" key={title} data-testid={`feature-home-${index}`}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-primary"><Icon size={19} /></span>
              <div><h2 className="font-bold text-foreground">{title}</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p></div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs font-medium text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
        <span>مسار — مساحة قيادة مرتّبة من البداية.</span>
        <span>العربية أولاً · لغات أخرى قادمة</span>
      </footer>
    </main>
  );
}