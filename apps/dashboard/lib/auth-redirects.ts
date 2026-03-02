import { routes } from "@/lib/routes"

type AuthUserShape = {
  emailVerified?: boolean | null
  email_verified_at?: string | null
  onboardingCompleted?: boolean | null
  onboarding_completed?: boolean | null
}

function normalizePath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`
}

function looksLikeUser(value: unknown): value is AuthUserShape {
  return typeof value === "object" && value !== null
}

function isOnboardingPath(path: string): boolean {
  return path === routes.onboarding.scan() || path.startsWith("/onboarding/")
}

export function hasVerifiedEmail(user: unknown): boolean {
  if (!looksLikeUser(user)) {
    return false
  }

  return user.emailVerified === true || Boolean(user.email_verified_at)
}

export function hasCompletedOnboarding(user: unknown): boolean {
  if (!looksLikeUser(user)) {
    return false
  }

  return user.onboardingCompleted === true || user.onboarding_completed === true
}

export function buildVerifyEmailRedirect(targetPath: string): string {
  const normalizedPath = normalizePath(targetPath)

  return `${routes.verifyEmail()}?redirect=${encodeURIComponent(normalizedPath)}`
}

export function getPostAuthDestination(user: unknown, requestedPath: string): string {
  const normalizedPath = normalizePath(requestedPath)

  if (!hasCompletedOnboarding(user)) {
    return isOnboardingPath(normalizedPath) ? normalizedPath : routes.onboarding.scan()
  }

  return normalizedPath
}

export function getAuthDestination(user: unknown, requestedPath: string): string {
  const destination = getPostAuthDestination(user, requestedPath)

  if (!hasVerifiedEmail(user)) {
    return buildVerifyEmailRedirect(destination)
  }

  return destination
}

export function getPostVerificationDestination(
  user: unknown,
  requestedPath?: string | null
): string {
  if (requestedPath) {
    return normalizePath(requestedPath)
  }

  return hasCompletedOnboarding(user) ? routes.dashboard() : routes.onboarding.scan()
}
