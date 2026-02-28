export const routes = {
  login: () => "/login",
  /** Use when redirecting to login so user returns to this path after signing in */
  loginWithRedirect: (redirectPath: string) =>
    `/login?redirect=${encodeURIComponent(redirectPath.startsWith("/") ? redirectPath : `/${redirectPath}`)}`,
  register: () => "/signup",
  forgotPassword: () => "/forgot-password",
  verifyEmail: () => "/verify-email",
  dashboard: () => "/dashboard",
  onboarding: {
    scan: () => "/onboarding/scan",
    brief: () => "/onboarding/brief",
    package: () => "/onboarding/select-package",
    addons: (packageKey: string) =>
      `/onboarding/select-addons?package=${encodeURIComponent(packageKey)}`,
    form: (params?: { package?: string; addons?: string[]; step?: string }) => {
      const p = new URLSearchParams()
      if (params?.package) p.set("package", params.package)
      if (params?.addons?.length) params.addons.forEach((a) => p.append("addons[]", a))
      if (params?.step) p.set("step", params.step)
      return `/onboarding/form?${p.toString()}`
    },
    summary: () => "/onboarding/summary",
  },
}
