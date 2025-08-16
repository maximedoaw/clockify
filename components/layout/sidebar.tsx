"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Timer, Calendar, BarChart2, Users, Tags, FolderKanban, ChevronsRight, ChevronsLeft, CalendarClock, LayoutDashboard } from "lucide-react"
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

const navigationItems = [
  {
    section: "Track",
    items: [
      { href: "/time-sheet", label: "Timesheet", icon: CalendarClock },
      { href: "/time-tracker", label: "Time Tracker", icon: Timer },
      { href: "/calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    section: "Analyze",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/reports/summary", label: "Reports", icon: BarChart2 },
    ],
  },
  {
    section: "Manage",
    items: [
      { href: "/projects", label: "Projects", icon: FolderKanban },
      { href: "/teams", label: "Team", icon: Users },
      { href: "/clients", label: "Clients", icon: Users },
      { href: "/tags", label: "Tags", icon: Tags },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === "/timesheet" && pathname === "/") return true
    return pathname === href || pathname.startsWith(href + "/")
  }

  // Version desktop
  const DesktopSidebar = () => (
    <div className="relative hidden lg:flex">
      <aside
        className={`flex flex-col h-[calc(100vh-60px)] sticky top-[60px] border-r bg-background ${
          isCollapsed ? "w-[60px]" : "w-[230px]"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="relative h-full">
          <ScrollArea className="h-full px-3 py-4">
            <div className="space-y-4">
              {navigationItems.map((section) => (
                <div key={section.section}>
                  {!isCollapsed && section.section !== "Track" && (
                    <div className="px-3 py-2">
                      <h2 className="mb-2 text-sm font-semibold tracking-tight text-muted-foreground">
                        {section.section}
                      </h2>
                      <Separator />
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)

                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              variant={active ? "secondary" : "ghost"}
                              className={`w-full justify-start gap-2 ${
                                isCollapsed ? "justify-center px-2" : ""
                              }`}
                            >
                              <Link href={item.href}>
                                <Icon className="h-4 w-4" />
                                {!isCollapsed && (
                                  <span className="uppercase tracking-wide text-xs">
                                    {item.label}
                                  </span>
                                )}
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isCollapsed && (
                            <TooltipContent side="right" className="bg-gray-100 text-gray-400">
                              <p>{item.label}</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Bouton de toggle positionné de manière fixe */}
          <div className="absolute top-1/2 -right-4 transform -translate-y-1/2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 p-1 z-10 bg-background border-2"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronsRight className="h-4 w-4" />
              ) : (
                <ChevronsLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )

  // Version mobile
  const MobileSidebar = () => (
    <div className="relative lg:hidden">
      <Button
        variant="outline"
        size="icon"
        className="fixed top-1/2 left-0 transform -translate-y-1/2 rounded-r-full w-8 h-8 p-1 z-10 bg-background border-2 border-l-0"
        onClick={() => setIsOpen(true)}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
          </SheetHeader>
          <ScrollArea className="h-full">
            <div className="space-y-4 py-4">
              {navigationItems.map((section) => (
                <div key={section.section}>
                  {section.section !== "Track" && (
                    <div className="px-3 py-2">
                      <h2 className="mb-2 text-sm font-semibold tracking-tight text-muted-foreground">
                        {section.section}
                      </h2>
                      <Separator />
                    </div>
                  )}
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const active = isActive(item.href)

                      return (
                        <SheetClose asChild key={item.href}>
                          <Button
                            asChild
                            variant={active ? "secondary" : "ghost"}
                            className="w-full justify-start gap-2"
                          >
                            <Link href={item.href}>
                              <Icon className="h-4 w-4" />
                              <span className="uppercase tracking-wide text-xs">
                                {item.label}
                              </span>
                            </Link>
                          </Button>
                        </SheetClose>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  )
}