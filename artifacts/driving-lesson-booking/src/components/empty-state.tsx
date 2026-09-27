import { CalendarDays, Compass, Inbox } from 'lucide-react';

type EmptyKind = 'bookings' | 'availability' | 'workspace';

const content: Record<EmptyKind, { icon: typeof Inbox; title: string; body: string }> = {
  bookings: {
    icon: CalendarDays,
    title: 'لا توجد حصص قادمة',
    body: 'ستظهر هنا مواعيد دروسك القادمة عندما يتم تأكيدها.',
  },
  availability: {
    icon: Compass,
    title: 'لا توجد أوقات منشورة بعد',
    body: 'عندما ينشر المدرّب أوقاتاً متاحة، ستظهر هنا لتختار منها.',
  },
  workspace: {
    icon: Inbox,
    title: 'المساحة جاهزة لك',
    body: 'لا توجد بيانات تشغيلية بعد. ستظهر هنا بمجرد إعداد أول موعد.',
  },
};

export function EmptyState({ kind }: { kind: EmptyKind }) {
  const item = content[kind];
  const Icon = item.icon;
  return (
    <div className="flex min-h-52 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-background/60 px-6 py-10 text-center" data-testid={`empty-state-${kind}`}>
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon size={22} strokeWidth={1.8} />
      </span>
      <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>
      <p className="mt-1 max-w-xs text-sm leading-6 text-muted-foreground">{item.body}</p>
    </div>
  );
}