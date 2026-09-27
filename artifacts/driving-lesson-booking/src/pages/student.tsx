import { CalendarDays, ChevronLeft, Compass, Sparkles } from 'lucide-react';
import {
  getGetStudentDashboardQueryKey,
  getListBookingsQueryKey,
  getListLessonAvailabilityQueryKey,
  useGetStudentDashboard,
  useListBookings,
  useListLessonAvailability,
} from '@workspace/api-client-react';
import { AvailabilityList, BookingList } from '@/components/data-list';
import { InlineError, DashboardSkeleton } from '@/components/loading-state';
import { ProtectedRoute } from '@/components/protected-route';

export default function StudentPage() {
  return (
    <ProtectedRoute role="student">
      <StudentContent />
    </ProtectedRoute>
  );
}

function StudentContent() {
  const dashboard = useGetStudentDashboard({ query: { queryKey: getGetStudentDashboardQueryKey(), retry: 1 } });
  const bookings = useListBookings({ query: { queryKey: getListBookingsQueryKey(), retry: 1 } });
  const availability = useListLessonAvailability({ query: { queryKey: getListLessonAvailabilityQueryKey(), retry: 1 } });

  const isLoading = dashboard.isLoading || bookings.isLoading || availability.isLoading;
  const isError = dashboard.isError || bookings.isError || availability.isError;
  if (isLoading) return <DashboardSkeleton />;
  if (isError) {
    return <InlineError onRetry={() => { void dashboard.refetch(); void bookings.refetch(); void availability.refetch(); }} />;
  }

  const upcomingBookings = dashboard.data?.upcomingBookings ?? bookings.data ?? [];
  const availableSlots = dashboard.data?.availableSlots ?? availability.data ?? [];

  return (
    <div className="page-enter" dir="rtl">
      <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">مساحة الطالب</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">خطوتك القادمة واضحة.</h1>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">هنا ستجد مواعيدك والفتحات المتاحة لك، دون تفاصيل زائدة.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground" data-testid="status-student-live">
          <span className="h-2 w-2 rounded-full bg-primary" />
          البيانات محدثة من حسابك
        </div>
      </header>

      <section className="relative mb-7 overflow-hidden rounded-[2rem] bg-sidebar p-6 text-sidebar-foreground shadow-[var(--shadow-lift)] md:p-8">
        <div className="pointer-events-none absolute -left-12 -top-20 h-60 w-60 rounded-full bg-sidebar-primary/15 blur-3xl" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground"><Sparkles size={18} /></span>
            <h2 className="max-w-lg text-2xl font-bold leading-[1.35] md:text-3xl">المواعيد التي تحتاجها ستظهر هنا، في وقتها.</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-sidebar-foreground/65">ابدأ بمراجعة الفتحات المنشورة. لا يوجد شيء مطلوب منك الآن إن لم تظهر بيانات بعد.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold text-sidebar-primary"><span>{availableSlots.length} فتحات متاحة</span><ChevronLeft size={16} /></div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:p-6" data-testid="section-upcoming-bookings">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><CalendarDays size={19} /></span><div><h2 className="font-bold text-foreground">المواعيد القادمة</h2><p className="mt-0.5 text-xs text-muted-foreground">{upcomingBookings.length} مواعيد</p></div></div>
          </div>
          <BookingList bookings={upcomingBookings} />
        </section>
        <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:p-6" data-testid="section-available-slots">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-primary"><Compass size={19} /></span><div><h2 className="font-bold text-foreground">الفتحات المتاحة</h2><p className="mt-0.5 text-xs text-muted-foreground">المواعيد المنشورة حالياً</p></div></div>
          <AvailabilityList slots={availableSlots} />
        </section>
      </div>
    </div>
  );
}