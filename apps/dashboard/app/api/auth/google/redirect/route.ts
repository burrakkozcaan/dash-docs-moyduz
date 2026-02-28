import { NextRequest, NextResponse } from "next/server"
import { LARAVEL_API_URL } from "@/lib/laravel-api"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const redirectTo = searchParams.get("redirect_to") || "/dashboard"
  const mode = searchParams.get("mode") || "signin"

  const url = `${LARAVEL_API_URL}/auth/google/redirect?redirect_to=${encodeURIComponent(redirectTo)}&mode=${mode}`
  return NextResponse.json({ url })
}
