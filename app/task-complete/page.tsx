"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, ArrowRight, Home } from "lucide-react"
import { motion } from "framer-motion"

export default function TaskCompletePage() {
  const [points, setPoints] = useState(250)
  const router = useRouter()

  useEffect(() => {
    // Animate points increase
    const timer = setTimeout(() => {
      setPoints(350) // +100 points
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
          <Trophy className="w-24 h-24 mx-auto text-yellow-500" />
        </motion.div>

        <Card className="p-8 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
            <p className="text-gray-600 mb-6">You've successfully completed the task and demonstrated your skills!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600"
          >
            <span>Points:</span>
            <motion.span
              key={points}
              initial={{ scale: 1.5, color: "#22c55e" }}
              animate={{ scale: 1, color: "#9333ea" }}
              transition={{ duration: 0.5 }}
            >
              {points}
            </motion.span>
            {points === 350 && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-green-500 text-sm"
              >
                +100
              </motion.span>
            )}
          </motion.div>

          <div className="grid gap-4 mt-8">
            <Button onClick={() => router.push("/tasks")} className="w-full">
              <ArrowRight className="mr-2 h-4 w-4" />
              Next Task
            </Button>
            <Button variant="outline" onClick={() => router.push("/")} className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  )
}

