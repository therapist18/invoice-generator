'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import useSWR from 'swr'
import { AddSaleDialog } from '../components/sales/add-sale-dialog'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SalesPage() {
  const [open, setOpen] = useState(false)
  const { data: sales, error } = useSWR('/api/sales', fetcher)

  const totalSales = sales?.reduce((total: number, sale: any) => total + sale.amount, 0) || 0
  const totalClients = [...new Set(sales?.map((sale: any) => sale.clientId) || [])].length
  const averageSale = sales?.length ? totalSales / sales.length : 0

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Sale
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalSales.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Clients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Sale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {averageSale.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sales?.map((sale: any) => (
              <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{sale.client.name}</p>
                  <p className="text-sm text-muted-foreground">{sale.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">KES {sale.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(sale.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddSaleDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
