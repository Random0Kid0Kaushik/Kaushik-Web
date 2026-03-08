"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">

        <Button asChild variant="outline">
          <Link href="/">
            ← Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold">
          Resume
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          A snapshot of my skills, education, and projects.
        </p>

        <div className="border rounded-lg p-10 bg-muted flex flex-col items-center justify-center gap-6">

          <p className="text-muted-foreground">
            Download my latest resume below.
          </p>

          <Button asChild size="lg">
            <a href="/resume.pdf" download>
              Download Resume
            </a>
          </Button>

        </div>

      </section>

    </div>
  )
}