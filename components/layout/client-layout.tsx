"use client"

import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className={cn("min-h-screen antialiased", inter.className)}>
      <div className="relative flex h-full">
        {/* Sidebar */}
        <div className={cn(
          "hidden lg:flex h-screen flex-col fixed inset-y-0 z-50 transition-all duration-300",
          sidebarCollapsed ? "w-[68px]" : "w-72"
        )}>
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Main Content */}
        <div className={cn(
          "flex-1 min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-72"
        )}>
          <Navbar onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="pt-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
