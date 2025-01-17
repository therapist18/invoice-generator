import { NextResponse } from 'next/server'

// Mock data for now - replace with your actual database calls
const expenses = [
  {
    id: '1',
    date: new Date().toISOString(),
    amount: 1000,
    description: 'Office Supplies',
    category: 'Supplies',
    status: 'PENDING'
  },
  {
    id: '2',
    date: new Date().toISOString(),
    amount: 2000,
    description: 'Rent',
    category: 'Rent',
    status: 'APPROVED'
  }
]

export async function GET() {
  try {
    // Replace with your actual database query
    return NextResponse.json(expenses)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Replace with your actual database insert
    const newExpense = {
      id: Math.random().toString(),
      ...data,
      status: 'PENDING'
    }
    expenses.push(newExpense)
    return NextResponse.json(newExpense)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 })
  }
}
