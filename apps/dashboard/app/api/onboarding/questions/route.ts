import { NextRequest, NextResponse } from "next/server"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

const DEFAULT_TENANT = process.env.NEXT_PUBLIC_TENANT || "moyduz"

export async function GET(request: NextRequest) {
  try {
    const tenant =
      request.headers.get("x-tenant") ||
      request.headers.get("X-Tenant") ||
      request.nextUrl.searchParams.get("tenant") ||
      DEFAULT_TENANT

    const search = request.nextUrl.searchParams.toString()
    const query = search ? `?${search}` : ""

    const res = await fetch(`${LARAVEL_API_URL}/api/onboarding/questions${query}`, {
      headers: {
        ...LARAVEL_API_HEADERS,
        "X-Tenant": tenant,
      },
      cache: "no-store",
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch onboarding questions",
      },
      { status: 500 }
    )
  }
}
