import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/ui/sidebar"
import { getProjectBySlug } from "@/lib/projects"
import { remark } from "remark"
import html from "remark-html"

export default async function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {

  let project

  try {
    project = getProjectBySlug(params.slug)
  } catch {
    return notFound()
  }

  const processedContent = await remark()
    .use(html)
    .process(project.content)

  const contentHtml = processedContent.toString()

  const sections = [
    { title: "Overview", id: "overview" },
    { title: "Tech Stack", id: "tech-stack" },
    { title: "Screenshots", id: "screenshots" },
    { title: "Architecture", id: "architecture" },
    { title: "Details", id: "details" },
  ]

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r px-6 py-20">

        <h2 className="font-semibold mb-6">
          Project Sections
        </h2>

        <nav className="flex flex-col gap-3">

          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition"
            >
              {section.title}
            </a>
          ))}

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-10 py-20 space-y-8">

        <Button asChild variant="outline">
          <Link href="/projects">
            ← Back to Projects
          </Link>
        </Button>

        <h1 className="text-4xl font-bold">
          {project.frontmatter.title}
        </h1>

        <p className="text-muted-foreground">
          {project.frontmatter.description}
        </p>

        <div className="flex gap-4">

          {project.frontmatter.github && (
            <Button asChild>
              <Link href={project.frontmatter.github}>
                View Source
              </Link>
            </Button>
          )}

          {project.frontmatter.live && (
            <span className="text-green-500 font-medium">
              ● Live Project
            </span>
          )}

        </div>

        <article
          className="prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

      </main>

    </div>
  )
}