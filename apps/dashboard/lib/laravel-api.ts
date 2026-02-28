/**
 * Laravel API config
 * Local: https://moydu-app.test
 * Production: https://api.moyduz.com
 * Tenant defaults to moyduz; can be overridden per request via X-Tenant header.
 */
export const LARAVEL_API_URL =
  process.env.NEXT_PUBLIC_LARAVEL_API_URL || "https://moydu-app.test"

export const DEFAULT_TENANT =
  process.env.NEXT_PUBLIC_TENANT || "moyduz"

export const LARAVEL_API_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Tenant": DEFAULT_TENANT,
} as const
