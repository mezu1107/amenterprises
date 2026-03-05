"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User, Company } from "./types"
import usersData from "@/mock-data/users.json"
import companiesData from "@/mock-data/companies.json"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  supabaseUser: SupabaseUser | null
  company: Company
  companies: Company[]
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => Promise<void>
  switchCompany: (companyId: number) => void
  setCompany: (company: Company) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [selectedCompanyId, setSelectedCompanyId] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const allCompanies = companiesData as Company[]

  useEffect(() => {
    const supabase = createClient()
    
    // Check for existing Supabase session
    const checkSession = async () => {
      const { data: { user: sbUser } } = await supabase.auth.getUser()
      if (sbUser) {
        setSupabaseUser(sbUser)
        // Try to find a matching mock user or create a default one
        const mockUser = (usersData as User[]).find(u => u.email === sbUser.email)
        if (mockUser) {
          setUser(mockUser)
          setSelectedCompanyId(mockUser.companyId)
        } else {
          // Create a default user for new Supabase signups
          const defaultUser: User = {
            id: 999,
            email: sbUser.email || "",
            name: sbUser.user_metadata?.full_name || sbUser.email?.split("@")[0] || "User",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Admin",
            companyId: 1,
            password: "",
            status: "active",
            lastLogin: new Date().toISOString(),
          }
          setUser(defaultUser)
          setSelectedCompanyId(1)
        }
      } else {
        // Check for mock auth
        const stored = typeof window !== "undefined" ? localStorage.getItem("am_user") : null
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as User
            setUser(parsed)
            setSelectedCompanyId(parsed.companyId)
          } catch {
            // ignore
          }
        }
      }
      setIsLoading(false)
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setSupabaseUser(session.user)
        const mockUser = (usersData as User[]).find(u => u.email === session.user.email)
        if (mockUser) {
          setUser(mockUser)
          setSelectedCompanyId(mockUser.companyId)
        } else {
          const defaultUser: User = {
            id: 999,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "User",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Admin",
            companyId: 1,
            password: "",
            status: "active",
            lastLogin: new Date().toISOString(),
          }
          setUser(defaultUser)
        }
      } else if (event === "SIGNED_OUT") {
        setSupabaseUser(null)
        setUser(null)
        localStorage.removeItem("am_user")
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Mock login for demo accounts
  const login = useCallback((email: string, password: string): boolean => {
    const found = (usersData as User[]).find(
      (u) => u.email === email && u.password === password
    )
    if (found) {
      setUser(found)
      setSelectedCompanyId(found.companyId)
      localStorage.setItem("am_user", JSON.stringify(found))
      return true
    }
    return false
  }, [])

  const logout = useCallback(async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setSupabaseUser(null)
    localStorage.removeItem("am_user")
  }, [])

  const switchCompany = useCallback((companyId: number) => {
    setSelectedCompanyId(companyId)
  }, [])

  const setCompany = useCallback((company: Company) => {
    setSelectedCompanyId(company.id)
  }, [])

  const company = allCompanies.find((c) => c.id === selectedCompanyId) ?? allCompanies[0]

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        company,
        companies: allCompanies,
        isAuthenticated: !!user || !!supabaseUser,
        login,
        logout,
        switchCompany,
        setCompany,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
