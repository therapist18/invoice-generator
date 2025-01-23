"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react"

const stats = [
  {
    title: "Total Customers",
    value: "2,543",
    change: "+83 this month"
  },
  {
    title: "Active Customers",
    value: "1,832",
    change: "72% of total"
  },
  {
    title: "New Customers",
    value: "83",
    change: "+12% from last month"
  },
  {
    title: "Average Order Value",
    value: "$128.54",
    change: "+$12.20 from last month"
  }
]

const customers = [
  {
    id: "CUS001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8901",
    orders: 12,
    totalSpent: "$1,234.56",
    lastOrder: "2024-01-15",
    status: "Active"
  },
  {
    id: "CUS002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234-567-8902",
    orders: 8,
    totalSpent: "$876.32",
    lastOrder: "2024-01-20",
    status: "Active"
  },
  // Add more customers as needed
]

export default function CustomersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Customers</h1>
          <p className="text-sm text-gray-500">Manage your customer relationships</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">All Customers</Button>
              <Button variant="ghost" className="text-sm">Active</Button>
              <Button variant="ghost" className="text-sm">Inactive</Button>
              <Button variant="ghost" className="text-sm">New</Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search customers..." className="pl-10" />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded border-gray-300" />
                </TableHead>
                <TableHead>Customer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>{customer.totalSpent}</TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell>
                    <Badge variant={customer.status === "Active" ? "success" : "secondary"}>
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
