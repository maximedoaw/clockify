"use client"

import { Star } from "lucide-react"

export interface Testimonial {
  id: string
  title: string
  content: string
  author: string
  role: string
  rating?: number
}

interface TestimonialsSectionProps {
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  columns?: 2 | 3 | 4
  showRating?: boolean
  className?: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    title: "Trackers don't get much better",
    content: "I track my time for all the tasks I perform; work-related and other.",
    author: "Ivan Arsenov",
    role: "Recruitment Manager",
    rating: 5,
  },
  {
    id: "2",
    title: "Very useful and intuitive",
    content: "Extremely comfortable. Ads free. Amazing in terms of customer support.",
    author: "Ivan Napolskykh",
    role: "Software Engineer",
    rating: 5,
  },
  {
    id: "3",
    title: "Best time-tracking tool",
    content: "Easy to use with detailed reporting and analytics allowing users to track their time spent.",
    author: "Joshua O.",
    role: "Infrastructure Engineer",
    rating: 5,
  },
  {
    id: "4",
    title: "A game-changer for remote work",
    content: "I can track on my phone - a few taps and I'm ready to get onto my work.",
    author: "Kerri MacKay",
    role: "Coordinator",
    rating: 5,
  },
  {
    id: "5",
    title: "One of the best values available online",
    content: "Really good. Overall, this is a TREMENDOUS value for the price.",
    author: "Patrick Carver",
    role: "Entrepreneur",
    rating: 5,
  },
  {
    id: "6",
    title: "Best time tracker",
    content:
      "Clockify is the easiest to use time tracking tool and has given me the most beneficial time tracking experience.",
    author: "Luis Miguel Rivas Zepeda",
    role: "Software Engineer",
    rating: 5,
  },
  {
    id: "7",
    title: "Seamless time tracking",
    content: "Clockify is so easy to use and intuitive. The learning curve is almost none.",
    author: "Sheila Zayas",
    role: "Graphic Design",
    rating: 5,
  },
  {
    id: "8",
    title: "Clockify is scary good!",
    content: "It is a powerful and often frightening insight into your own behavior.",
    author: "Skyler Bird",
    role: "Web Designer",
    rating: 5,
  },
  {
    id: "9",
    title: "Love Clockify! Super recommend!",
    content: "Amazing! Would 100% recommend to anyone! Absolutely great!",
    author: "Priscilla C.",
    role: "Executive Assistant",
    rating: 5,
  },
  {
    id: "10",
    title: "May be the best time tracker there is!",
    content: "Clockify has been an essential tool for our team to track time on a daily basis.",
    author: "Camille Ang",
    role: "Entrepreneur",
    rating: 5,
  },
  {
    id: "11",
    title: "Works great for startups",
    content: "We grew from a couple people to almost 80 and it worked perfectly the whole time!",
    author: "Zachary Gaskill",
    role: "Sales Manager",
    rating: 5,
  },
  {
    id: "12",
    title: "Fantastic",
    content: "Makes it incredibly easy to record time and attach pdf reports to invoices.",
    author: "David Jackson",
    role: "Consultant",
    rating: 5,
  },
]

function TestimonialCard({ testimonial, showRating = true }: { testimonial: Testimonial ; showRating?: boolean }) {
  return (
    <div className="bg-background rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Rating Stars */}
      {showRating && (
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-blue-500 text-blue-500" />
          ))}
        </div>
      )}

      {/* Testimonial Title */}
      <h3 className="text-lg font-bold text-foreground mb-3 leading-tight">{testimonial.title}</h3>

      {/* Testimonial Content */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{testimonial.content}</p>

      {/* Author Info */}
      <div className="mt-auto">
        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
        <p className="text-muted-foreground text-xs">{testimonial.role}</p>
      </div>
    </div>
  )
}

export function TestimonialsSection({
  title,
  subtitle,
  testimonials = defaultTestimonials,
  columns = 4,
  showRating = true,
  className = "",
}: TestimonialsSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  return (
    <section className={`py-20 bg-muted/30 ${className}`}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && (
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-4">
                  {title}
                </h2>
              )}
              {subtitle && <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
            </div>
          )}

          {/* Testimonials Grid */}
          <div className={`grid gap-6 sm:grid-cols-1 ${gridCols[columns]}`}>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} showRating={showRating} />
            ))}
          </div>

          {/* Optional CTA or Link */}
          <div className="text-center mt-12">
            <a
              href="https://clockify.me/customers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors"
            >
              View more customer stories →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
