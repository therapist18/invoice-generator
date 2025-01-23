import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return NextResponse.json(expenses)
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    const { data: expense, error } = await supabase
      .from('expenses')
      .insert({
        ...data,
        status: 'PENDING',
        date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(expense)
  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json()
    
    const { data: expense, error } = await supabase
      .from('expenses')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(expense)
  } catch (error) {
    console.error('Error updating expense:', error)
    return NextResponse.json({ error: 'Failed to update expense' }, { status: 500 })
  }
}
