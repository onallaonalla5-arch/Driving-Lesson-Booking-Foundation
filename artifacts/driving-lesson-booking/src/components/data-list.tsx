import { CalendarClock, CarFront, UsersRound } from 'lucide-react';
import type { Booking, LessonAvailability } from '@workspace/api-client-react';
import { EmptyState } from '@/components/empty-state';
import { StatusBadge } from '@/components/status-badge';

function formatDate(date: string) {
  const parsed = new Date(`${date}T12:00:00`);
  return new Intl.DateTimeFormat('ar', { weekday: 'long', day: 'numeric', month: 'long' }).format(parsed);
}

function timeRange(startTime: string, endTime: string) {
  return `${startTime.slice(0, 5)} – ${endTime.slice(0, 5)}`;
}

export function BookingList({ bookings }: { bookings: Booking[] }) {
  if (!bookings.length) return <EmptyState kind="bookings" />;
  return (
    <div className="space-y-3" data-testid="list-bookings">
      {bookings.map((booking) => (
        <article key={booking.id} className="group flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between" data-testid={`card-booking-${booking.id}`}>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary"><CalendarClock size={20} /></span>
            <div>
              <p className="text-sm font-bold text-foreground">{formatDate(booking.date)}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground" dir="ltr">{timeRange(booking.startTime, booking.endTime)}</p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </article>
      ))}
    </div>
  );
}

export function AvailabilityList({ slots }: { slots: LessonAvailability[] }) {
  if (!slots.length) return <EmptyState kind="availability" />;
  return (
    <div className="space-y-3" data-testid="list-availability">
      {slots.map((slot) => (
        <article key={slot.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-background/70 p-4 transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between" data-testid={`card-availability-${slot.id}`}>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-primary"><CarFront size={19} /></span>
            <div>
              <p className="text-sm font-bold text-foreground">{formatDate(slot.date)}</p>
              <p className="mt-1 text-xs font-medium text-muted-foreground" dir="ltr">{timeRange(slot.startTime, slot.endTime)}</p>
            </div>
          </div>
          <StatusBadge status={slot.status} />
        </article>
      ))}
    </div>
  );
}

export function MetricCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof UsersRound }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]" data-testid={`metric-${label}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary"><Icon size={19} /></span>
      <p className="mt-5 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}