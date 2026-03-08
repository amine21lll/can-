import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from '@/lib/supabase/server';
import { createSupabaseClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        match:matches(id, date, home_team, away_team, stadium),
        tickets(*)
      `)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[v0] Orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { matchId, ticketCount, totalAmount, stripePaymentIntentId } = body;

    if (!matchId || !ticketCount || !totalAmount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: session.user.id,
        match_id: matchId,
        ticket_count: ticketCount,
        total_amount: totalAmount,
        stripe_payment_intent_id: stripePaymentIntentId || null,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('[v0] Order creation error:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('[v0] Orders API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
