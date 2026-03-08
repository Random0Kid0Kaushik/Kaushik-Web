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
  description: string
  url: string
  live: boolean
}

async function getProjects(): Promise<Projects[]> {
  const res = await fetch("/api/projects")

  if (!res.ok) {
    throw new Error("Failed to fetch projects")
  }

  return res.json()
}

export default function HomePage() {
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
    <div className="bg-background text-foreground transition-colors duration-500">

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Hello! I am Kaushik!
            </h1>

            <h3 className="text-xl md:text-2xl font-medium text-muted-foreground">
              I love developing and testing websites
            </h3>

            <Button asChild size="lg">
              <Link href="#projects">
                View My Work
              </Link>
            </Button>
          </div>

          <div className="w-full h-64 md:h-80 bg-muted flex items-center justify-center rounded-lg border border-dashed">
            [Animation goes here]
          </div>

        </div>
      </section>

      {/* ABOUT ME */}
      <section id="about" className="py-32 px-6 max-w-4xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className="text-muted-foreground leading-relaxed">
          I am a passionate developer who enjoys building clean, scalable web applications.
          I enjoy solving problems, testing systems, and continuously improving my craft.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold">Projects</h2>

        {loading && (
          <p className="text-muted-foreground">Loading projects...</p>
        )}

        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
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
                    <Link href={project.url}>
                      View More
                    </Link>
                  </Button>

                  {project.live && (
                    <span className="text-green-500 text-sm font-medium">
                      Live
                    </span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* RESUME */}
      <section id="resume" className="py-32 px-6 max-w-4xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl font-bold">Resume</h2>
        <Button size="lg">
          Download Resume
        </Button>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 max-w-4xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="text-muted-foreground">
          Let’s build something meaningful together.
        </p>
      </section>

    </div>
  )
}