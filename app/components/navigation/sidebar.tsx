'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Settings, User, CreditCard, BarChart2, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const routes = [
    {
      label: 'Dashboard',
      icon: BarChart2,
      href: '/dashboard',
    },
    {
      label: 'Invoices',
      icon: FileText,
      href: '/invoices',
    },
    {
      label: 'Sales',
      icon: CreditCard,
      href: '/sales',
    },
    {
      label: 'Expenses',
      icon: CreditCard,
      href: '/expenses',
    },
    {
      label: 'Profile',
      icon: User,
      href: '/profile',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ]

  return (
    <div className={cn("relative flex flex-col h-screen", className)}>
      <div className="h-12 flex items-center justify-between px-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 w-full">
        <div className={cn(
          "flex flex-col gap-2 p-2 transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-[200px]"
        )}>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-all",
                pathname === route.href && "bg-accent",
                isCollapsed && "justify-center"
              )}
            >
              <route.icon className="h-4 w-4" />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
