"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Trash2 } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  unit_price: number
  stock_quantity: number
}

interface Sale {
  id: string
  product_id: string
  quantity: number
  unit_price: number
  total_amount: number
  customer_name: string
  sale_date: string
  product: Product
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    product_id: "",
    quantity: "",
    customer_name: "",
  })

  const supabase = createClientComponentClient()

  const fetchSales = async () => {
    const { data, error } = await supabase
      .from("sales")
      .select(\`
        *,
        product:products(*)
      \`)
      .order("sale_date", { ascending: false })

    if (error) {
      toast.error("Error fetching sales")
      return
    }

    setSales(data)
    setIsLoading(false)
  }

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name")

    if (error) {
      toast.error("Error fetching products")
      return
    }

    setProducts(data)
  }

  useEffect(() => {
    fetchSales()
    fetchProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedProduct = products.find(p => p.id === formData.product_id)
    if (!selectedProduct) return

    const quantity = parseInt(formData.quantity)
    if (quantity > selectedProduct.stock_quantity) {
      toast.error("Insufficient stock")
      return
    }

    const payload = {
      product_id: formData.product_id,
      quantity: quantity,
      unit_price: selectedProduct.unit_price,
      total_amount: selectedProduct.unit_price * quantity,
      customer_name: formData.customer_name,
    }

    const { error: saleError } = await supabase
      .from("sales")
      .insert(payload)

    if (saleError) {
      toast.error("Error creating sale")
      return
    }

    // Update product stock
    const { error: stockError } = await supabase
      .from("products")
      .update({ stock_quantity: selectedProduct.stock_quantity - quantity })
      .eq("id", formData.product_id)

    if (stockError) {
      toast.error("Error updating stock")
      return
    }

    toast.success("Sale recorded successfully")
    setIsOpen(false)
    setFormData({ product_id: "", quantity: "", customer_name: "" })
    fetchSales()
    fetchProducts()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this sale?")) {
      const sale = sales.find(s => s.id === id)
      if (!sale) return

      const { error: saleError } = await supabase
        .from("sales")
        .delete()
        .eq("id", id)

      if (saleError) {
        toast.error("Error deleting sale")
        return
      }

      // Restore product stock
      const { error: stockError } = await supabase
        .from("products")
        .update({ 
          stock_quantity: sale.product.stock_quantity + sale.quantity 
        })
        .eq("id", sale.product_id)

      if (stockError) {
        toast.error("Error restoring stock")
        return
      }

      toast.success("Sale deleted successfully")
      fetchSales()
      fetchProducts()
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales</h1>
          <p className="text-sm text-muted-foreground mt-1">Record and manage sales</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#E31B54] hover:bg-[#C41747] text-white h-9">
              <Plus className="h-4 w-4 mr-2" /> Record Sale
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Sale</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Product</label>
                <Select
                  value={formData.product_id}
                  onValueChange={(value) => setFormData({ ...formData, product_id: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (Stock: {product.stock_quantity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium">Customer Name</label>
                <Input
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Record Sale</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          sales.map((sale) => (
            <Card key={sale.id} className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {sale.product.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(sale.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Customer:</span> {sale.customer_name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Quantity:</span> {sale.quantity}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Unit Price:</span> KES {sale.unit_price.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Total:</span> KES {sale.total_amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(sale.sale_date).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
