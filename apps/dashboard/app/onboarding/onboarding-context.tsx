"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface OnboardingContextValue {
  showStepIndicator: boolean;
  setShowStepIndicator: (show: boolean) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [showStepIndicator, setShowStepIndicator] = useState(true);
  const setter = useCallback((show: boolean) => setShowStepIndicator(show), []);
  return (
    <OnboardingContext.Provider
      value={{ showStepIndicator, setShowStepIndicator: setter }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  return ctx ?? { showStepIndicator: true, setShowStepIndicator: () => {} };
}
