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
import { Plus, Search, Filter, MoreHorizontal } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "156",
    change: "+12 this month"
  },
  {
    title: "Active Products",
    value: "142",
    change: "91% of total"
  },
  {
    title: "Out of Stock",
    value: "14",
    change: "9% of total"
  },
  {
    title: "Average Price",
    value: "$45.99",
    change: "+$2.50 from last month"
  }
]

const products = [
  {
    id: "PRD001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: "$99.99",
    stock: 45,
    status: "Active"
  },
  {
    id: "PRD002",
    name: "Smart Watch",
    category: "Electronics",
    price: "$199.99",
    stock: 0,
    status: "Out of Stock"
  },
  // Add more products as needed
]

export default function ProductsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Product
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
              <Button variant="ghost" className="text-sm">All Products</Button>
              <Button variant="ghost" className="text-sm">Active</Button>
              <Button variant="ghost" className="text-sm">Out of Stock</Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search products..." className="pl-10" />
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
                <TableHead>Product ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <input type="checkbox" className="rounded border-gray-300" />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "Active" ? "success" : "destructive"}>
                      {product.status}
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
