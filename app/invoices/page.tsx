'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditableInvoice from '../components/invoice/EditableInvoice'
import { Button } from '@/components/ui/button'
import { Plus, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import InvoicePreview from './InvoicePreview'
import { cn } from '@/lib/utils'

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('all-invoices')
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null)

  // Sample invoice data
  const invoices = [
    {
      invoiceNumber: '158',
      date: new Date(),
      clientName: 'The Grand Mtwapa Hospital',
      status: 'completed',
      amount: 12500,
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'destinyuniforms03@gmail.com',
        address: 'Mombasa, Kenya'
      },
      items: [
        { quantity: 2, description: 'Scrubs', price: 2500 },
      ]
    },
    {
      invoiceNumber: '159',
      date: new Date(),
      clientName: 'Coast General Hospital',
      status: 'pending',
      amount: 16500,
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'destinyuniforms03@gmail.com',
        address: 'Mombasa, Kenya'
      },
      items: [
        { quantity: 3, description: 'Lab Coats', price: 3000 },
        { quantity: 5, description: 'Surgical Caps', price: 500 },
      ]
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <Button onClick={() => setActiveTab('create-invoice')} size="sm" className="bg-pink-600 text-white hover:bg-pink-700">
          <Plus className="h-4 w-4 mr-2" /> Create Invoice
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-transparent border-b p-0 h-auto space-x-6">
          <TabsTrigger 
            value="all-invoices" 
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-pink-600 rounded-none h-9"
          >
            All Invoices
          </TabsTrigger>
          <TabsTrigger 
            value="create-invoice"
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-pink-600 rounded-none h-9"
          >
            Create Invoice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-invoices" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+12%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">112</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+8%</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES 2,345,678</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-500">+15%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice, index) => (
                  <div key={invoice.invoiceNumber} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">Invoice #{invoice.invoiceNumber}</p>
                        <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
                      </div>
                      <div className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        invoice.status === 'completed' ? "bg-emerald-50 text-emerald-700" : "bg-yellow-50 text-yellow-700"
                      )}>
                        {invoice.status === 'completed' ? 'Completed' : 'Pending'}
                      </div>
                      <div className="text-sm font-medium">
                        {invoice.status === 'completed' ? (
                          <span className="text-emerald-600">+KES {invoice.amount.toLocaleString()}</span>
                        ) : (
                          <span className="text-yellow-600">KES {invoice.amount.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedInvoice(index)
                        setActiveTab('view')
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-invoice">
          <EditableInvoice />
        </TabsContent>

        {selectedInvoice !== null && (
          <TabsContent value="view">
            <InvoicePreview invoiceData={invoices[selectedInvoice]} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
