"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { MouseEvent, TaskSubmission } from "@/types/task"
import { api } from "@/services/api"
import { Check, Maximize2, Minimize2, Search, Filter, Clock, Settings } from "lucide-react"

interface JiraIssue {
  id: string
  key: string
  title: string
  type: "task" | "bug" | "story"
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "review" | "done"
  assignee?: {
    name: string
    avatar: string
    initials: string
  }
}

const MOCK_ISSUES: JiraIssue[] = [
  {
    id: "1",
    key: "ABC-123",
    title: "Implement login feature",
    type: "task",
    priority: "high",
    status: "todo",
    assignee: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: "2",
    key: "ABC-124",
    title: "Fix navigation bug",
    type: "bug",
    priority: "medium",
    status: "todo",
    assignee: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
  },
  {
    id: "3",
    key: "ABC-125",
    title: "Update documentation",
    type: "task",
    priority: "low",
    status: "in-progress",
    assignee: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
  },
  {
    id: "4",
    key: "ABC-126",
    title: "Add unit tests",
    type: "task",
    priority: "medium",
    status: "review",
  },
]

export default function VirtualEnvironmentPage() {
  const [mouseEvents, setMouseEvents] = useState<MouseEvent[]>([])
  const [screenshots, setScreenshots] = useState<string[]>([])
  const [screenshotCount, setScreenshotCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [issues, setIssues] = useState<JiraIssue[]>(MOCK_ISSUES)
  const [draggedIssue, setDraggedIssue] = useState<JiraIssue | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)

  const virtualEnvRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const handleMouseEvent = (e: globalThis.MouseEvent) => {
      if (!virtualEnvRef.current) return

      const rect = virtualEnvRef.current.getBoundingClientRect()
      const isInside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      if (isInside) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })

        const newEvent: MouseEvent = {
          x,
          y,
          type: e.type as "move" | "click" | "drag",
          timestamp: Date.now(),
        }
        setMouseEvents((prev) => [...prev, newEvent])
      }
    }

    window.addEventListener("mousemove", handleMouseEvent)
    window.addEventListener("click", handleMouseEvent)

    return () => {
      window.removeEventListener("mousemove", handleMouseEvent)
      window.removeEventListener("click", handleMouseEvent)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const mockScreenshot = `screenshot-${Date.now()}.png`
      setScreenshots((prev) => [...prev, mockScreenshot])
      setScreenshotCount((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleDragStart = (issue: JiraIssue) => {
    setDraggedIssue(issue)
    setMouseEvents((prev) => [
      ...prev,
      {
        type: "drag",
        x: 0,
        y: 0,
        timestamp: Date.now(),
      },
    ])
  }

  const handleDragOver = (e: React.DragEvent, status: JiraIssue["status"]) => {
    e.preventDefault()
    setDropTarget(status)
  }

  const handleDrop = (status: JiraIssue["status"]) => {
    if (!draggedIssue) return

    setIssues((prev) => prev.map((issue) => (issue.id === draggedIssue.id ? { ...issue, status } : issue)))

    setDraggedIssue(null)
    setDropTarget(null)

    setMouseEvents((prev) => [
      ...prev,
      {
        type: "drop",
        x: 0,
        y: 0,
        timestamp: Date.now(),
      },
    ])
  }

  const handleSubmit = async () => {
    const submission: TaskSubmission = {
      taskId: params.id as string,
      userId: "user-1",
      mouseEvents,
      screenshots,
      completionTime: Date.now(),
    }

    try {
      await api.submitTaskData(submission)
      router.push("/task-complete")
    } catch (error) {
      console.error("Failed to submit task:", error)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getIssuesByStatus = (status: JiraIssue["status"]) => issues.filter((issue) => issue.status === status)

  return (
    <Layout>
      <div className={`max-w-7xl mx-auto space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-white" : ""}`}>
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl font-bold">Virtual Environment</h2>
          <div className="flex gap-4">
            <Button variant="outline" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 className="mr-2 h-4 w-4" /> : <Maximize2 className="mr-2 h-4 w-4" />}
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
            <Button onClick={handleSubmit}>
              <Check className="mr-2 h-4 w-4" />
              Complete Task
            </Button>
          </div>
        </div>

        <Card className={`${isFullscreen ? "h-[calc(100vh-5rem)]" : "h-[800px]"}`}>
          <div ref={virtualEnvRef} className="h-full flex flex-col">
            {/* Jira Header */}
            <div className="border-b bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-semibold">Team Alpha Board</div>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Star
                  </Button>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Clock className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Jira Board */}
            <div className="flex-1 overflow-x-auto bg-gray-50 p-6">
              <div className="grid grid-cols-4 gap-6 h-full">
                {(["todo", "in-progress", "review", "done"] as const).map((status) => (
                  <div
                    key={status}
                    className={`
                      bg-gray-100 rounded-lg p-4
                      ${dropTarget === status ? "ring-2 ring-blue-400" : ""}
                    `}
                    onDragOver={(e) => handleDragOver(e, status)}
                    onDrop={() => handleDrop(status)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium capitalize">{status.split("-").join(" ")}</h3>
                      <span className="text-sm text-gray-500">{getIssuesByStatus(status).length}</span>
                    </div>
                    <div className="space-y-3">
                      {getIssuesByStatus(status).map((issue) => (
                        <div
                          key={issue.id}
                          draggable
                          onDragStart={() => handleDragStart(issue)}
                          className={`
                            bg-white rounded-lg p-3 shadow-sm
                            hover:shadow-md transition-all cursor-move
                            ${draggedIssue?.id === issue.id ? "opacity-50" : ""}
                          `}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">{issue.key}</span>
                            {issue.priority === "high" && (
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">High</span>
                            )}
                          </div>
                          <p className="text-sm mb-3">{issue.title}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {issue.type === "bug" ? (
                                <span className="w-2 h-2 bg-red-500 rounded-full" />
                              ) : (
                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                              <span className="text-xs text-gray-500 capitalize">{issue.type}</span>
                            </div>
                            {issue.assignee && (
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={issue.assignee.avatar} />
                                <AvatarFallback>{issue.assignee.initials}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Data collection stats */}
        <div className="fixed bottom-4 right-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-lg overflow-hidden">
            <div className="px-4 py-2 border-b border-white/10 bg-white/5">
              <h3 className="text-xs font-medium text-white/80">Data Collection</h3>
            </div>
            <div className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs font-medium text-white/60">Screenshots</span>
                <span className="font-mono text-sm text-white/90">{screenshotCount}</span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs font-medium text-white/60">Mouse Position</span>
                <span className="font-mono text-sm text-white/90">
                  {Math.round(mousePosition.x)}, {Math.round(mousePosition.y)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs font-medium text-white/60">Events Tracked</span>
                <span className="font-mono text-sm text-white/90">{mouseEvents.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Add missing Star icon component
function Star(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

