'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, DollarSign, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import useSWR from 'swr'
import { AddExpenseDialog } from '@/components/expenses/add-expense-dialog'
import { DataTable } from '@/components/ui/data-table'
import { columns } from './columns'

interface Expense {
  id: string
  date: string
  amount: number
  description: string
  category: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function ExpensesPage() {
  const [open, setOpen] = useState(false)
  const { data, error, mutate } = useSWR<Expense[]>('/api/expenses', fetcher)

  const expenses = Array.isArray(data) ? data : []
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
  const pendingExpenses = expenses.filter(expense => expense.status === 'PENDING').length
  const approvedExpenses = expenses.filter(expense => expense.status === 'APPROVED').length
  const rejectedExpenses = expenses.filter(expense => expense.status === 'REJECTED').length

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses Dashboard</h2>
          <p className="text-muted-foreground">Manage and track your expenses</p>
        </div>
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Expenses</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingExpenses}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Expenses</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedExpenses}</div>
            <p className="text-xs text-muted-foreground">Processed this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected Expenses</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedExpenses}</div>
            <p className="text-xs text-muted-foreground">Need revision</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          {expenses && <DataTable columns={columns} data={expenses} />}
        </CardContent>
      </Card>

      <AddExpenseDialog 
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
