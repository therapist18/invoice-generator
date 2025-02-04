"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { colors } from "@/lib/colors"
import { ShoppingBag, Filter, Grid, List, Plus } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string
  stock: number
}

export default function OnlineStorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample products data
  const products: Product[] = [
    {
      id: "1",
      name: "Primary School Uniform Set",
      price: 2500,
      category: "School Uniforms",
      description: "Complete set including shirt, shorts/skirt, and tie",
      image: "/assets/products/uniform-set.jpg",
      stock: 50
    },
    {
      id: "2",
      name: "Medical Scrubs",
      price: 3000,
      category: "Medical Wear",
      description: "Comfortable and durable medical scrubs",
      image: "/assets/products/scrubs.jpg",
      stock: 30
    },
    {
      id: "3",
      name: "Sports Kit",
      price: 4000,
      category: "Sports Wear",
      description: "Complete sports kit with jersey and shorts",
      image: "/assets/products/sports-kit.jpg",
      stock: 25
    }
  ]

  const categories = [
    "all",
    "School Uniforms",
    "Medical Wear",
    "Sports Wear",
    "Lab Coats",
    "Accessories"
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="p-6" style={{ backgroundColor: colors.background.paper }}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Online Store</h1>
          <p className="text-sm text-gray-500">Manage your product catalog</p>
        </div>
        <Button style={{ backgroundColor: colors.primary.main }}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            style={viewMode === "grid" ? { backgroundColor: colors.primary.main } : {}}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            style={viewMode === "list" ? { backgroundColor: colors.primary.main } : {}}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} style={{ backgroundColor: colors.background.default }}>
              <CardContent className="p-4">
                <div className="aspect-square mb-4 relative bg-gray-100 rounded-lg">
                  {/* Image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShoppingBag className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge variant="secondary">KES {product.price}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card style={{ backgroundColor: colors.background.default }}>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredProducts.map(product => (
                <div key={product.id} className="flex items-center gap-4 p-4">
                  <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">KES {product.price}</Badge>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                  </div>
                  <Button variant="outline">Edit</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
