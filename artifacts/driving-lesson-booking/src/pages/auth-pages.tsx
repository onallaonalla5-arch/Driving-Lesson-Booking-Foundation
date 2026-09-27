import { SignIn, SignUp } from '@clerk/react';

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

const appearance = {
  variables: {
    colorPrimary: 'hsl(165 47% 30%)',
    colorForeground: 'hsl(204 36% 18%)',
    colorMutedForeground: 'hsl(204 13% 45%)',
    colorBackground: 'hsl(38 33% 99%)',
    colorInput: 'hsl(37 36% 96%)',
    colorInputForeground: 'hsl(204 36% 18%)',
    colorNeutral: 'hsl(35 22% 86%)',
    borderRadius: '0.9rem',
    fontFamily: "'IBM Plex Sans Arabic', sans-serif",
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-card rounded-[2rem] w-[440px] max-w-full overflow-hidden border border-border shadow-[var(--shadow-lift)]',
    card: '!shadow-none !border-0 !bg-transparent',
    footer: '!shadow-none !border-0 !bg-transparent',
    headerTitle: 'text-foreground font-bold',
    headerSubtitle: 'text-muted-foreground',
    formFieldLabel: 'text-foreground font-semibold',
    formFieldInput: 'bg-background border-border text-foreground',
    formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    footerActionLink: 'text-primary font-semibold',
    footerActionText: 'text-muted-foreground',
    dividerText: 'text-muted-foreground',
    socialButtonsBlockButton: 'border-border bg-background text-foreground',
    socialButtonsBlockButtonText: 'text-foreground font-semibold',
    alertText: 'text-destructive',
  },
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
};

export function SignInPage() {
  return (
    <main className="app-shell flex min-h-[100dvh] items-center justify-center px-4 py-10" dir="rtl">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} appearance={appearance} />
    </main>
  );
}

export function SignUpPage() {
  return (
    <main className="app-shell flex min-h-[100dvh] items-center justify-center px-4 py-10" dir="rtl">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} appearance={appearance} />
    </main>
  );
}