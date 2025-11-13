"use client"

import { Inter } from "next/font/google"
import { Navbar } from "@/components/layout/navbar"
import { Sidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the screen is mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile)
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [children])

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  return (
    <div className={cn("min-h-screen antialiased", inter.className)}>
      <div className="relative flex h-full">
        {/* Desktop Sidebar */}
        <div className={cn(
          "hidden lg:flex h-screen flex-col fixed inset-y-0 z-50 transition-all duration-300",
          sidebarCollapsed ? "w-[68px]" : "w-72"
        )}>
          <Sidebar collapsed={sidebarCollapsed} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed top-0 left-0 h-full z-50 w-72 transform transition-transform duration-300 ease-in-out lg:hidden",
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'pt-16' // Add padding to account for navbar height
        )}>
          <Sidebar collapsed={false} />
        </div>

        {/* Main Content */}
        <div className={cn(
          "flex-1 min-h-screen transition-all duration-300 w-full",
          sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-72"
        )}>
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="pt-16 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
