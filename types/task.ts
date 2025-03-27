export interface Task {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  estimatedTime: string
  status: "available" | "in-progress" | "completed"
  instructions: Instruction[]
  reward: string
  solutions: number
  timeAgo: string
  tags: string[]
}

