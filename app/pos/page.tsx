"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { colors } from "@/lib/colors"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Receipt } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}

interface CartItem extends Product {
  cartQuantity: number
}

export default function POSPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample products data
  const products: Product[] = [
    {
      id: "P1",
      name: "School Uniform Set",
      price: 2500,
      category: "Uniforms",
      quantity: 50
    },
    {
      id: "P2",
      name: "Lab Coat",
      price: 1800,
      category: "Medical",
      quantity: 30
    },
    {
      id: "P3",
      name: "Sports Kit",
      price: 3000,
      category: "Sports",
      quantity: 25
    },
    // Add more products
  ]

  const categories = ["all", "Uniforms", "Medical", "Sports"]

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      }
      return [...currentCart, { ...product, cartQuantity: 1 }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: string, change: number) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.cartQuantity + change
          return newQuantity > 0
            ? { ...item, cartQuantity: newQuantity }
            : item
        }
        return item
      })
    )
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const total = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Products Section */}
      <div className="flex-1 p-6 overflow-auto" style={{ backgroundColor: colors.background.paper }}>
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Point of Sale</h1>
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => addToCart(product)}
              style={{ backgroundColor: colors.background.default }}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <Badge variant="secondary">KES {product.price}</Badge>
                </div>
                <p className="text-sm text-gray-500">In stock: {product.quantity}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-96 border-l flex flex-col" style={{ backgroundColor: colors.background.default }}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Current Sale</h2>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between mb-4 p-2 border rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">KES {item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{item.cartQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold">KES {total.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <Receipt className="h-4 w-4 mr-2" />
              Generate Invoice
            </Button>
            <Button className="w-full" style={{ backgroundColor: colors.primary.main }}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
