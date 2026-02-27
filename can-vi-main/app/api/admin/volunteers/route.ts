import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { protectAdminRoute } from "@/lib/admin-protection"

export async function GET(request: NextRequest) {
  try {
    await protectAdminRoute()
    const supabase = await createClient()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching volunteers:", error)
    return NextResponse.json(
      { error: "Failed to fetch volunteers" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await protectAdminRoute()
    const supabase = await createClient()
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("volunteers")
      .update({ status })
      .eq("id", id)
      .select()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error updating volunteer:", error)
    return NextResponse.json(
      { error: "Failed to update volunteer" },
      { status: 500 }
    )
  }
}
