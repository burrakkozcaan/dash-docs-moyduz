import { NextResponse } from "next/server"
import { protectAuth } from "@/lib/arcjet"
import { LARAVEL_API_URL, LARAVEL_API_HEADERS } from "@/lib/laravel-api"

export async function POST(request: Request) {
  const blocked = await protectAuth(request)
  if (blocked) return blocked

  try {
    const body = await request.json()
    const res = await fetch(`${LARAVEL_API_URL}/api/auth/register`, {
      method: "POST",
      headers: LARAVEL_API_HEADERS,
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        password: body.password,
        password_confirmation: body.password_confirmation || body.password,
        device_name: body.device_name ?? "dashboard",
      }),
      credentials: "include",
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Kayıt başarısız. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}
