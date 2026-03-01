"use client"

import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AppLogoIcon from "@/components/app-logo-icon"

interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function AuthLayout({
  children,
  title = "Getting Started with Moy",
  description = "Enter your email and we'll send you a secure sign-up link to get started",
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-full w-full items-center justify-center bg-white p-4 md:p-10 dark:bg-zinc-950">
      <div className="w-full max-w-sm">
        <Card className="border-none bg-white shadow-none dark:bg-zinc-950">
          <div className="mb-4 flex justify-center">
            <Link href="/">
              <AppLogoIcon size={40} />
            </Link>
          </div>

          <CardHeader>
            <CardTitle className="text-black dark:text-white">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>
          {children}
        </Card>
      </div>
    </div>
  )
}
