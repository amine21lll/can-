import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getUser } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("created_at", { ascending: false })

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

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      nationality,
      city,
      mission,
      availability,
      message,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !mission || !availability) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("volunteers")
      .insert([
        {
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          birth_date: birthDate,
          nationality,
          city,
          mission,
          availability,
          message,
          status: "pending",
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error("Error creating volunteer:", error)
    return NextResponse.json(
      { error: "Failed to create volunteer registration" },
      { status: 500 }
    )
  }
}
