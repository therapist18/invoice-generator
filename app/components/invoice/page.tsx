'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function InvoicePage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your invoices
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <p>No invoices found</p>
            <p className="text-sm mt-2">Create your first invoice to get started</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
