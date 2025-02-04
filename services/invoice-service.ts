import { Invoice } from "@/types/invoice"

// In a real application, this would be replaced with actual database calls
class InvoiceService {
  private static instance: InvoiceService
  private invoices: Invoice[] = []

  private constructor() {}

  public static getInstance(): InvoiceService {
    if (!InvoiceService.instance) {
      InvoiceService.instance = new InvoiceService()
    }
    return InvoiceService.instance
  }

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>): Promise<Invoice> {
    const newInvoice: Invoice = {
      ...invoice,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    this.invoices.push(newInvoice)
    
    // In a real application, save to database here
    return newInvoice
  }

  async getInvoices(): Promise<Invoice[]> {
    // In a real application, fetch from database
    return this.invoices
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    const invoice = this.invoices.find(inv => inv.id === id)
    return invoice || null
  }

  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
    const index = this.invoices.findIndex(inv => inv.id === id)
    if (index === -1) return null

    const updatedInvoice = {
      ...this.invoices[index],
      ...updates,
      updatedAt: new Date()
    }

    this.invoices[index] = updatedInvoice
    return updatedInvoice
  }

  async deleteInvoice(id: string): Promise<boolean> {
    const index = this.invoices.findIndex(inv => inv.id === id)
    if (index === -1) return false

    this.invoices.splice(index, 1)
    return true
  }

  async exportInvoice(id: string): Promise<string> {
    const invoice = await this.getInvoiceById(id)
    if (!invoice) throw new Error('Invoice not found')

    // In a real application, generate PDF here
    return JSON.stringify(invoice, null, 2)
  }
}
