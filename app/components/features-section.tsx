"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Clock, FileSpreadsheet, Calendar, Zap, Monitor, BarChart3, Users, Settings } from "lucide-react"

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  image: string
}

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
  sectionTitle?: string
  features: Feature[]
  featuresPosition?: "left" | "right"
  imagePosition?: "left" | "right"
  defaultActiveFeature?: string
  className?: string
}

const icons = {
  Clock,
  FileSpreadsheet,
  Calendar,
  Zap,
  Monitor,
  BarChart3,
  Users,
  Settings,
}

export function FeaturesSection({
  title = "",
  subtitle = "",
  sectionTitle = "Features",
  features,
  featuresPosition = "left",
  imagePosition = "right",
  defaultActiveFeature,
  className = "",
}: FeaturesSectionProps) {
  const [activeFeature, setActiveFeature] = useState<string>(defaultActiveFeature || features[0]?.id || "")

  const currentFeature = features.find((feature) => feature.id === activeFeature) || features[0]

  if (!features || features.length === 0) {
    return null
  }

  // Determine the layout based on positions
  const isImageLeft = imagePosition === "left"
  const isFeaturesLeft = featuresPosition === "left"

  // If both are on the same side, default to standard layout
  const shouldReverseLayout = isImageLeft && isFeaturesLeft ? false : isImageLeft

  const FeaturesList = () => (
    <div className="space-y-8">
      <h3 className="text-2xl font-bold text-foreground">{sectionTitle}</h3>

      <div className="space-y-4">
        {features.map((feature) => {
          const Icon = icons[feature.icon as keyof typeof icons]
          const isActive = activeFeature === feature.id

          return (
            <div
              key={feature.id}
              className={`group cursor-pointer rounded-lg border p-4 transition-all duration-300 hover:shadow-md ${
                isActive
                  ? "border-blue-200 bg-blue-50/50 shadow-sm"
                  : "border-border bg-background hover:border-blue-100 hover:bg-muted/30"
              }`}
              onMouseEnter={() => setActiveFeature(feature.id)}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-blue-100 group-hover:text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className={`text-lg font-semibold transition-colors ${
                      isActive ? "text-blue-700" : "text-foreground group-hover:text-blue-600"
                    }`}
                  >
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const ImagePreview = () => (
    <div className="relative">
      <div className="sticky top-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl">
          <div className="aspect-[4/3] w-full">
            <Image
              src={currentFeature?.image || "/placeholder.svg"}
              alt={`${currentFeature?.title || "Feature"} interface preview`}
              fill
              className="object-cover object-center transition-all duration-500 ease-in-out"
              priority
            />
          </div>

          {/* Overlay with feature info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <div className="text-white">
              <h4 className="text-xl font-semibold mb-2">{currentFeature?.title}</h4>
              <p className="text-sm opacity-90">{currentFeature?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section className={`py-20 bg-background ${className}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">{title}</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
          </div>

          {/* Features Content */}
          <div
            className={`grid gap-12 lg:grid-cols-2 lg:gap-16 ${shouldReverseLayout ? "lg:grid-flow-col-dense" : ""}`}
          >
            {/* Features List */}
            <div className={shouldReverseLayout ? "lg:col-start-2" : ""}>
              <FeaturesList />
            </div>

            {/* Image Preview */}
            <div className={shouldReverseLayout ? "lg:col-start-1" : ""}>
              <ImagePreview />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
