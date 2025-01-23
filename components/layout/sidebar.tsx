"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  FileText,
  Tags,
  ShoppingCart,
  Users,
  FileEdit,
  PieChart,
  MessageSquare,
  Percent,
  Store,
  ShoppingBag,
  Settings,
  Plus,
  Receipt,
  CreditCard
} from "lucide-react"

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/',
    color: "text-sky-500"
  },
  {
    label: 'Sales',
    icon: ShoppingCart,
    href: '/sales',
    color: "text-green-500"
  },
  {
    label: 'Invoices',
    icon: Receipt,
    href: '/invoices',
    color: "text-violet-500"
  },
  {
    label: 'Expenses',
    icon: CreditCard,
    href: '/expenses',
    color: "text-pink-500"
  },
  {
    label: 'Products',
    icon: Tags,
    href: '/products',
    color: "text-pink-700",
  },
  {
    label: 'Customers',
    icon: Users,
    color: "text-orange-700",
    href: '/customers',
  },
  {
    label: 'Analytics',
    icon: PieChart,
    color: "text-yellow-700",
    href: '/analytics',
  },
  {
    label: 'Marketing',
    icon: MessageSquare,
    color: "text-indigo-700",
    href: '/marketing',
  }
]

const salesChannels = [
  {
    label: 'Online Store',
    icon: Store,
    href: '/online-store',
  },
  {
    label: 'Point of Sale',
    icon: ShoppingBag,
    href: '/pos',
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <Link href="/" className="flex items-center px-3 mb-8">
            <Image
              src="/assets/logo.png"
              alt="Desiny Uniforms"
              width={40}
              height={40}
              className="mr-2"
            />
            <h2 className="text-lg font-semibold text-white">Desiny Uniforms</h2>
          </Link>
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-white">Sales Channels</h2>
          <div className="space-y-1">
            {salesChannels.map((channel) => (
              <Link
                key={channel.href}
                href={channel.href}
                className={cn(
                  "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                  pathname === channel.href ? "text-white bg-white/10" : "text-zinc-400"
                )}
              >
                <div className="flex items-center flex-1">
                  <channel.icon className="h-5 w-5 mr-3" />
                  {channel.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
