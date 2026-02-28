import { NextRequest, NextResponse } from "next/server"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

const DEFAULT_TENANT = process.env.NEXT_PUBLIC_TENANT || "moyduz"

export async function GET(request: NextRequest) {
  try {
    const tenant =
      request.headers.get("x-tenant") ||
      request.nextUrl.searchParams.get("tenant") ||
      DEFAULT_TENANT

    const res = await fetch(`${LARAVEL_API_URL}/api/onboarding/plans`, {
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
      { message: error instanceof Error ? error.message : "Failed to fetch plans" },
      { status: 500 }
    )
  }
}
