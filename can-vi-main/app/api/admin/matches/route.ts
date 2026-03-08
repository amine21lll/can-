import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { protectAdminRoute } from "@/lib/admin-protection"

export async function GET(request: NextRequest) {
  try {
    await protectAdminRoute()
    const supabase = await createClient()

    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("match_date", { ascending: true })

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

export async function POST(request: NextRequest) {
  try {
    await protectAdminRoute()
    const supabase = await createClient()
    const body = await request.json()

    const {
      homeTeam,
      awayTeam,
      matchDate,
      stadium,
      stage,
      group,
      status,
    } = body

    if (!homeTeam || !awayTeam || !matchDate || !stage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("matches")
      .insert([
        {
          home_team: homeTeam,
          away_team: awayTeam,
          match_date: matchDate,
          stadium,
          stage,
          group,
          status: status || "scheduled",
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error("Error creating match:", error)
    return NextResponse.json(
      { error: "Failed to create match" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await protectAdminRoute()
    const supabase = await createClient()
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: "Match ID is required" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("matches")
      .update(updates)
      .eq("id", id)
      .select()

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error updating match:", error)
    return NextResponse.json(
      { error: "Failed to update match" },
      { status: 500 }
    )
  }
}
