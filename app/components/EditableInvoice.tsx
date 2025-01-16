'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import Input from './ui/input'
import Label from './ui/label'
import Button from './ui/button'
import { FileText, FileDown, Plus, Trash2 } from 'lucide-react'
import { generatePDF } from '../../lib/pdfUtils'

const InvoicePreview = dynamic(() => import('./InvoicePreview'), {
  ssr: false
})

interface InvoiceItem {
  quantity: number
  description: string
  price: number
}

const EditableInvoice = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '158',
    date: '29th Nov, 2024',
    clientName: 'The Grand Mtwapa Hospital',
    items: [
      { quantity: 2, description: 'Scrubs', price: 2500 },
    ]
  })

  const handleInputChange = (field: string, value: string) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...invoiceData.items]
    if (field === 'quantity' || field === 'price') {
      newItems[index] = {
        ...newItems[index],
        [field]: parseFloat(value) || 0
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      }
    }
    setInvoiceData(prev => ({
      ...prev,
      items: newItems
    }))
  }

  const addNewItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { quantity: 0, description: '', price: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }))
  }

  const handleExportPDF = async () => {
    const element = document.querySelector('.print-invoice') as HTMLElement
    if (element) {
      await generatePDF(element)
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 w-full max-w-7xl mx-auto">
      <div className="w-full lg:w-1/2 space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">Invoice Details</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber" className="text-secondary">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                className="w-full p-2 border rounded focus:border-secondary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-secondary">Date</Label>
              <Input
                id="date"
                value={invoiceData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full p-2 border rounded focus:border-secondary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-secondary">Client Name</Label>
            <Input
              id="clientName"
              value={invoiceData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className="w-full p-2 border rounded focus:border-secondary"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-semibold text-primary">Items</h3>
            <Button 
              onClick={addNewItem} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 text-secondary hover:text-primary border-secondary/20 hover:border-primary"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>
          
          {invoiceData.items.map((item, index) => (
            <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-md relative border border-secondary/10">
              <button
                onClick={() => removeItem(index)}
                className="absolute top-2 right-2 text-gray-400 hover:text-primary"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`quantity-${index}`} className="text-secondary">Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border rounded focus:border-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`price-${index}`} className="text-secondary">Price</Label>
                  <Input
                    id={`price-${index}`}
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                    className="w-full p-2 border rounded focus:border-secondary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`} className="text-secondary">Description</Label>
                <Input
                  id={`description-${index}`}
                  value={item.description}
                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  className="w-full p-2 border rounded focus:border-secondary"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button 
            onClick={handleExportPDF} 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <FileDown className="w-4 h-4" />
            Export as PDF
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-secondary hover:text-primary border-secondary/20 hover:border-primary"
          >
            <FileText className="w-4 h-4" />
            Export as Word
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <InvoicePreview invoiceData={invoiceData} className="sticky top-4" />
      </div>
    </div>
  )
}

export default EditableInvoice
