'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useUserStore } from '@/stores/userStore'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function useAuth() {
  const { user, setUser, clearUser } = useUserStore()
  const [loading, setLoading] = useState(true)
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseUser(session?.user ?? null)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          created_at: session.user.created_at,
          updated_at: session.user.updated_at || session.user.created_at,
        })
      }
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSupabaseUser(session?.user ?? null)
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            created_at: session.user.created_at,
            updated_at: session.user.updated_at || session.user.created_at,
          })
        } else {
          clearUser()
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [setUser, clearUser])

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
  }

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    clearUser()
  }

  return {
    user,
    supabaseUser,
    loading,
    signInWithEmail,
    signInWithGoogle,
    signUp,
    signOut,
  }
}
