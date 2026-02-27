import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const stage = searchParams.get("stage")

    let query = supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true })

    if (status) {
      query = query.eq("status", status)
    }

    if (stage) {
      query = query.eq("stage", stage)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching matches:", error)
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    )
  }
}
