import { NextResponse } from 'next/server'

// Mock data for now - replace with your actual database calls
const sales = [
  {
    id: '1',
    date: new Date().toISOString(),
    amount: 5000,
    description: 'Product Sale',
    client: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    }
  },
  {
    id: '2',
    date: new Date().toISOString(),
    amount: 7500,
    description: 'Service Contract',
    client: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    }
  }
]

export async function GET() {
  try {
    // Replace with your actual database query
    return NextResponse.json(sales)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sales' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Replace with your actual database insert
    const newSale = {
      id: Math.random().toString(),
      ...data,
      client: {
        id: data.clientId,
        name: 'Client Name', // Replace with actual client lookup
        email: 'client@example.com'
      }
    }
    sales.push(newSale)
    return NextResponse.json(newSale)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
  }
}
