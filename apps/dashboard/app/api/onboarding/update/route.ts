import { NextResponse } from "next/server"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")
    const tenant =
      body.tenant ??
      request.headers.get("x-tenant") ??
      LARAVEL_API_HEADERS["X-Tenant"]
    const { tenant: _t, ...bodyWithoutTenant } = body

    const res = await fetch(`${LARAVEL_API_URL}/api/onboarding/update`, {
      method: "POST",
      headers: {
        ...LARAVEL_API_HEADERS,
        "X-Tenant": tenant,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(bodyWithoutTenant),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Update failed" },
      { status: 500 }
    )
  }
}
