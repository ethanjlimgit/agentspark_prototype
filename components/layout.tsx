import type React from "react"
import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-purple-600">AgentSpark</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-sm font-medium hover:text-purple-600">
                  Dashboard
                </a>
                <a href="/tasks" className="text-sm font-medium hover:text-purple-600">
                  Tasks
                </a>
                <a href="/leaderboard" className="text-sm font-medium hover:text-purple-600">
                  Leaderboard
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <BellIcon className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">250 points</span>
                <Avatar>
                  <AvatarFallback>US</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}

