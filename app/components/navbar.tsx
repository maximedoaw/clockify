"use client"

import type * as React from "react"
import { useState } from "react"
import {
  Clock,
  Menu,
  Timer,
  FileSpreadsheet,
  Monitor,
  Calendar,
  Zap,
  BarChart3,
  Percent,
  FolderOpen,
  Activity,
  MapPin,
  CalendarClock,
  UserX,
  CheckCircle,
  Receipt,
  CreditCard,
  Users,
  Building,
  Briefcase,
  Code,
  Scale,
  Hammer,
  Rocket,
  ArrowRight,
  ComputerIcon as Windows,
  Apple,
  Chrome,
  ChromeIcon as Firefox,
  Smartphone,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

// Product dropdown data
const productSections = {
  useCases: [
    { name: "Timekeeping", description: "Track time using a timer, timesheet, or kiosk.", icon: Timer, href: "/timekeeper-software" },
    { name: "Planning", description: "Manage resources, capacity, and utilization.", icon: Calendar, href: "/employee-scheduling-software" },
    { name: "Attendance", description: "Track daily employee attendance and overtime.", icon: Users, href: "/attendance-tracker" },
    { name: "Reporting", description: "See where time goes and analyze costs.", icon: BarChart3, href: "/time-reporting" },
    { name: "Budgeting", description: "Set client budgets and track project status.", icon: CreditCard, href: "/project-time-tracker" },
    { name: "Payroll", description: "Calculate payroll and employee costs.", icon: Receipt, href: "/payroll-hours-tracker" },
  ],
  industries: [
    { name: "Freelancers", icon: Users, href: "/freelance-time-tracking" },
    { name: "Developers", icon: Code, href: "/developer-time-tracking" },
    { name: "Agencies", icon: Building, href: "/agency-management-software" },
    { name: "Consultants", icon: Briefcase, href: "/consultant-time-tracking" },
    { name: "Lawyers", icon: Scale, href: "/attorney-time-tracking" },
    { name: "Accountants", icon: Receipt, href: "/time-tracking-accounting" },
    { name: "Startups", icon: Rocket, href: "/startups-time-tracking" },
    { name: "Construction", icon: Hammer, href: "/construction-time-tracking" },
  ],
  plans: [
    { name: "FREE", description: "Time Tracking", color: "text-blue-500", href: "/pricing#compare" },
    { name: "PRO", description: "Profit & Productivity", color: "text-red-500", href: "/pro-plan" },
    { name: "ENTERPRISE", description: "Security & Privacy", color: "text-purple-500", href: "/enterprise-plan" },
  ],
}

// Features dropdown data
const featuresSections = {
  timekeeping: [
    { name: "Timer", icon: Timer, href: "#" },
    { name: "Timesheet", icon: FileSpreadsheet, href: "#" },
    { name: "Kiosk", icon: Monitor, href: "#" },
    { name: "Calendar", icon: Calendar, href: "#" },
    { name: "Auto tracker", icon: Zap, href: "#" },
  ],
  reporting: [
    { name: "Reports", icon: BarChart3, href: "#" },
    { name: "Rates", icon: Percent, href: "#" },
    { name: "Projects", icon: FolderOpen, href: "#" },
    { name: "Activity", icon: Activity, href: "#" },
    { name: "Location", icon: MapPin, href: "#" },
  ],
  management: [
    { name: "Scheduling", icon: CalendarClock, href: "#" },
    { name: "Time off", icon: UserX, href: "#" },
    { name: "Approval", icon: CheckCircle, href: "#" },
    { name: "Expenses", icon: Receipt, href: "#" },
    { name: "Invoicing", icon: CreditCard, href: "#" },
  ],
}

// Download dropdown data
const downloadSections = {
  desktop: [
    { name: "Windows", icon: Windows, href: "#" },
    { name: "Mac", icon: Apple, href: "#" },
    { name: "Linux", icon: Monitor, href: "#" },
  ],
  web: [
    { name: "Chrome", icon: Chrome, href: "#" },
    { name: "Firefox", icon: Firefox, href: "#" },
    { name: "Edge", icon: Monitor, href: "#" },
  ],
  mobile: [
    { name: "Android", icon: Smartphone, href: "#" },
    { name: "iOS", icon: Apple, href: "#" },
  ],
  otherProducts: [
    { name: "Plaky", description: "Project Management", color: "text-blue-500", href: "#" },
    { name: "Pumble", description: "Team Communication", color: "text-purple-500", href: "#" },
  ],
}

function ProductDropdown() {
  return (
    <div className="grid gap-6 p-6 w-[800px] lg:w-[900px] xl:w-[1000px]">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Use Cases */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">USE CASES</h3>
          <div className="space-y-3">
            {productSections.useCases.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-start space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{item.description}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Industries */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">INDUSTRIES</h3>
          <div className="grid grid-cols-2 gap-2">
            {productSections.industries.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
          <a href="#" className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 mt-3">
            <span>More industries</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Plans */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">PLANS</h3>
          <div className="space-y-3">
            {productSections.plans.map((plan) => (
              <a key={plan.name} href={plan.href} className="block rounded-lg p-3 hover:bg-muted transition-colors">
                <div className={`font-semibold ${plan.color}`}>{plan.name}</div>
                <div className="text-sm text-muted-foreground">{plan.description}</div>
              </a>
            ))}
            <a href="#" className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 mt-3">
              <span>See pricing</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturesDropdown() {
  return (
    <div className="grid gap-6 p-6 w-[800px] lg:w-[900px] xl:w-[1000px]">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Timekeeping */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">TIMEKEEPING</h3>
          <div className="space-y-2">
            {featuresSections.timekeeping.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Reporting */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">REPORTING</h3>
          <div className="space-y-2">
            {featuresSections.reporting.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Management */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">MANAGEMENT</h3>
          <div className="space-y-2">
            {featuresSections.management.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
          <a href="#" className="flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 mt-3">
            <span>See all features</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {/* Watch Demo */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">WATCH DEMO</h3>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-2">CLOCKIFY</div>
              <div className="text-2xl font-bold text-blue-500 mb-4">TOUR</div>
              <div className="flex justify-center space-x-2 mb-4">
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
                <div className="w-8 h-12 bg-gray-200 rounded"></div>
              </div>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                <Play className="h-3 w-3 mr-1" />
                Watch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DownloadDropdown() {
  return (
    <div className="grid gap-6 p-6 w-[800px] lg:w-[900px] xl:w-[1000px]">
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Desktop */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">DESKTOP</h3>
          <div className="space-y-2">
            {downloadSections.desktop.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Web */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">WEB</h3>
          <div className="space-y-2">
            {downloadSections.web.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Mobile */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">MOBILE</h3>
          <div className="space-y-2">
            {downloadSections.mobile.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg p-2 hover:bg-muted transition-colors"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.name}</span>
                </a>
              )
            })}
          </div>
        </div>

        {/* Watch Tutorial + Other Products */}
        <div className="space-y-6">
          {/* Watch Tutorial */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              WATCH TUTORIAL
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-500 mb-1">Time</div>
                <div className="text-lg font-bold text-blue-500 mb-1">Tracking</div>
                <div className="text-lg font-bold text-blue-500 mb-3">Apps</div>
                <div className="flex justify-center space-x-1 mb-3">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-6 h-8 bg-gray-200 rounded"></div>
                </div>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  <Play className="h-3 w-3 mr-1" />
                  Watch
                </Button>
              </div>
            </div>
          </div>

          {/* Other Products */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              OUR OTHER PRODUCTS
            </h3>
            <div className="space-y-3">
              {downloadSections.otherProducts.map((product) => (
                <a
                  key={product.name}
                  href={product.href}
                  className="block rounded-lg p-3 hover:bg-muted transition-colors"
                >
                  <div className={`font-semibold ${product.color}`}>{product.name}</div>
                  <div className="text-sm text-muted-foreground">{product.description}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileNavItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b">
      <button
        className="flex w-full items-center justify-between py-4 text-left font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ArrowRight className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  )
}

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <Link href="/">
              <span className="text-xl font-bold">clockify</span>
              <span className="text-xs text-muted-foreground hidden sm:block">BY CAKE.COM</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ProductDropdown />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <FeaturesDropdown />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Download</NavigationMenuTrigger>
              <NavigationMenuContent>
                <DownloadDropdown />
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
                <Link href="/time-tracker">
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link href="/time-tracker">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Sign up free</Button>
                </Link>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span>clockify</span>
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <MobileNavItem title="Product">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Use Cases</h4>
                    <div className="space-y-1">
                      {productSections.useCases.map((item) => (
                        <a key={item.name} href={item.href} className="block p-2 text-sm hover:bg-muted rounded">
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Plans</h4>
                    <div className="space-y-1">
                      {productSections.plans.map((plan) => (
                        <a key={plan.name} href={plan.href} className="block p-2 text-sm hover:bg-muted rounded">
                          {plan.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </MobileNavItem>

              <MobileNavItem title="Features">
                <div className="space-y-4">
                  {Object.entries(featuresSections).map(([section, items]) => (
                    <div key={section}>
                      <h4 className="font-medium mb-2 capitalize">{section}</h4>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <a key={item.name} href={item.href} className="block p-2 text-sm hover:bg-muted rounded">
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </MobileNavItem>

              <MobileNavItem title="Download">
                <div className="space-y-4">
                  {Object.entries(downloadSections)
                    .slice(0, 3)
                    .map(([section, items]) => (
                      <div key={section}>
                        <h4 className="font-medium mb-2 capitalize">{section}</h4>
                        <div className="space-y-1">
                          {items.map((item) => (
                            <a key={item.name} href={item.href} className="block p-2 text-sm hover:bg-muted rounded">
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </MobileNavItem>

              <div className="border-t pt-4 space-y-3">
                <Link href="/time-tracker">
                  <Button variant="ghost" className="w-full justify-start">
                    Log in
                  </Button>
                </Link>
                <Link href="/time-tracker">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Sign up free</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
