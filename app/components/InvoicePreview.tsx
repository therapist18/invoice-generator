'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '../../lib/utils'

interface InvoicePreviewProps {
  invoiceData: {
    invoiceNumber: string
    date: string
    clientName: string
    items: Array<{
      quantity: number
      description: string
      price: number
    }>
  }
  className?: string
}

const InvoicePreview = ({ invoiceData, className }: InvoicePreviewProps) => {
  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + item.quantity * item.price
    }, 0)
  }

  return (
    <div className={cn("bg-white p-8 print:p-8 rounded-lg shadow-lg print-invoice min-h-[1000px]", className)}>
      {/* Header with Logo and Title */}
      <div className="flex items-start justify-between mb-8 print:mb-8">
        <div className="flex items-center">
          <Image 
            src="/assets/logo.png"
            alt="Destiny Uniform Plus"
            width={150}
            height={150}
            className="mr-4"
          />
        </div>
        <div className="text-right text-sm text-secondary">
          <p>Tel: 0722 320830 / 0785 320830</p>
          <p>Email: info@destinyuniforms.com</p>
        </div>
      </div>

      {/* Invoice Title */}
      <div className="text-center text-2xl font-bold mb-8 text-primary">
        INVOICE
      </div>

      {/* Invoice Details */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-16 font-semibold">No.</div>
          <div className="flex-1 border-b-2 border-gray-300 text-primary ml-2 px-2">{invoiceData.invoiceNumber}</div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-16 font-semibold">DATE:</div>
          <div className="flex-1 border-b-2 border-gray-300 ml-2 px-2">{invoiceData.date}</div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-16 font-semibold">M/s.</div>
          <div className="flex-1 border-b-2 border-gray-300 ml-2 px-2">{invoiceData.clientName}</div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full mt-4 print:mt-4">
          <thead>
            <tr className="border-t-2 border-b-2 border-gray-800 mb-3">
              <th className="py-3 px-3 print:py-3 print:px-3 text-left text-secondary">QTY</th>
              <th className="py-3 px-3 print:py-3 print:px-3 text-left text-secondary">DESCRIPTIONS</th>
              <th className="py-3 px-3 print:py-3 print:px-3 text-right text-secondary">@</th>
              <th className="py-3 px-3 print:py-3 print:px-3 text-right text-secondary">SHS.</th>
              <th className="py-3 px-3 print:py-3 print:px-3 text-right text-secondary">CTS.</th>
            </tr>
          </thead>
          <tbody className="mt-4 print:mt-4">
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-3 print:py-3 print:px-3 text-left border-b border-l-2 border-gray-800">{item.quantity}</td>
                <td className="py-3 px-3 print:py-3 print:px-3 text-left border-b border-l-2 border-gray-800">{item.description}</td>
                <td className="py-3 px-3 print:py-3 print:px-3 text-right border-b border-l-2 border-gray-800">{item.price.toLocaleString()}</td>
                <td className="py-3 px-3 print:py-3 print:px-3 text-right border-b border-l-2 border-gray-800">{(item.quantity * item.price).toLocaleString()}</td>
                <td className="py-3 px-3 print:py-3 print:px-3 text-right border-b border-l-2 border-r-2 border-gray-800">00</td>
              </tr>
            ))}
            {/* Empty rows */}
            {[...Array(Math.max(5, 10 - invoiceData.items.length))].map((_, index) => (
              <tr key={`empty-${index}`}>
                <td className="py-3 px-3 print:py-3 print:px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                <td className="py-3 px-3 print:py-3 print:px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                <td className="py-3 px-3 print:py-3 print:px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                <td className="py-3 px-3 print:py-3 print:px-3 border-b border-l-2 border-gray-800">&nbsp;</td>
                <td className="py-3 px-3 print:py-3 print:px-3 border-b border-l-2 border-r-2 border-gray-800">&nbsp;</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-3 px-3 print:py-3 print:px-3 text-right font-bold border-t-2 border-b-2 border-l-2 border-gray-800">TOTAL:</td>
              <td className="py-3 px-3 print:py-3 print:px-3 text-right font-bold border-t-2 border-b-2 border-l-2 border-gray-800">{calculateTotal().toLocaleString()}</td>
              <td className="py-3 px-3 print:py-3 print:px-3 text-right font-bold border-t-2 border-b-2 border-l-2 border-r-2 border-gray-800">00</td>
            </tr>
          </tfoot>
        </table>
        <div className="text-center mt-6 border-t-0">
          <p className="font-bold uppercase mb-2">ACCOUNTS ARE DUE ON DEMAND</p>
          <p className="text-xs text-gray-600">E.& O.E</p>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreview
