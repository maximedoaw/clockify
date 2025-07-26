"use client"

import { useState } from "react"
import { Clock, DollarSign, Calendar, Users, BarChart3, CreditCard, ArrowRight } from "lucide-react"
import { IconCarousel, type CarouselItem } from "./icon-carousel"
import { Button } from "@/components/ui/button"
import { defaultCarouselItems, defaultContentItems, WhyClockifySectionProps } from "@/constant"



export function WhyClockifySection({
  title = "Why track time with Clockify",
  carouselItems = defaultCarouselItems,
  contentItems = defaultContentItems,
  defaultActiveItem,
  className = "",
}: WhyClockifySectionProps) {
  const [activeItem, setActiveItem] = useState(defaultActiveItem || carouselItems[0]?.id || "")

  const currentContent = contentItems.find((item) => item.id === activeItem) || contentItems[0]

  return (
    <section className={`py-20 bg-green-50 ${className}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">{title}</h2>
          </div>

          {/* Icon Carousel */}
          <div className="mb-16">
            <IconCarousel items={carouselItems} activeItem={activeItem} onItemClick={setActiveItem} />
          </div>

          {/* Content Area */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Side - Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl">
                <div className="aspect-[4/3] w-full">
                  <img
                    src={currentContent?.image || "/placeholder.svg"}
                    alt={`${currentContent?.title || "Feature"} interface preview`}
                    className="h-full w-full object-cover object-center transition-all duration-500 ease-in-out"
                  />
                </div>

                {/* Timer Interface Overlay (for timekeeping) */}
                {activeItem === "timekeeping" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Circular Progress */}
                      <div className="h-48 w-48 rounded-full bg-blue-200/30">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-blue-300"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray="283"
                            strokeDashoffset="200"
                            className="text-blue-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-light text-muted-foreground">Total</span>
              
                        </div>
                      </div>

                      {/* Timer Card */}
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 min-w-[280px]">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm">Fixing bug</span>
                            <span className="text-pink-500">•</span>
                            <span className="text-pink-500 text-sm">Project X</span>
                            <span className="text-blue-500 text-lg font-semibold">$</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-xl font-mono">03:30</span>
                            <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white px-4">
                              STOP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">{currentContent?.title}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">{currentContent?.description}</p>
              {currentContent?.learnMoreUrl && (
                <Button variant="link" className="p-0 h-auto text-blue-500 hover:text-blue-600">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* More use cases */}
          <div className="text-center mt-16">
            <Button variant="link" className="text-muted-foreground hover:text-foreground">
              More use cases
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
