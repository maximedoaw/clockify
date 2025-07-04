import { Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const footerLinks = {
  product: [
    { name: "Overview", href: "#" },
    { name: "Apps", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "Reviews", href: "#" },
    { name: "Changelog", href: "#" },
    { name: "API", href: "#" },
  ],
  plans: [
    { name: "Free", href: "#" },
    { name: "Basic", href: "#" },
    { name: "Standard", href: "#" },
    { name: "Pro", href: "#" },
    { name: "Enterprise", href: "#" },
    { name: "See pricing", href: "#", hasArrow: true },
  ],
  useCases: [
    { name: "Timekeeping", href: "#" },
    { name: "Planning", href: "#" },
    { name: "Attendance", href: "#" },
    { name: "Reporting", href: "#" },
  ],
  features: [
    { name: "Timer", href: "#" },
    { name: "Timesheet", href: "#" },
    { name: "Kiosk", href: "#" },
    { name: "Calendar", href: "#" },
    { name: "Auto tracker", href: "#" },
    { name: "Rates", href: "#" },
    { name: "Projects", href: "#" },
    { name: "Activity", href: "#" },
    { name: "Location", href: "#" },
    { name: "Scheduling", href: "#" },
    { name: "Time off", href: "#" },
    { name: "Approval", href: "#" },
    { name: "Team", href: "#" },
    { name: "Expenses", href: "#" },
    { name: "Invoicing", href: "#" },
    { name: "All features", href: "#", hasArrow: true },
  ],
  resources: [
    { name: "Knowledge hub", href: "#" },
    { name: "Clockify guides", href: "#" },
    { name: "Time management", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Blog", href: "#" },
  ],
  industries: [
    { name: "Freelancers", href: "#" },
    { name: "Agencies", href: "#" },
    { name: "Startups", href: "#" },
    { name: "Developers", href: "#" },
    { name: "Consultants", href: "#" },
    { name: "Accountants", href: "#" },
    { name: "More industries", href: "#", hasArrow: true },
  ],
  calculators: [
    { name: "Time card calculator", href: "#" },
    { name: "Hourly rate calculator", href: "#" },
    { name: "Overtime pay calculator", href: "#" },
    { name: "Labor pricing calculator", href: "#" },
  ],
  support: [
    { name: "Help center", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Feedback", href: "#" },
    { name: "System status", href: "#" },
    { name: "Forum", href: "#" },
    { name: "support@clockify.me", href: "mailto:support@clockify.me" },
    { name: "+1-855-738-8741", href: "tel:+18557388741" },
  ],
}

const downloadApps = [
  { name: "App Store", href: "#", icon: "/placeholder.svg?height=40&width=120" },
  { name: "Google Play", href: "#", icon: "/placeholder.svg?height=40&width=120" },
  { name: "Mac App Store", href: "#", icon: "/placeholder.svg?height=40&width=120" },
  { name: "Windows", href: "#", icon: "/placeholder.svg?height=40&width=120" },
  { name: "Linux", href: "#", icon: "/placeholder.svg?height=40&width=120" },
  { name: "Chrome Web Store", href: "#", icon: "/placeholder.svg?height=40&width=120" },
]

function FooterSection({ title, links }: { title: string; links: typeof footerLinks.product }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
            >
              {link.name}
              {("hasArrow" in link && link.hasArrow) ? <ArrowRight className="ml-1 h-3 w-3" /> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Section - Logo and CTA */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold">clockify</span>
                <span className="text-xs text-muted-foreground">BY CAKE.COM</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              The world's leading time tracker and timesheet software for teams
            </p>

            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Book a demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Log in
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sign up
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-9 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <FooterSection title="Product" links={footerLinks.product} />
            <FooterSection title="Plans" links={footerLinks.plans} />
            <FooterSection title="Use cases" links={footerLinks.useCases} />
            <FooterSection title="Features" links={footerLinks.features} />
            <FooterSection title="Resources" links={footerLinks.resources} />
            <FooterSection title="Industries" links={footerLinks.industries} />
            <FooterSection title="Calculators" links={footerLinks.calculators} />
            <FooterSection title="Support" links={footerLinks.support} />
          </div>
        </div>

        {/* Download Apps Section */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="font-semibold text-foreground mb-6">Download apps</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {downloadApps.map((app) => (
              <a
                key={app.name}
                href={app.href}
                className="flex items-center justify-center p-2 border rounded-lg hover:bg-muted transition-colors"
              >
                <img
                  src={app.icon || "/placeholder.svg"}
                  alt={`Download ${app.name}`}
                  className="h-8 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
