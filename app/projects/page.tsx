"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

interface Projects {
  id: number
  name: string
  slug: string
  description: string
  url: string
  live: boolean
}

async function getProjects(): Promise<Projects[]> {
  const res = await fetch("http://localhost:4000/projects")

  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }

  return res.json()
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        setError("Unable to load projects.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">

      {/* HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          My Projects
        </h1>

        <p className="text-muted-foreground max-w-2xl">
          A collection of things I have built, broken, rebuilt,
          and occasionally been proud of.
        </p>

        <Button asChild variant="outline">
          <Link href="/">
            Back to Home
          </Link>
        </Button>
      </section>

      {/* PROJECT GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-24">

        {loading && (
          <p className="text-muted-foreground">Loading projects...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >

                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground">
                    {project.description}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center">

                  <Button asChild size="sm">
                    <Link href={`/projects/${project.slug}`}>
                      Learn More
                    </Link>
                  </Button>

                  {project.live && (
                    <span className="text-green-500 text-sm font-medium">
                      ● Live
                    </span>
                  )}

                </CardFooter>

              </Card>
            ))}

          </div>
        )}
      </section>

    </div>
  )
}