/**
 * API config: local = moydu-app.test, production = api.moyduz.com
 * Cross-tenant: Laravel backend validates token per tenant domain
 */
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "./laravel-api"

export const api = {
  baseUrl: LARAVEL_API_URL,

  getToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token")
  },

  async fetch<T>(
    path: string,
    options: RequestInit & { data?: Record<string, unknown> } = {}
  ): Promise<T> {
    const { data, ...init } = options
    const url = `${this.baseUrl}${path}`
    const headers: Record<string, string> = {
      ...LARAVEL_API_HEADERS,
      ...(init.headers as Record<string, string>),
    }
    const token = this.getToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
    const res = await fetch(url, {
      ...init,
      headers,
      ...(data && { body: JSON.stringify(data) }),
      credentials: "include",
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(
        json.message || (json.errors ? JSON.stringify(json.errors) : res.statusText)
      )
    }
    return json as T
  },

  /** Authenticated request - requires token */
  async authFetch<T>(path: string, options?: RequestInit): Promise<T> {
    const token = this.getToken()
    if (!token) {
      throw new Error("Not authenticated")
    }
    return this.fetch<T>(path, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    })
  },

  /** Get current user - use our proxy to avoid CORS */
  async getCurrentUser() {
    const token = this.getToken()
    if (!token) return null
    const res = await fetch("/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
  },

  login(email: string, password: string) {
    return this.fetch<{ user?: unknown; token?: string; access_token?: string }>("/api/auth/login", {
      method: "POST",
      data: { email, password },
    })
  },

  register(data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) {
    return this.fetch<{ user?: unknown; token?: string; access_token?: string }>("/api/auth/register", {
      method: "POST",
      data,
    })
  },
}
