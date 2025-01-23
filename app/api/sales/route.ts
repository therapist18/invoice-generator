import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
    const { data: sales, error } = await supabase
      .from('sales')
      .select(`
        *,
        client:clients(id, name, email)
      `)
      .order('date', { ascending: false })

    if (error) throw error
    return NextResponse.json(sales)
  } catch (error) {
    console.error('Error fetching sales:', error)
    return NextResponse.json({ error: 'Failed to fetch sales' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    // Get the latest invoice number
    const { data: latestInvoice } = await supabase
      .from('invoices')
      .select('number')
      .order('created_at', { ascending: false })
      .limit(1)
    
    // Generate new invoice number
    const lastNumber = latestInvoice?.[0]?.number || 'INV-0000'
    const numericPart = parseInt(lastNumber.split('-')[1])
    const newInvoiceNumber = `INV-${String(numericPart + 1).padStart(4, '0')}`
    
    // Create new invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert({
        number: newInvoiceNumber,
        client_id: data.clientId,
        total_amount: data.amount,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      })
      .select()
      .single()
    
    if (invoiceError) throw invoiceError

    // Create new sale
    const { data: sale, error: saleError } = await supabase
      .from('sales')
      .insert({
        ...data,
        invoice_id: invoice.id
      })
      .select(`
        *,
        client:clients(id, name, email)
      `)
      .single()

    if (saleError) throw saleError
    return NextResponse.json(sale)
  } catch (error) {
    console.error('Error creating sale:', error)
    return NextResponse.json({ error: 'Failed to create sale' }, { status: 500 })
  }
}
