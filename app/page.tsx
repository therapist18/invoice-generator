"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DollarSign,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  Plus,
  FileText,
  MoreHorizontal
} from "lucide-react"
import { useState } from "react"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: string
  type: 'sale' | 'expense'
}

export default function Dashboard() {
  const { data: sales } = useSWR('/api/sales', fetcher)
  const { data: expenses } = useSWR('/api/expenses', fetcher)
  const { data: invoices } = useSWR('/api/invoices', fetcher)

  const stats = [
    {
      title: "Total Revenue",
      value: "KES 45,231.89",
      change: "+20.1% from last month",
      icon: DollarSign
    },
    {
      title: "Total Sales",
      value: "123",
      change: "+15% from last month",
      icon: ShoppingCart
    },
    {
      title: "Total Expenses",
      value: "KES 12,234.56",
      change: "+8% from last month",
      icon: CreditCard
    },
    {
      title: "Net Profit",
      value: "KES 32,997.33",
      change: "+12% from last month",
      icon: TrendingUp
    }
  ]

  const recentTransactions: Transaction[] = [
    {
      id: "#INV001",
      date: "2024-01-23",
      description: "School Uniform Set",
      amount: 12500,
      status: "Completed",
      type: 'sale'
    },
    {
      id: "#EXP001",
      date: "2024-01-22",
      description: "Fabric Purchase",
      amount: 45000,
      status: "Paid",
      type: 'expense'
    },
    {
      id: "#INV002",
      date: "2024-01-21",
      description: "Sports Uniforms",
      amount: 35000,
      status: "Pending",
      type: 'sale'
    },
    // Add more transactions as needed
  ]

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome to Desiny Uniforms</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Create Invoice
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" /> Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales & Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}>
                      {transaction.type === 'expense' ? '-' : '+'}KES {transaction.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === "Completed" ? "success" : "warning"}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New order received</p>
                  <p className="text-xs text-gray-500">Order #1234 from John Doe</p>
                </div>
                <p className="text-xs text-gray-500">2 mins ago</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-gray-500">KES 25,000 from Invoice #INV001</p>
                </div>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New expense recorded</p>
                  <p className="text-xs text-gray-500">Fabric purchase - KES 45,000</p>
                </div>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">School Uniform Set</p>
                  <p className="text-sm text-gray-500">125 units sold</p>
                </div>
                <p className="font-medium">KES 1,250,000</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sports Uniform</p>
                  <p className="text-sm text-gray-500">89 units sold</p>
                </div>
                <p className="font-medium">KES 890,000</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Lab Coats</p>
                  <p className="text-sm text-gray-500">67 units sold</p>
                </div>
                <p className="font-medium">KES 670,000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1235</p>
                  <p className="text-sm text-gray-500">St. Mary's School</p>
                </div>
                <Badge>In Progress</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1236</p>
                  <p className="text-sm text-gray-500">Sunshine Academy</p>
                </div>
                <Badge>Pending</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Order #1237</p>
                  <p className="text-sm text-gray-500">Green Valley High</p>
                </div>
                <Badge>Processing</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fabric Purchase</p>
                  <p className="text-sm text-gray-500">Bulk order - Cotton</p>
                </div>
                <p className="font-medium text-red-500">-KES 45,000</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Equipment Maintenance</p>
                  <p className="text-sm text-gray-500">Sewing machines</p>
                </div>
                <p className="font-medium text-red-500">-KES 12,000</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Utilities</p>
                  <p className="text-sm text-gray-500">Electricity bill</p>
                </div>
                <p className="font-medium text-red-500">-KES 8,500</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
