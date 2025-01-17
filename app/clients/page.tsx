'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddClientDialog } from "@/components/clients/add-client-dialog"
import { ClientList } from "@/components/clients/client-list"

export default function ClientsPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientCount />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <ActiveClientCount />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <TotalRevenue />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <AverageInvoice />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientList />
        </CardContent>
      </Card>

      <AddClientDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

function ClientCount() {
  const { data: count } = useSWR('/api/clients/count', fetcher)
  return (
    <div className="text-2xl font-bold">
      {count ?? '-'}
    </div>
  )
}

function ActiveClientCount() {
  const { data: count } = useSWR('/api/clients/active-count', fetcher)
  return (
    <div className="text-2xl font-bold">
      {count ?? '-'}
    </div>
  )
}

function TotalRevenue() {
  const { data: revenue } = useSWR('/api/clients/total-revenue', fetcher)
  return (
    <div className="text-2xl font-bold">
      {revenue ? `KES ${revenue.toLocaleString()}` : '-'}
    </div>
  )
}

function AverageInvoice() {
  const { data: average } = useSWR('/api/clients/average-invoice', fetcher)
  return (
    <div className="text-2xl font-bold">
      {average ? `KES ${average.toLocaleString()}` : '-'}
    </div>
  )
}
