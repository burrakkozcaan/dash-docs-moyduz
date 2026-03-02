import { NextRequest, NextResponse } from "next/server"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

const DEFAULT_TENANT = process.env.NEXT_PUBLIC_TENANT || "moyduz"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const tenant =
      request.headers.get("x-tenant") ||
      request.headers.get("X-Tenant") ||
      DEFAULT_TENANT

    const res = await fetch(`${LARAVEL_API_URL}/api/auth/verification/send`, {
      method: "POST",
      headers: {
        ...LARAVEL_API_HEADERS,
        Authorization: authHeader,
        "X-Tenant": tenant,
      },
      cache: "no-store",
      credentials: "include",
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }

    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to resend verification email",
      },
      { status: 500 }
    )
  }
}
