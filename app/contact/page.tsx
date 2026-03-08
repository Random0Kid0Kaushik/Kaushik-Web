"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert("Message sent! (You can connect this to email later)")
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">

      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">

        <Button asChild variant="outline">
          <Link href="/">
            ← Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-bold">
          Contact Me
        </h1>

        <p className="text-muted-foreground">
          Have a project idea, collaboration, or opportunity?  
          Send a message and let’s talk.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <Input placeholder="Your Name" required />

          <Input
            type="email"
            placeholder="Your Email"
            required
          />

          <Textarea
            placeholder="Your Message..."
            rows={6}
            required
          />

          <Button type="submit" size="lg">
            Send Message
          </Button>

        </form>

      </section>

    </div>
  )
}