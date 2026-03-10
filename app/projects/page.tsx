import Link from "next/link"
import { getAllProjects } from "@/lib/projects"

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
  slug: string
  url: string
  live: boolean
}

export default function ProjectsPage() {

  const projects: Projects[] = getAllProjects()

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project) => (
            <Card
              key={project.slug}
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
                    Documentation
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

      </section>

    </div>
  )
}