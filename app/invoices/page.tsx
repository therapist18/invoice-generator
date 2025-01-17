'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditableInvoice from '../components/invoice/EditableInvoice'
import { Button } from '@/components/ui/button'
import { Plus, Eye } from 'lucide-react'
import InvoicePreview from './InvoicePreview'

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null)

  // Sample invoice data
  const invoices = [
    {
      invoiceNumber: '158',
      date: new Date(),
      clientName: 'The Grand Mtwapa Hospital',
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'info@destinyuniforms.com',
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
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'info@destinyuniforms.com',
        address: 'Mombasa, Kenya'
      },
      items: [
        { quantity: 3, description: 'Lab Coats', price: 3000 },
        { quantity: 5, description: 'Surgical Caps', price: 500 },
      ]
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
        <Button className="flex items-center gap-2" onClick={() => {
          setActiveTab('create')
          setSelectedInvoice(null)
        }}>
          <Plus className="h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Invoices</TabsTrigger>
          <TabsTrigger value="create">Create Invoice</TabsTrigger>
          {selectedInvoice !== null && <TabsTrigger value="view">View Invoice</TabsTrigger>}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{invoices.length}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Paid Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">112</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KES 2,345,678</div>
                <p className="text-xs text-muted-foreground">
                  +15% from last month
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
                  <div key={invoice.invoiceNumber} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div>
                      <p className="font-medium">Invoice #{invoice.invoiceNumber}</p>
                      <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedInvoice(index)
                      setActiveTab('view')
                    }}>
                      <Eye className="h-4 w-4 mr-2" /> View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
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
