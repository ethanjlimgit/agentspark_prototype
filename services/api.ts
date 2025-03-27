import type { Task, TaskSubmission } from "@/types/task"

const MOCK_TASKS: Task[] = [
  {
    id: "1",
    title: "Jira: Transitioning Issues Through Workflow",
    description: "Learn how to move Jira issues through different workflow states effectively",
    category: "Project Management",
    difficulty: "medium",
    points: 100,
    estimatedTime: "10-15 min",
    status: "available",
    reward: "$6-10 USD",
    solutions: 1,
    timeAgo: "14 days ago",
    tags: ["Workflow", "States", "Transitions"],
    instructions: [
      {
        step: 1,
        title: "Access Your Board",
        description:
          "Navigate to your project's Kanban board. You'll see four columns: To Do, In Progress, Review, and Done. Locate issues ABC-123 (Implement login feature) and ABC-124 (Fix navigation bug) in the To Do column.",
      },
      {
        step: 2,
        title: "Move First Issue to In Progress",
        description:
          "Find issue ABC-123 (Implement login feature) in the To Do column. This will be your first task to move.",
      },
      {
        step: 3,
        title: "Start Dragging ABC-123",
        description:
          "Click and hold the ABC-123 issue card. The card will become slightly transparent to indicate it's being dragged.",
      },
      {
        step: 4,
        title: "Move to In Progress",
        description:
          "While holding ABC-123, drag it to the 'In Progress' column. You'll see a blue highlight indicating where the card will be placed.",
      },
      {
        step: 5,
        title: "Move Second Issue to Review",
        description:
          "Next, locate issue ABC-124 (Fix navigation bug) in the To Do column. Click, hold, and drag it directly to the 'Review' column. Again, you'll see the blue highlight indicating the drop zone.",
      },
      {
        step: 6,
        title: "Verify Both Transitions",
        description:
          "Confirm that ABC-123 is now in the 'In Progress' column and ABC-124 is in the 'Review' column. The task is complete when both issues are in their correct positions.",
      },
    ],
  },
  // Add more mock tasks with similar structure...
]

export const api = {
  getTasks: async (): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return MOCK_TASKS
  },

  getTask: async (id: string): Promise<Task | null> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return MOCK_TASKS.find((task) => task.id === id) || null
  },

  submitTaskData: async (submission: TaskSubmission): Promise<{ success: boolean }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Submitted task data:", submission)
    return { success: true }
  },
}

