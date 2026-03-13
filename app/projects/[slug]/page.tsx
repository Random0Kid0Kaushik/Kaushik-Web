export const dynamic = "force-dynamic"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, getProjectSlugs, Project } from "@/lib/projects"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

// Generate static pages
export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {

  const { slug } = await params
  const project: Project | null = getProjectBySlug(slug)

  if (!project) return <div>Project not found</div>

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r px-6 py-20">
        <h2 className="font-semibold mb-6">Project Sections</h2>
        <nav className="flex flex-col gap-3">
          <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition">Overview</a>
          <a href="#tech-stack" className="text-sm text-muted-foreground hover:text-foreground transition">Tech Stack</a>
          <a href="#architecture" className="text-sm text-muted-foreground hover:text-foreground transition">Architecture</a>
          <a href="#details" className="text-sm text-muted-foreground hover:text-foreground transition">Details</a>
        </nav>
      </aside>

      <main className="flex-1 max-w-4xl mx-auto px-10 py-20 space-y-8">
        <Button asChild variant="outline">
          <Link href="/projects">← Back to Projects</Link>
        </Button>

        <h1 className="text-4xl font-bold">{project.name}</h1>
        <p className="text-muted-foreground">{project.description}</p>

        {project.live && (
          <span className="text-green-500 font-medium">● Live Project</span>
        )}

        {!project.live && project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm font-medium hover:underline"
          >
            Visit Project
          </a>
        )}

        {/* Overview */}
        <section id="overview">
          <h2 className="text-2xl font-semibold mt-10 mb-4">Overview</h2>
          <p className="text-muted-foreground">
            {project.overview || "Overview coming soon."}
          </p>
        </section>

        {/* Tech Stack */}
        <section id="tech-stack">
          <h2 className="text-2xl font-semibold mt-10 mb-4">Tech Stack</h2>

          {project.techStack ? (
            <ul className="list-disc pl-6 text-muted-foreground">
              {project.techStack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Tech stack information coming soon.
            </p>
          )}
        </section>

        {/* Architecture */}
        <section id="architecture">
          <h2 className="text-2xl font-semibold mt-10 mb-4">Architecture</h2>
          <p className="text-muted-foreground">
            {project.architecture || "Architecture details coming soon."}
          </p>
        </section>

        {/* Details */}
        <section id="details">
          <h2 className="text-2xl font-semibold mt-10 mb-4">Details</h2>
          <p className="text-muted-foreground">
            {project.details || "Additional details coming soon."}
          </p>
        </section>
      </main>
    </div>
  )
}