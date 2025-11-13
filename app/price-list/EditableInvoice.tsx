// @ts-nocheck
'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { FileText, FileDown, Plus, Trash2, Calendar, HelpCircle } from 'lucide-react'
import { generatePDF } from '../../lib/pdfUtils'
import { format } from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import PriceListPreview from './PriceListPreview'

interface PriceListItem {
  quantity: string | number
  description: string
  price: number
}


const EditableInvoice = () => {
  const [priceListData, setPriceListData] = useState({
    listNumber: 'PL-001',
    date: new Date(),
    clientName: 'The Grand Mtwapa Hospital',
    companyDetails: {
      name: 'Destiny Uniform Plus',
      phone: '0722 320830 / 0785 320830',
      email: 'destinyuniforms03@gmail.com',
      address: 'Mombasa, Kenya'
    },
    items: [
      { quantity: 1, description: 'Scrubs', price: 2500 },
    ]
  })

  const handleInputChange = (field: string, value: string) => {
    setPriceListData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCompanyDetailsChange = (field: string, value: string) => {
    setPriceListData(prev => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [field]: value
      }
    }))
  }

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...priceListData.items]
    if (field === 'price') {
      newItems[index] = {
        ...newItems[index],
        [field]: parseFloat(value) || 0
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: field === 'quantity' ? value : value
      }
    }
    setPriceListData(prev => ({
      ...prev,
      items: newItems
    }))
  }

  const addNewItem = () => {
    setPriceListData(prev => ({
      ...prev,
      items: [...prev.items, { quantity: 1, description: '', price: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    setPriceListData(prev => ({
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
    <div className="sm:p-4 flex flex-col lg:flex-row sm:gap-6 lg:gap-8 w-full max-w-7xl mx-auto">
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 rounded-lg shadow-sm">
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-primary flex items-center gap-2">
            Price List Details
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-secondary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Fill in the price list information here</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="listNumber" className="text-secondary">Price List #</Label>
              <Input
                id="listNumber"
                value={priceListData.listNumber}
                onChange={(e) => handleInputChange('listNumber', e.target.value)}
                className="w-full p-2 border rounded focus:border-secondary"
                placeholder="e.g., PL-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date" className="text-secondary">Date</Label>
              <div className="relative">
                <DatePicker
                  selected={priceListData.date}
                  onChange={(date: Date | null) => date && setPriceListData(prev => ({ ...prev, date }))}
                  dateFormat="MMMM d, yyyy"
                  className="w-full p-2 border rounded focus:border-secondary pl-10"
                />
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-primary">Company Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-secondary">Company Name</Label>
                <Input
                  id="companyName"
                  value={priceListData.companyDetails.name}
                  onChange={(e) => handleCompanyDetailsChange('name', e.target.value)}
                  className="w-full p-2 border rounded focus:border-secondary"
                  placeholder="Your Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPhone" className="text-secondary">Phone</Label>
                <Input
                  id="companyPhone"
                  value={priceListData.companyDetails.phone}
                  onChange={(e) => handleCompanyDetailsChange('phone', e.target.value)}
                  className="w-full p-2 border rounded focus:border-secondary"
                  placeholder="Phone Number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail" className="text-secondary">Email</Label>
                <Input
                  id="companyEmail"
                  value={priceListData.companyDetails.email}
                  onChange={(e) => handleCompanyDetailsChange('email', e.target.value)}
                  className="w-full p-2 border rounded focus:border-secondary"
                  placeholder="company@example.com"
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyAddress" className="text-secondary">Address</Label>
                <Input
                  id="companyAddress"
                  value={priceListData.companyDetails.address}
                  onChange={(e) => handleCompanyDetailsChange('address', e.target.value)}
                  className="w-full p-2 border rounded focus:border-secondary"
                  placeholder="Company Address"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-secondary">Client Name</Label>
            <Input
              id="clientName"
              value={priceListData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              className="w-full p-2 border rounded focus:border-secondary"
              placeholder="Client or Company Name"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-semibold text-primary">Products</h3>
            <Button 
              onClick={addNewItem} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 text-secondary hover:text-primary border-secondary/20 hover:border-primary text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Button>
          </div>
          
          <div className="space-y-4">
            {priceListData.items.map((item, index) => (
              <div key={index} className="space-y-4 p-3 sm:p-4 bg-gray-50 rounded-md relative border border-secondary/10 hover:border-primary/20 transition-colors">
                <button
                  onClick={() => removeItem(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`quantity-${index}`} className="text-secondary">Unit</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="text"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      className="w-full p-2 border rounded focus:border-secondary"
                      placeholder="e.g., Each, Dozen, Set"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`price-${index}`} className="text-secondary">Price (KES)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      className="w-full p-2 border rounded focus:border-secondary"
                      placeholder="0.00"
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
                    placeholder="Product description"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button 
            onClick={handleExportPDF} 
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 w-full sm:w-auto"
          >
            <FileDown className="w-4 h-4" />
            Export Price List
          </Button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-50 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-auto max-h-[calc(100vh-12rem)]">
          <div className="min-w-[500px]">
            <PriceListPreview invoiceData={priceListData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditableInvoice
