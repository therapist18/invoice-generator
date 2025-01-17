import dynamic from 'next/dynamic'

const EditableInvoice = dynamic(() => import('./invoices/EditableInvoice'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <div className="w-full p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-800 text-center">
         Invoice Generator
        </h1>
        <EditableInvoice />
      </div>
    </main>
  )
}
