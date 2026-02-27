"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signUp(email: string, password: string, firstName: string, lastName: string, country: string) {
  const supabase = await createClient()

  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          country,
        },
      },
    })

    if (signUpError) {
      return { error: signUpError.message }
    }

    if (!authData.user) {
      return { error: "Failed to create user account" }
    }

    // Create user profile
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        country,
        user_type: "user",
        status: "active",
      },
    ])

    if (profileError) {
      return { error: `Profile creation failed: ${profileError.message}` }
    }

    return { success: true, message: "Account created! Please check your email to verify." }
  } catch (error) {
    return { error: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    if (!data.user) {
      return { error: "Sign in failed" }
    }

    return { success: true }
  } catch (error) {
    return { error: `Sign in failed: ${error instanceof Error ? error.message : "Unknown error"}` }
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/")
}
