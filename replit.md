# Driving Lesson Booking

مسار هو أساس عربي أولاً لحجز دروس القيادة وإدارة المواعيد بين الطلاب والمدرّبين.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/driving-lesson-booking/` — React + Vite web app, routing, Clerk UI, RTL theme, and placeholder dashboards.
- `artifacts/api-server/` — Express API, Clerk middleware, role protection, and booking read models.
- `lib/api-spec/openapi.yaml` — مصدر عقد الـAPI الوحيد؛ شغّل codegen بعد أي تعديل.
- `lib/db/src/schema/` — جداول PostgreSQL/Drizzle مقسّمة حسب المجال.
- `artifacts/driving-lesson-booking/src/index.css` — tokens ونظام الألوان والخطوط العربية.

## Architecture decisions

- Clerk هو مصدر جلسة تسجيل الدخول؛ `app_users` هو جسر بيانات المنتج الذي يحمل الدور الوظيفي.
- المستخدم المسجّل يُنشأ في `app_users` عند أول طلب جلسة، ويبدأ بدور `student`; ترقية المدرّب/المدير تبقى قرارًا إداريًا في قاعدة البيانات.
- OpenAPI يسبق الكود المولّد؛ الواجهة تستخدم hooks المولّدة بدل عقود أو أنواع يدوية.
- التواريخ اليومية للحصص محفوظة كـ`date` مستقلة عن المنطقة الزمنية، بينما أوقات البداية والنهاية نصوص `HH:mm`.
- الواجهة تستخدم العربية وRTL الآن، مع فصل النصوص والصفحات بما يسمح بإضافة Hebrew وEnglish لاحقًا.

## Product

- صفحة عامة عربية.
- تسجيل دخول وتسجيل حساب عبر Clerk.
- مساران محميان للطالب والمدرّب/المدير.
- بنية قاعدة بيانات للمستخدمين، الطلاب، المدرّبين، إتاحة الحصص، والحجوزات.
- صفحات dashboard أساسية تعرض حالات الفراغ الحقيقية من API دون بيانات وهمية.

## User preferences

- المرحلة الحالية تأسيس فقط: لا مدفوعات، ولا WhatsApp/SMS، ولا إشعارات متقدمة، ولا بيانات وهمية.

## Gotchas

- بعد تعديل `lib/api-spec/openapi.yaml` شغّل `pnpm --filter @workspace/api-spec run codegen`.
- استخدم `pnpm run typecheck` للفحص العام، ولا تشغّل `pnpm dev` من جذر المشروع.
- جلسة Clerk في الويب تعتمد على cookie؛ لا تضف Bearer token أو `setAuthTokenGetter` إلى تطبيق الويب.
- سجلات الـAPI تستخدم Pino؛ لا تستخدم `console.log` في كود الخادم.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
