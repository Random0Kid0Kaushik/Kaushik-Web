// app/projects/[slug]/page.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, getProjectSlugs, Project } from "@/lib/projects"

interface ProjectPageProps {
  params: { slug: string }
}

// Generate static pages
export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project: Project | null = getProjectBySlug(params.slug)

  if (!project) return <div>Project not found</div>

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r px-6 py-20">
        <h2 className="font-semibold mb-6">Project Sections</h2>
        <nav className="flex flex-col gap-3">
          <a href="#overview" className="text-sm text-muted-foreground hover:text-foreground transition">Overview</a>
          <a href="#tech-stack" className="text-sm text-muted-foreground hover:text-foreground transition">Tech Stack</a>
          <a href="#screenshots" className="text-sm text-muted-foreground hover:text-foreground transition">Screenshots</a>
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

        {project.live && <span className="text-green-500 font-medium">● Live Project</span>}
        {!project.live && project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm font-medium hover:underline">
            Visit Project
          </a>
        )}

        {/* Placeholder content */}
        <div className="mt-6 prose dark:prose-invert">
          <p>More project details can go here.</p>
        </div>
      </main>
    </div>
  )
}