"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import type { Task } from "@/types/task"
import { api } from "@/services/api"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, Trophy } from "lucide-react"

export default function TaskInstructionsPage() {
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = await api.getTask(params.id as string)
        setTask(taskData)
      } catch (error) {
        console.error("Failed to fetch task:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [params.id])

  const handleStartTask = () => {
    router.push(`/task/${params.id}/environment`)
  }

  if (loading || !task) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>

        <Card>
          <CardHeader className="bg-gray-900 text-white">
            <div className="flex items-center justify-between">
              <CardTitle>{task.title}</CardTitle>
              <Badge variant="secondary">{task.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center justify-between text-sm text-gray-500 border-b pb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{task.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>{task.points} points</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Instructions</h3>
              <div className="space-y-6">
                {task.instructions.map((instruction) => (
                  <div key={instruction.step} className="space-y-2">
                    <h4 className="font-medium">
                      Step {instruction.step}: {instruction.title}
                    </h4>
                    <p className="text-sm text-gray-600">{instruction.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t">
            <div className="flex w-full gap-4">
              <Button variant="outline" className="w-full" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button className="w-full" onClick={handleStartTask}>
                Start Task
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  )
}

