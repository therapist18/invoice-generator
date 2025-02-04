export interface InvoiceItem {
  quantity: number
  description: string
  price: number
}

export interface CompanyDetails {
  name: string
  phone: string
  email: string
  address: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  date: Date
  dueDate?: Date
  clientName: string
  clientEmail?: string
  clientAddress?: string
  companyDetails: CompanyDetails
  items: InvoiceItem[]
  notes?: string
  terms?: string
  status: 'draft' | 'pending' | 'paid' | 'overdue'
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}
