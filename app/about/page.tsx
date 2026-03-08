"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">

      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-8">

        <Button asChild variant="outline">
          <Link href="/">
            ← Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold">
          About Me
        </h1>

        <p className="text-muted-foreground leading-relaxed">
          Hi, Im Kaushik — a developer who enjoys building systems,
          exploring new technologies, and solving problems through code.
        </p>

      </section>

      {/* ABOUT CONTENT */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-10">

        <Card>
          <CardHeader>
            <CardTitle>My Journey</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              I am currently studying Information Technology and enjoy
              developing modern web applications, experimenting with
              machine learning, and exploring new tools that improve
              productivity and performance.
            </p>

            <p>
              My projects range from AI chatbots and machine learning
              models to full-stack web applications built with modern
              frameworks.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What I Like Building</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground">
            <p>• Full-stack web applications</p>
            <p>• Machine learning projects</p>
            <p>• Network tools and automation</p>
            <p>• Clean and scalable software systems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies I Use</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-muted-foreground">
            <p>• React / Next.js</p>
            <p>• Node.js</p>
            <p>• Python</p>
            <p>• Machine Learning (TensorFlow / Scikit-learn)</p>
            <p>• TailwindCSS</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Outside of Coding</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              When Im not coding, I enjoy exploring new technologies,
              learning about system design, and refining my skills
              through personal projects.
            </p>
          </CardContent>
        </Card>

      </section>

    </div>
  )
}