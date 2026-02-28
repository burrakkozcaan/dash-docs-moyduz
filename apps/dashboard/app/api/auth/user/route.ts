import { NextResponse } from "next/server"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const res = await fetch(`${LARAVEL_API_URL}/api/auth/user`, {
      method: "GET",
      headers: {
        ...LARAVEL_API_HEADERS,
        Authorization: authHeader,
      },
      cache: "no-store",
    })
    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to fetch user" },
      { status: 500 }
    )
  }
}
