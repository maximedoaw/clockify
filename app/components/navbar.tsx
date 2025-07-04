"use client"

import * as React from "react"
import { ChevronDown, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const productItems = [
  {
    title: "Time Tracking",
    description: "Track time across projects and teams",
    href: "#",
  },
  {
    title: "Project Management",
    description: "Organize and manage your projects",
    href: "#",
  },
  {
    title: "Team Management",
    description: "Manage your team and permissions",
    href: "#",
  },
  {
    title: "Reporting",
    description: "Generate detailed time reports",
    href: "#",
  },
]

const featureItems = [
  {
    title: "Time Tracker",
    description: "Track time with one click",
    href: "#",
  },
  {
    title: "Timesheet",
    description: "Fill out weekly timesheets",
    href: "#",
  },
  {
    title: "Dashboard",
    description: "Visual overview of your time",
    href: "#",
  },
  {
    title: "Calendar",
    description: "Schedule and track time",
    href: "#",
  },
  {
    title: "Invoicing",
    description: "Create invoices from tracked time",
    href: "#",
  },
  {
    title: "Expenses",
    description: "Track project expenses",
    href: "#",
  },
]

const downloadItems = [
  {
    title: "Desktop Apps",
    description: "Windows, Mac, Linux",
    href: "#",
  },
  {
    title: "Mobile Apps",
    description: "iOS and Android",
    href: "#",
  },
  {
    title: "Browser Extensions",
    description: "Chrome, Firefox, Edge",
    href: "#",
  },
  {
    title: "Integrations",
    description: "Connect with 80+ tools",
    href: "#",
  },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string
    description: string
  }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">clockify</span>
          <span className="text-xs text-muted-foreground">BY CAKE.COM</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {productItems.map((item) => (
                    <ListItem key={item.title} title={item.title} description={item.description} href={item.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                  {featureItems.map((item) => (
                    <ListItem key={item.title} title={item.title} description={item.description} href={item.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">Download</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {downloadItems.map((item) => (
                    <ListItem key={item.title} title={item.title} description={item.description} href={item.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden sm:inline-flex">
            Log in
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600">Sign up free</Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
