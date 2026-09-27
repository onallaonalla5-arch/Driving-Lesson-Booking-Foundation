import { CalendarDays, CarFront, UsersRound } from 'lucide-react';
import {
  getGetInstructorDashboardQueryKey,
  getListBookingsQueryKey,
  getListLessonAvailabilityQueryKey,
  useGetInstructorDashboard,
  useListBookings,
  useListLessonAvailability,
} from '@workspace/api-client-react';
import { AvailabilityList, BookingList, MetricCard } from '@/components/data-list';
import { InlineError, DashboardSkeleton } from '@/components/loading-state';
import { ProtectedRoute } from '@/components/protected-route';

export default function InstructorPage() {
  return (
    <ProtectedRoute role={['instructor', 'admin']}>
      <InstructorContent />
    </ProtectedRoute>
  );
}

function InstructorContent() {
  const dashboard = useGetInstructorDashboard({ query: { queryKey: getGetInstructorDashboardQueryKey(), retry: 1 } });
  const bookings = useListBookings({ query: { queryKey: getListBookingsQueryKey(), retry: 1 } });
  const availability = useListLessonAvailability({ query: { queryKey: getListLessonAvailabilityQueryKey(), retry: 1 } });

  const isLoading = dashboard.isLoading || bookings.isLoading || availability.isLoading;
  const isError = dashboard.isError || bookings.isError || availability.isError;
  if (isLoading) return <DashboardSkeleton />;
  if (isError) {
    return <InlineError onRetry={() => { void dashboard.refetch(); void bookings.refetch(); void availability.refetch(); }} />;
  }

  const upcomingBookings = dashboard.data?.upcomingBookings ?? bookings.data ?? [];
  const publishedAvailability = dashboard.data?.availability ?? availability.data ?? [];
  const studentCount = dashboard.data?.studentCount ?? 0;
  const bookingCount = dashboard.data?.bookingCount ?? upcomingBookings.length;

  return (
    <div className="page-enter" dir="rtl">
      <header className="mb-8">
        <p className="text-sm font-semibold text-primary">مساحة المدرّب</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">صورة تشغيلية هادئة.</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">تابع المواعيد والفتحات المنشورة من مكان واحد.</p>
      </header>

      <section className="mb-7 grid gap-4 sm:grid-cols-3">
        <MetricCard label="الطلاب" value={studentCount} icon={UsersRound} />
        <MetricCard label="الحجوزات" value={bookingCount} icon={CalendarDays} />
        <MetricCard label="الفتحات المنشورة" value={publishedAvailability.length} icon={CarFront} />
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:p-6" data-testid="section-instructor-bookings">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><CalendarDays size={19} /></span><div><h2 className="font-bold text-foreground">الحجوزات القادمة</h2><p className="mt-0.5 text-xs text-muted-foreground">المواعيد المرتبطة بحسابك</p></div></div>
          <BookingList bookings={upcomingBookings} />
        </section>
        <section className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:p-6" data-testid="section-instructor-availability">
          <div className="mb-5 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-primary"><CarFront size={19} /></span><div><h2 className="font-bold text-foreground">الفتحات المنشورة</h2><p className="mt-0.5 text-xs text-muted-foreground">الأوقات الحالية للطلاب</p></div></div>
          <AvailabilityList slots={publishedAvailability} />
        </section>
      </div>
    </div>
  );
}