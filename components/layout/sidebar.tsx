"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  CreditCard,
  Package,
  Users,
  LineChart,
  Megaphone,
  ShoppingCart,
  Store,
  ChevronLeft
} from "lucide-react"
import { colors } from "@/lib/colors"

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
    color: colors.text.primary
  },
  {
    label: 'Invoices',
    icon: FileText,
    href: '/invoices',
    color: colors.text.primary
  }
]

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col bg-white border-r" style={{ borderColor: colors.border.light }}>
      <div className={cn("p-6", collapsed && "p-4")}>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="Desiny Uniforms"
            width={40}
            height={40}
            className="rounded-full"
          />
          {!collapsed && (
            <h1 className="text-xl font-bold" style={{ color: colors.text.primary }}>
              Desiny Uniforms
            </h1>
          )}
        </Link>
      </div>

      <div className="flex-1 px-4 space-y-2 overflow-y-auto">
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname === route.href 
                  ? "bg-gray-100 text-pink-500" 
                  : "text-gray-500 hover:text-pink-500 hover:bg-gray-50",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? route.label : undefined}
            >
              <route.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
