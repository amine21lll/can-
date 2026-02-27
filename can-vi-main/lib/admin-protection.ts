import { getUser, getUserProfile } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function protectAdminRoute() {
  const user = await getUser()
  
  if (!user) {
    redirect("/login")
  }

  const profile = await getUserProfile()
  
  if (!profile || profile.user_type !== "admin") {
    redirect("/")
  }

  return { user, profile }
}

export async function requireAuth() {
  const user = await getUser()
  
  if (!user) {
    redirect("/login")
  }

  return user
}
