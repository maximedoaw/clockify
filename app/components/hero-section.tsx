"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users } from "lucide-react"
import { IconCarousel } from "./icon-carousel"
import { defaultCarouselItems } from "@/constant"
import { usePathname } from "next/navigation"
import Link from "next/link"

const companyLogos = [
  "Hewlett Packard Enterprise",
  "Verizon",
  "Siemens",
  "Cisco",
  "Fujifilm",
  "Nestlé",
  "UCLA",
  "Douglas",
  "Paysafe",
]


export function HeroSection({title="", subtitle=""} : {title: string, subtitle: string}) {
  const pathname = usePathname()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h3 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h3>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {subtitle}
          </p>

          {/* Rating */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />
            </div>
            <span className="text-sm font-medium">4.8</span>
            <span className="text-sm text-muted-foreground">(9,073 reviews)</span>
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/time-sheet">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              START TRACKING TIME — {"IT'S FREE!"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
          </div>
          {pathname === "/" && <IconCarousel items={defaultCarouselItems} />}
          {/* Social Proof */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-blue-500">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">148,882 people signed up last month</span>
          </div>

          {/* Company Logos */}
          <div className="mt-16">
            <p className="text-sm font-medium text-muted-foreground mb-8">Trusted by teams at</p>
            <div className="grid grid-cols-3 gap-8 items-center justify-items-center opacity-60 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9">
              {companyLogos.map((company, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-12 px-4 text-xs font-medium text-muted-foreground bg-muted/30 rounded-lg border"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 opacity-30" />
        </div>
      </div>
    </section>
  )
}
