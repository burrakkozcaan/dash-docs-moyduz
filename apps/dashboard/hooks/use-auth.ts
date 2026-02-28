"use client"

import { useCallback, useEffect, useState } from "react"
import { api } from "@/lib/api"

export function useAuth() {
  const [user, setUser] = useState<unknown | null>(null)
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    const u = await api.getCurrentUser()
    setUser(u)
    return u
  }, [])

  useEffect(() => {
    refetch().finally(() => setLoading(false))
  }, [refetch])

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      setUser(null)
    }
  }, [])

  return { user, loading, refetch, logout, isAuthenticated: !!api.getToken() }
}
