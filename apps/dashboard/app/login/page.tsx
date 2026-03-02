"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react"
import GoogleButton from "@/components/google-button"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { api } from "@/lib/api"
import { getAuthDestination } from "@/lib/auth-redirects"
import { routes } from "@/lib/routes"
import AppLogoIcon from "@/components/app-logo-icon"
import { useAuth } from "@/hooks/use-auth"

interface LoginProps {
  status?: string
  canResetPassword?: boolean
  canRegister?: boolean
  lastLoginProvider?: string | null
}

// function BrandMark() {
//   return (
//     <svg
//       width="502"
//       height="502"
//       viewBox="0 0 502 502"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       className="size-8"
//       aria-hidden="true"
//     >
//       <path
//         d="M501.413 185.636V30.2677C501.413 13.5952 487.887 0.305481 471.463 0.305481H316.167C291.774 0.305481 267.622 5.13791 245.161 14.3199C222.699 23.7435 202.17 37.2749 185.023 54.6723L183.815 55.8805C161.112 78.8354 144.93 107.348 136.719 138.76C151.451 134.893 166.666 132.96 181.882 132.719C222.457 132.236 262.308 145.284 294.672 169.688C323.896 191.435 346.115 221.397 358.191 255.95C370.75 290.987 372.199 329.165 362.78 365.167C393.936 356.952 422.677 340.763 445.621 318.05L446.829 316.841C463.977 299.686 477.743 279.147 487.162 256.675C496.581 234.204 501.171 210.041 501.171 185.636H501.413Z"
//         fill="#18E299"
//       />
//       <path
//         d="M132.082 183.012C132.323 135.349 151.331 89.6123 184.775 55.4301L55.5676 184.697C55.0864 185.178 54.6049 185.419 54.1237 185.9C22.6039 217.194 3.59626 259.079 0.468338 303.372C-2.41897 344.776 8.40821 385.698 31.5067 419.88C33.7099 423.141 39.6881 424.213 43.0566 421.084L122.217 342.128C147 317.333 154.699 280.503 142.909 247.525C135.451 227.063 131.841 205.158 132.082 183.012Z"
//         fill="#0C8C5E"
//       />
//       <path
//         d="M446.078 316.852C421.295 341.165 390.256 358.015 356.571 365.478C322.645 372.94 287.516 370.774 254.793 359.219C254.793 359.219 254.552 359.219 254.312 359.219C221.348 347.424 184.536 355.127 159.753 379.68L80.5915 458.637C77.223 462.007 77.7042 467.543 81.7946 470.191C115.961 493.059 156.866 504.133 198.25 501.244C242.522 498.115 284.147 479.098 315.667 447.563L316.87 446.36L446.078 317.093V316.852Z"
//         fill="#0C8C5E"
//       />
//     </svg>
  
//   )
// }

function safeRedirectPath(path: string | null): string | null {
  if (!path || typeof path !== "string") return null
  const p = path.startsWith("/") ? path : `/${path}`
  if (!p.startsWith("/")) return null
  try {
    new URL(p, "http://localhost")
    return p
  } catch {
    return null
  }
}

