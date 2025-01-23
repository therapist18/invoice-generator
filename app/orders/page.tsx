"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Plus, Search, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "21",
    change: "25.2% last week",
    trend: "up"
  },
  {
    title: "Order items over time",
    value: "15",
    change: "18.2% last week",
    trend: "up"
  },
  {
    title: "Returns Orders",
    value: "0",
    change: "-1.2% last week",
    trend: "down"
  },
  {
    title: "Fulfilled orders over time",
    value: "12",
    change: "12.2% last week",
    trend: "up"
  }
]

const orders = [
  {
    id: "#1002",
    date: "11 Feb, 2024",
    customer: "Wade Warren",
    payment: "Pending",
    total: "$20.00",
    delivery: "N/A",
    items: "2 items",
    fulfillment: "Unfulfilled"
  },
  {
    id: "#1004",
    date: "13 Feb, 2024",
    customer: "Esther Howard",
    payment: "Success",
    total: "$22.00",
    delivery: "N/A",
    items: "3 items",
    fulfillment: "Fulfilled"
  },
  // Add more orders as needed
]

export default function OrdersPage() {
  const [dateRange, setDateRange] = useState("Jan 1 - Jan 30, 2024")

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue>{dateRange}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Jan 1 - Jan 30, 2024">Jan 1 - Jan 30, 2024</SelectItem>
              <SelectItem value="Feb 1 - Feb 28, 2024">Feb 1 - Feb 28, 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export</Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
              <p className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="text-sm">All</Button>
              <Button variant="ghost" className="text-sm">Unfulfilled</Button>
              <Button variant="ghost" className="text-sm">Unpaid</Button>
              <Button variant="ghost" className="text-sm">Open</Button>
              <Button variant="ghost" className="text-sm">Closed</Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search orders..." className="pl-10" />
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
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead className="w-12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    <Badge variant={order.payment === "Success" ? "success" : "warning"}>
                      {order.payment}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.delivery}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>
                    <Badge variant={order.fulfillment === "Fulfilled" ? "success" : "destructive"}>
                      {order.fulfillment}
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
        </div>
      </Card>
    </div>
  )
}
