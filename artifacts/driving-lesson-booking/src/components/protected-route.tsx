import type { ReactNode } from 'react';
import { useAuth } from '@clerk/react';
import { useGetAuthSession, getGetAuthSessionQueryKey } from '@workspace/api-client-react';
import { Redirect } from 'wouter';
import { DashboardShell } from '@/components/dashboard-shell';
import { DashboardSkeleton } from '@/components/loading-state';

type Role = 'student' | 'instructor' | 'admin';

export function ProtectedRoute({ role, children }: { role: Role | Role[]; children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const sessionQuery = useGetAuthSession({
    query: {
      enabled: Boolean(isLoaded && isSignedIn),
      queryKey: getGetAuthSessionQueryKey(),
      retry: 1,
    },
  });

  if (!isLoaded || (isSignedIn && sessionQuery.isLoading)) return <DashboardSkeleton />;
  if (!isSignedIn) return <Redirect to="/sign-in" />;
  if (sessionQuery.isError || !sessionQuery.data?.authenticated || !sessionQuery.data.user) return <Redirect to="/sign-in" />;
  const allowedRoles = Array.isArray(role) ? role : [role];
  if (!allowedRoles.includes(sessionQuery.data.user.role)) return <Redirect to="/unauthorized" />;

  return (
    <DashboardShell role={allowedRoles.includes('student') ? 'student' : 'instructor'} displayName={sessionQuery.data.user.displayName || sessionQuery.data.user.email}>
      {children}
    </DashboardShell>
  );
}