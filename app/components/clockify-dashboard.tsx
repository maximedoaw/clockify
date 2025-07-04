"use client"

import Image from "next/image"

interface DashboardSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
}

export function ClockifySection({
  title,
  description,
  imageSrc,
  imageAlt = "Dashboard preview",
}: DashboardSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{description}</p>
          </div>

          {/* Dashboard Image */}
          <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
            <div className="aspect-video w-full">
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
