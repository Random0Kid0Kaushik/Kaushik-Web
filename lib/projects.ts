// lib/projects.ts
import projectsData from "@/_data/db.json"

export interface Project {
  id: number
  name: string
  slug: string
  description: string
  url: string
  live: boolean

  tech?: string[]

  overview?: string
  techStack?: string[]
  architecture?: string
  details?: string
}

// Return all projects
export function getAllProjects(): Project[] {
  return projectsData.projects
}

// Return single project by slug
export function getProjectBySlug(slug: string): Project | null {
  return projectsData.projects.find((p) => p.slug === slug) || null
}

// Return all slugs
export function getProjectSlugs(): string[] {
  return projectsData.projects.map((p) => p.slug)
}