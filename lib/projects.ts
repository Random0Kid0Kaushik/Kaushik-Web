import fs from "fs"
import path from "path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export interface ProjectFrontmatter {
  id: number
  title: string
  description: string
  github?: string
  demo?: string
  tech?: string[]
  live: boolean
  url: string
}

export interface Project extends ProjectFrontmatter {
  slug: string
}

export function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

export function getProjectBySlug(slug: string): {
  slug: string
  frontmatter: ProjectFrontmatter
  content: string
} {
  const realSlug = slug.replace(/\.md$/, "")
  const fullPath = path.join(projectsDirectory, `${realSlug}.md`)

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    frontmatter: data as ProjectFrontmatter,
    content,
  }
}

export function getAllProjects(): Project[] {
  const slugs = getProjectSlugs()

  return slugs.map((slug) => {
    const { frontmatter } = getProjectBySlug(slug)

    return {
      slug: slug.replace(".md", ""),
      ...frontmatter,
    }
  })
}