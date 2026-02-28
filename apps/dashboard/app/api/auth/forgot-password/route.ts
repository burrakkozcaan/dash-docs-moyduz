import { NextResponse } from "next/server"
import { protectAuth } from "@/lib/arcjet"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

export async function POST(request: Request) {
  const blocked = await protectAuth(request)
  if (blocked) return blocked

  try {
    const body = await request.json()
    const res = await fetch(`${LARAVEL_API_URL}/api/forgot-password`, {
      method: "POST",
      headers: LARAVEL_API_HEADERS,
      body: JSON.stringify({ email: body.email }),
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "İstek işlenemedi. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}
