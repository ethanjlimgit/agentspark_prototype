"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import type { Task } from "@/types/task"
import { api } from "@/services/api"

const CATEGORIES = [
  { title: "Project Management", color: "bg-gray-400" },
  { title: "Insurance", color: "bg-blue-200" },
  { title: "Design Tools", color: "bg-red-300" },
  { title: "Healthcare", color: "bg-indigo-300" },
  { title: "Customer Support", color: "bg-emerald-300" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await api.getTasks()
        setTasks(tasks)
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const handleViewInstructions = (taskId: string) => {
    router.push(`/task/${taskId}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between px-4 py-2 bg-white border-b">
        <div className="flex items-center space-x-8">
          <a href="/" className="font-medium">
            Home
          </a>
          <a href="/tasks" className="font-medium">
            Leaderboard
          </a>
          <a href="/profile" className="font-medium">
            Profile
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <BellIcon className="w-5 h-5" />
          <span className="text-purple-500">250 points</span>
          <Avatar className="w-8 h-8" />
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {/* Categories */}
        <div className="relative flex space-x-6 mb-8 overflow-hidden justify-center">
          <button className="absolute left-0 top-1/2 -translate-y-1/2">←</button>
          {CATEGORIES.map((category, index) => (
            <Card key={index} className={`${category.color} p-4 w-72 h-32`}>
              <div className="text-lg font-mono text-white">{category.title}</div>
            </Card>
          ))}
          <button className="absolute right-0 top-1/2 -translate-y-1/2">→</button>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-xl font-bold mb-4">Available Tasks</h2>
            <div className="space-y-4 mb-4">
              <input type="text" placeholder="Search tasks by title..." className="w-full p-2 border rounded" />
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Latest
                </Button>
                <Button variant="outline" size="sm">
                  Show paid tasks only
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Status
                </Button>
                <Button variant="outline" size="sm">
                  Difficulty
                </Button>
                <Button variant="outline" size="sm">
                  Duration
                </Button>
                <Button variant="outline" size="sm">
                  All Tags
                </Button>
              </div>
            </div>

            {/* Task List */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {tasks.map((task, index) => (
                  <Card
                    key={task.id}
                    className="p-4 bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => handleViewInstructions(task.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jira-1-n2QhWIAsWfE9MKwa1RbqAMRsDSoHFb.svg"
                          alt="Task Icon"
                          width={24}
                          height={24}
                          className="text-blue-400"
                        />
                        <span>{task.title}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-green-400">{task.reward}</div>
                        <div className="text-purple-400">♦ {task.points}</div>
                        <div>
                          {task.solutions} solution{task.solutions > 1 ? "s" : ""}
                        </div>
                        <div className="text-sm text-gray-400">{task.timeAgo}</div>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Additional similar cards */}
                <Card
                  className="p-4 bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleViewInstructions("1")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jira-1-n2QhWIAsWfE9MKwa1RbqAMRsDSoHFb.svg"
                        alt="Task Icon"
                        width={24}
                        height={24}
                        className="text-blue-400"
                      />
                      <span>Jira: Creating and Updating Issues</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-green-400">$6-10 USD</div>
                      <div className="text-purple-400">♦ 100</div>
                      <div>3 solutions</div>
                      <div className="text-sm text-gray-400">17 days ago</div>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleViewInstructions("1")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jira-1-n2QhWIAsWfE9MKwa1RbqAMRsDSoHFb.svg"
                        alt="Task Icon"
                        width={24}
                        height={24}
                        className="text-blue-400"
                      />
                      <span>Jira: Commenting and Collaboration</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-green-400">$4-8 USD</div>
                      <div className="text-purple-400">♦ 50</div>
                      <div>2 solutions</div>
                      <div className="text-sm text-gray-400">3 days ago</div>
                    </div>
                  </div>
                </Card>

                <Card
                  className="p-4 bg-gray-900 text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => handleViewInstructions("1")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c39a60-asana-1ajA8wcSHcebeuLDnHtTK69oHxMPz9.svg"
                        alt="Task Icon"
                        width={24}
                        height={24}
                        className="text-blue-400"
                      />
                      <span>Asana: Creating a Task</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-green-400">$4-8 USD</div>
                      <div className="text-purple-400">♦ 50</div>
                      <div>0 solutions</div>
                      <div className="text-sm text-gray-400">Just added</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Streak Calendar */}
            <Card className="p-4 bg-purple-100">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-purple-600">0 Days</div>
                <div className="text-sm">Current Streak</div>
                <div className="text-sm">1 Day All-time</div>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sa", "Su", "M", "T", "W", "Th", "F"].map((day) => (
                  <div key={day} className="text-center text-sm">
                    {day}
                  </div>
                ))}
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border border-purple-200 ${
                        i === 2 ? "bg-purple-500" : "bg-white"
                      }`}
                    />
                  ))}
              </div>
              <div className="text-center text-sm">21:15:21 remaining</div>
            </Card>

            {/* Premium Card */}
            <Card className="p-4 bg-gray-900 text-white">
              <h3 className="text-2xl font-bold mb-4">Get Verified</h3>
              <ul className="space-y-2 mb-4">
                <li>Complete Tasks for Cash Rewards</li>
                <li>Exclusive Access to New Features</li>
                <li>Priority Support</li>
              </ul>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">Get Access</Button>
            </Card>

            {/* Leaderboard Preview */}
            <Card className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Top Contributors</h3>
                <div className="text-sm">Today's leaderboard</div>
              </div>
              <div className="text-center text-sm text-gray-500">No contributions today</div>
              <div className="text-right">
                <a href="#" className="text-sm text-blue-500">
                  View all
                </a>
              </div>
            </Card>

            <Button variant="outline" className="w-full">
              Report Issue
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

