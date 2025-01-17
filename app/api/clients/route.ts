import { NextResponse } from 'next/server'

// Mock data for now - replace with your actual database calls
const clients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: '123 Main St'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '098-765-4321',
    address: '456 Oak Ave'
  }
]

export async function GET() {
  try {
    // Replace with your actual database query
    return NextResponse.json(clients)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    // Replace with your actual database insert
    const newClient = {
      id: Math.random().toString(),
      ...data
    }
    clients.push(newClient)
    return NextResponse.json(newClient)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 })
  }
}
