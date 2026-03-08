"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface Project {
  id: number
  name: string
  slug: string
  description: string
  url: string
  live: boolean
}

export default function ProjectPage() {

  const params = useParams()
  const slug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    async function fetchProject() {
      const res = await fetch("http://localhost:4000/projects")

      const data: Project[] = await res.json()

      const foundProject = data.find(p => p.slug === slug)

      setProject(foundProject || null)
    }

    fetchProject()
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-6 py-20 space-y-8">

      <Button asChild variant="outline">
        <Link href="/projects">
          ← Back to Projects
        </Link>
      </Button>

      <h1 className="text-4xl font-bold">
        {project.name}
      </h1>

      <p className="text-muted-foreground leading-relaxed">
        {project.description}
      </p>

      <div className="flex gap-4">

        <Button asChild>
          <Link href={project.url}>
            View Source
          </Link>
        </Button>

        {project.live && (
          <span className="text-green-500 font-medium">
            ● Live Project
          </span>
        )}

      </div>

    </div>
  )
}