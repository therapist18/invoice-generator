'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '../../lib/utils'
import { format } from 'date-fns'
import { Button } from "@/components/ui/button"
import { useToast } from '@/hooks/use-toast'
import InvoiceService from '@/services/invoice-service'

interface InvoicePreviewProps {
  invoiceData: {
    invoiceNumber: string
    date: Date
    clientName: string
    companyDetails: {
      name: string
      phone: string
      email: string
      address: string
    }
    items: Array<{
      quantity: number
      description: string
      price: number
    }>
  }
  className?: string
}

const InvoicePreview = ({ invoiceData, className }: InvoicePreviewProps) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleExport = async () => {
    try {
      setLoading(true)
      const service = InvoiceService.getInstance()
      await service.exportInvoice(invoiceData.invoiceNumber)
      
      toast({
        title: "Success",
        description: "Invoice exported successfully",
        type: "success"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export invoice",
        type: "error"
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount).replace('KES', '')
  }

  return (
    <div className={cn("bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg print-invoice w-full max-w-4xl mx-auto", className)}>
      {/* Header with Logo and Title */}
      <div className="flex flex-row items-start justify-between mb-8">
        <div className="flex items-start w-[120px] h-[120px] relative">
          <Image 
            src="/assets/logo.png"
            alt={invoiceData.companyDetails.name}
            fill
            sizes="120px"
            style={{ objectFit: 'contain' }}
            className="print:!w-[120px] print:!h-[120px]"
            priority
          />
        </div>
        <div className="text-right text-sm text-secondary">
          <p className="font-semibold text-primary">{invoiceData.companyDetails.name}</p>
          <p>{invoiceData.companyDetails.address}</p>
          <p>Tel: {invoiceData.companyDetails.phone}</p>
          <p>Email: {invoiceData.companyDetails.email}</p>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="text-center text-2xl font-bold mb-8 text-primary">
        INVOICE
      </div>

      {/* Invoice Details */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center mb-3">
          <div className="w-16 font-semibold">No.</div>
          <div className="flex-1 border-b-2 border-gray-300 text-primary ml-2 px-2">{invoiceData.invoiceNumber}</div>
        </div>
        <div className="flex items-center mb-3">
          <div className="w-16 font-semibold">DATE:</div>
          <div className="flex-1 border-b-2 border-gray-300 ml-2 px-2">
            {format(new Date(invoiceData.date), 'MMMM dd, yyyy')}
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-16 font-semibold">M/s.</div>
          <div className="flex-1 border-b-2 border-gray-300 ml-2 px-2">{invoiceData.clientName}</div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mb-8">
        <Button 
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? "Exporting..." : "Export Invoice"}
        </Button>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border-t-2 border-b-2 border-gray-800">
                <th className="py-3 px-3 text-left text-secondary w-20">QTY</th>
                <th className="py-3 px-3 text-left text-secondary">DESCRIPTIONS</th>
                <th className="py-3 px-3 text-right text-secondary w-32">PRICE</th>
                <th className="py-3 px-3 text-right text-secondary w-32">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-3 text-left border-b border-l-2 border-gray-800">{item.quantity}</td>
                  <td className="py-3 px-3 text-left border-b border-l-2 border-gray-800">{item.description}</td>
                  <td className="py-3 px-3 text-right border-b border-l-2 border-gray-800">{formatCurrency(item.price)}</td>
                  <td className="py-3 px-3 text-right border-b border-l-2 border-r-2 border-gray-800">{formatCurrency(item.quantity * item.price)}</td>
                </tr>
              ))}
              {/* Empty rows */}
              {[...Array(Math.max(5, 10 - invoiceData.items.length))].map((_, index) => (
                <tr key={`empty-${index}`}>
                  <td className="py-3 px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                  <td className="py-3 px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                  <td className="py-3 px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                  <td className="py-3 px-3 border-b border-l-2 border-r-2 border-gray-800">&nbsp;</td>
                </tr>
              ))}
              {/* Total Row */}
              <tr>
                <td colSpan={3} className="py-3 px-3 text-right border-b border-l-2 border-gray-800 font-bold">
                  Total Amount:
                </td>
                <td className="py-3 px-3 text-right border-b border-l-2 border-r-2 border-gray-800 font-bold">
                  {formatCurrency(calculateTotal())}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center mt-6">
            <p className="font-bold uppercase mb-2">ACCOUNTS ARE DUE ON DEMAND</p>
            <p className="text-xs text-gray-600">E.& O.E</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview
