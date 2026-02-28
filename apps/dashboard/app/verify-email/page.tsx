"use client"

import { useState } from "react"
import Link from "next/link"
import AuthLayout from "@/components/auth-layout"
import { Button } from "@repo/ui/components/ui/button"
import AppLogoIcon from "@/components/app-logo-icon"

export default function VerifyEmailPage() {
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    try {
      const res = await fetch("/api/auth/verification/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (res.ok) {
        setStatus("Yeni bir doğrulama bağlantısı e-postana gönderildi.")
      }
    } finally {
      setProcessing(false)
    }
  }

  return (
    <AuthLayout
      title="E-postanı doğrula"
      description="Sana gönderdiğimiz bağlantıya tıklayarak e-posta adresini doğrula."
    >
      <div className="flex justify-start text-left">
        <AppLogoIcon />
      </div>
      {status && (
        <p className="mb-4 text-center text-sm font-medium text-green-600">{status}</p>
      )}

      <form onSubmit={handleResend} className="space-y-6 text-center">
        <Button type="submit" variant="secondary" disabled={processing}>
          {processing ? "Gönderiliyor..." : "Doğrulama e-postasını yeniden gönder"}
        </Button>

        <Link href="/api/auth/logout" className="block text-sm underline">
          Çıkış yap
        </Link>
      </form>
    </AuthLayout>
  )
}
