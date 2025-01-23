'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, DollarSign, Users, TrendingUp, Calendar } from "lucide-react"
import useSWR from 'swr'
import { AddSaleDialog } from '@/components/sales/add-sale-dialog'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function SalesPage() {
  const [open, setOpen] = useState(false)
  const { data: sales, error, mutate } = useSWR('/api/sales', fetcher)

  const totalSales = sales?.reduce((total: number, sale: any) => total + sale.amount, 0) || 0
  const totalClients = [...new Set(sales?.map((sale: any) => sale.client?.id) || [])].length
  const averageSale = sales?.length ? totalSales / sales.length : 0
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Dashboard</h2>
          <p className="text-muted-foreground">Manage your sales and track revenue</p>
        </div>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Sale
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {averageSale.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{currentMonth} Sales</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sales?.filter((sale: any) => 
              new Date(sale.date).getMonth() === new Date().getMonth()
            ).length || 0}</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
        </CardHeader>
        <CardContent>
          {sales && <DataTable columns={columns} data={sales} />}
        </CardContent>
      </Card>

      <AddSaleDialog 
        open={open} 
        onOpenChange={setOpen} 
        onSuccess={() => {
          setOpen(false)
          mutate()
        }} 
      />
    </div>
  )
}
