"use client";

import { useEffect } from "react";
import { cn } from "@repo/ui/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { buildVerifyEmailRedirect, hasVerifiedEmail } from "@/lib/auth-redirects";
import { routes } from "@/lib/routes";

import { OnboardingProvider, useOnboarding } from "./onboarding-context";

const steps = [
  { path: "/onboarding/scan", label: "Tarama" },
  { path: "/onboarding/brief", label: "Brifing" },
  { path: "/onboarding/select-package", label: "Paket" },
  { path: "/onboarding/select-addons", label: "Eklentiler" },
  { path: "/onboarding/form", label: "Detaylar" },
  { path: "/onboarding/summary", label: "Özet" },
];

function StepIndicator() {
  const pathname = usePathname();
  const { showStepIndicator } = useOnboarding();
  const currentStepIndex = steps.findIndex((step) => pathname === step.path);
  const currentStep = currentStepIndex === -1 ? 0 : currentStepIndex;
  const totalSteps = steps.length;

  if (!showStepIndicator) return null;

  return (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2"
      role="navigation"
      aria-label="Onboarding ilerleme"
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              type="button"
              disabled={index > currentStep}
              className={cn(
                "flex items-center justify-center rounded-full transition-all duration-150 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive ? "h-4 w-6 cursor-default" : "size-4",
                index > currentStep && "cursor-not-allowed",
              )}
              aria-label={`Adım ${index + 1}/${totalSteps}: ${steps[index]?.label ?? "Adım"}`}
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={cn(
                  "rounded-full transition-all",
                  isActive && "h-2.5 w-5 bg-foreground",
                  isCompleted && !isActive && "size-2 bg-foreground",
                  !isActive && !isCompleted && "size-2 bg-foreground/30",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    const params = searchParams.toString();
    const currentPath = `${pathname}${params ? `?${params}` : ""}`;

    if (!user) {
      router.replace(routes.loginWithRedirect(currentPath));

      return;
    }

    if (!hasVerifiedEmail(user)) {
      router.replace(buildVerifyEmailRedirect(currentPath));
    }
  }, [loading, pathname, router, searchParams, user]);

  if (loading || !user || !hasVerifiedEmail(user)) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <OnboardingProvider>
      <div className="relative min-h-screen bg-background">
        {children}
        <StepIndicator />
      </div>
    </OnboardingProvider>
  );
}
