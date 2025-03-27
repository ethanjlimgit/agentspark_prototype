import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types/task"
import { Clock, Trophy } from "lucide-react"

interface TaskCardProps {
  task: Task
  onViewInstructions: (taskId: string) => void
}

export function TaskCard({ task, onViewInstructions }: TaskCardProps) {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="bg-gray-900 text-white">
        <CardTitle className="flex items-start justify-between">
          <span>{task.title}</span>
          <Badge variant="secondary" className="ml-2">
            {task.difficulty}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-4">{task.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{task.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>{task.points} points</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t">
        <Button className="w-full" onClick={() => onViewInstructions(task.id)}>
          View Instructions
        </Button>
      </CardFooter>
    </Card>
  )
}

