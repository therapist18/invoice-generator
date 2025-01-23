"use client"

import { UserButton } from "@/components/ui/user-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Command, Bell } from "lucide-react"

export function Navbar() {
  return (
    <div className="flex items-center p-4 border-b">
      <div className="flex items-center flex-1 gap-x-4">
        <div className="relative w-96">
          <Search className="absolute h-4 w-4 top-3 left-3 text-muted-foreground" />
          <Input
            placeholder="Search uniforms, orders, customers..."
            className="pl-10 pr-10 bg-secondary"
          />
          <div className="absolute top-2 right-2 bg-background rounded-sm px-1.5 py-1 text-muted-foreground border">
            <Command className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full" />
        </Button>
        <Button variant="outline" size="sm">
          Need Help?
        </Button>
        <UserButton />
      </div>
    </div>
  )
}
