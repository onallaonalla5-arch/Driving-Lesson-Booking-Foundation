const labels: Record<string, string> = {
  pending: 'قيد الانتظار',
  confirmed: 'مؤكدة',
  completed: 'مكتملة',
  cancelled: 'ملغاة',
  available: 'متاحة',
  held: 'معلّقة',
  booked: 'محجوزة',
  blocked: 'محجوبة',
};

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === 'confirmed' || status === 'available'
      ? 'bg-primary/10 text-primary'
      : status === 'cancelled' || status === 'blocked'
        ? 'bg-destructive/10 text-destructive'
        : 'bg-accent/20 text-foreground';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`} data-testid={`status-badge-${status}`}>
      {labels[status] ?? status}
    </span>
  );
}