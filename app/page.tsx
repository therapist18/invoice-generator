import dynamic from 'next/dynamic'

const EditableInvoice = dynamic(() => import('./components/EditableInvoice'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Invoice Generator</h1>
      <EditableInvoice />
    </main>
  )
}
