'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EditableInvoice from './EditableInvoice'
import { Button } from '@/components/ui/button'
import { Plus, Eye, ArrowUpRight, FileText } from 'lucide-react'
import InvoicePreview from './PriceListPreview'
import { cn } from '@/lib/utils'

export default function PriceListPage() {
  const [activeTab, setActiveTab] = useState('all-lists')
  const [selectedList, setSelectedList] = useState<number | null>(null)

  // Sample price list data
  const priceLists = [
    {
      listNumber: 'PL-001',
      date: new Date(),
      clientName: 'The Grand Mtwapa Hospital',
      status: 'active',
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'destinyuniforms03@gmail.com',
        address: 'Mombasa, Kenya'
      },
      items: [
        { quantity: 'Each', description: 'Scrubs', price: 2500 },
      ]
    },
    {
      listNumber: 'PL-002',
      date: new Date(),
      clientName: 'Coast General Hospital',
      status: 'draft',
      companyDetails: {
        name: 'Destiny Uniform Plus',
        phone: '0722 320830 / 0785 320830',
        email: 'destinyuniforms03@gmail.com',
        address: 'Mombasa, Kenya'
      },
      items: [
        { quantity: 'Each', description: 'Lab Coats', price: 3500 },
        { quantity: 'Dozen', description: 'Surgical Caps', price: 5000 },
      ]
    }
  ]

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Price Lists</h1>
        <Button onClick={() => setActiveTab('create-list')} size="sm" className="bg-pink-600 text-white hover:bg-pink-700">
          <Plus className="h-4 w-4 mr-2" /> New Price List
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-transparent border-b p-0 h-auto space-x-6">
          <TabsTrigger 
            value="all-lists" 
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-pink-600 rounded-none h-9"
          >
            All Price Lists
          </TabsTrigger>
          <TabsTrigger 
            value="create-list"
            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-pink-600 rounded-none h-9"
          >
            Create New
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-lists" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Price Lists</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{priceLists.length}</div>
                <p className="text-xs text-muted-foreground">
                  {priceLists.length > 0 ? 'Active price lists' : 'No price lists yet'}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
                <FileText className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {priceLists.filter(list => list.status === 'active').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently active price lists
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                <FileText className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {priceLists.filter(list => list.status === 'draft').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Draft price lists
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Price Lists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priceLists.map((list, index) => (
                  <div key={list.listNumber} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-pink-50">
                        <FileText className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-medium">{list.listNumber}</p>
                        <p className="text-sm text-muted-foreground">{list.clientName}</p>
                      </div>
                      <div className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        list.status === 'active' 
                          ? "bg-emerald-50 text-emerald-700" 
                          : "bg-yellow-50 text-yellow-700"
                      )}>
                        {list.status === 'active' ? 'Active' : 'Draft'}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedList(index)
                          setActiveTab('view')
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-list">
          <EditableInvoice />
        </TabsContent>

        {selectedList !== null && (
          <TabsContent value="view">
            <InvoicePreview invoiceData={priceLists[selectedList]} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
