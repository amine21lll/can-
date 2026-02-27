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
      .from("tickets")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error fetching user tickets:", error)
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
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
    const { matchId, category, quantity, seats } = body

    if (!matchId || !category || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get match details for pricing
    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select("*")
      .eq("id", matchId)
      .single()

    if (matchError || !match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 })
    }

    // Calculate price based on category
    let pricePerTicket = 0
    switch (category) {
      case "VIP":
        pricePerTicket = 150
        break
      case "Premium":
        pricePerTicket = 100
        break
      case "Standard":
        pricePerTicket = 60
        break
      case "Economy":
        pricePerTicket = 30
        break
      default:
        return NextResponse.json(
          { error: "Invalid ticket category" },
          { status: 400 }
        )
    }

    const totalPrice = pricePerTicket * quantity

    // Create ticket booking (without payment initially)
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          user_id: user.id,
          match_id: matchId,
          category,
          quantity,
          seats: seats || null,
          price_per_ticket: pricePerTicket,
          total_price: totalPrice,
          status: "pending",
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch (error) {
    console.error("Error creating ticket booking:", error)
    return NextResponse.json(
      { error: "Failed to create ticket booking" },
      { status: 500 }
    )
  }
}