export default function LoginPage({
  status: statusProp,
  canResetPassword = true,
  canRegister = true,
  lastLoginProvider,
}: LoginProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const redirectParam = searchParams.get("redirect")
  const redirectTo = safeRedirectPath(redirectParam) ?? "/dashboard"

  const status = statusProp ?? searchParams.get("status")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [processing, setProcessing] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (user) {
      router.replace(getAuthDestination(user, redirectTo))
    }
  }, [authLoading, user, router, redirectTo])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setProcessing(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        const msg = data.message || (data.errors ? Object.values(data.errors).flat().join(", ") : "Giriş başarısız. Lütfen tekrar deneyin.")
        const emailErr = data.errors?.email?.[0]
        const passwordErr = data.errors?.password?.[0]
        setErrors(
          emailErr || passwordErr
            ? { email: emailErr, password: passwordErr }
            : { email: msg }
        )
        return
      }

      if (data.token || data.access_token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token || data.access_token)
        }
      }
      const nextUser = data.user ?? (await api.getCurrentUser())

      router.push(getAuthDestination(nextUser, redirectTo))
    } catch {
      setErrors({ email: "Bağlantı hatası. Lütfen tekrar deneyin." })
    } finally {
      setProcessing(false)
    }
  }

  const isDisabled = processing || !email || !password

  if (authLoading) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Kontrol ediliyor...</p>
        </div>
      </main>
    )
  }

  if (user) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Yönlendiriliyorsunuz...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-white dark:bg-zinc-950">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-12 p-5 pb-24">
        <div className="flex justify-start text-left">
          <AppLogoIcon />
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-medium leading-8 text-foreground">
            Moyduz&apos;a Giriş Yap
          </h1>
          {canRegister ? (
            <div className="flex gap-1">
              <p className="text-sm tracking-tight text-muted-foreground">
                Hesabın yok mu?
              </p>
              <Link
                href={routes.register()}
                className="inline-flex items-center gap-1 text-sm text-orange-600 outline-none hover:text-orange-600/70 focus-visible:ring-2 focus-visible:ring-orange-500/20"
              >
                Başla <ArrowRight className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          {status && (
            <div className="text-center text-sm font-medium text-emerald-600">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium leading-5 tracking-tight">
                E-posta adresin
              </Label>
              <div className="relative rounded-[10px] bg-white hover:bg-zinc-950/5 dark:bg-zinc-950 dark:hover:bg-white/5">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  disabled={processing}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 rounded-[10px] border border-zinc-950/10 bg-transparent px-3 py-2 pl-9 text-sm leading-5 text-foreground placeholder:text-muted-foreground/60 focus:border-zinc-950 dark:border-white/10 dark:focus:border-white/60"
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium leading-5 tracking-tight">
                Şifre
              </Label>
              <div className="relative rounded-[10px] bg-white hover:bg-zinc-950/5 dark:bg-zinc-950 dark:hover:bg-white/5">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Şifreni gir"
                  autoComplete="current-password"
                  required
                  disabled={processing}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-[10px] border border-zinc-950/10 bg-transparent px-3 py-2 pl-9 pr-9 text-sm leading-5 text-foreground placeholder:text-muted-foreground/60 focus:border-zinc-950 dark:border-white/10 dark:focus:border-white/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground"
                  aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            {canResetPassword && (
              <div className="flex justify-end">
                <Link
                  href={routes.forgotPassword()}
                  className="text-sm text-muted-foreground underline underline-offset-2 hover:text-foreground/70"
                >
                  Şifremi unuttum
                </Link>
              </div>
            )}

            <Button
              type="submit"
              className="h-10 w-full border border-zinc-950/10 rounded-xl bg-foreground text-background hover:bg-foreground/90 disabled:bg-[#d6d3d1] disabled:text-background/80"
              disabled={isDisabled}
              data-test="login-button"
            >
              {processing ? "Devam ediliyor..." : "Devam Et"}
              {processing && <Loader2 className="ml-2 size-4 animate-spin" />}
            </Button>
          </form>

          <div className="inline-flex h-3 items-center justify-center gap-2.5">
            <div className="h-px grow bg-zinc-950/10 dark:bg-white/10" />
            <div className="text-center text-[11px] text-muted-foreground">OR</div>
            <div className="h-px grow bg-zinc-950/10 dark:bg-white/10" />
          </div>

          <GoogleButton redirectTo={redirectTo} mode="signin" disabled={processing}>
            Google ile devam et
          </GoogleButton>

          {lastLoginProvider && (
            <p className="text-center text-[11px] text-muted-foreground">
              Son giriş:{" "}
              <span className="font-medium text-foreground/80">
                {lastLoginProvider === "google"
                  ? "Google"
                  : lastLoginProvider === "password"
                    ? "E-posta & Şifre"
                    : lastLoginProvider}
              </span>
            </p>
          )}

          <div className="text-sm text-muted-foreground underline-offset-[3px]">
            Giriş yaparak{" "}
            <Link
              href="https://moydus.com/terms-of-service"
              className="underline hover:text-muted-foreground/70"
              target="_blank"
            >
              Kullanım Koşulları
            </Link>{" "}
            ve{" "}
            <Link
              href="https://moydus.com/privacy-policy"
              className="underline hover:text-muted-foreground/70"
              target="_blank"
            >
              Gizlilik Politikası
            </Link>
            &apos;nı kabul etmiş olursunuz.
          </div>
        </div>
      </div>
    </main>
  )
}
