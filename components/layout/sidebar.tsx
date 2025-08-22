"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Timer, Calendar, BarChart2, Users, Tags, FolderKanban, ChevronsRight, ChevronsLeft, CalendarClock, LayoutDashboard, ChevronDown } from "lucide-react"
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

const reportsSubItems = [
  { href: "#summary", label: "Summary" },
  { href: "#detailed", label: "Detailed" },
  { href: "#weekly", label: "Weekly" },
  { href: "#shared", label: "Shared" },
  { href: "#team", label: "Team" },
  { href: "#attendance", label: "Attendance" },
  { href: "#assignments", label: "Assignments" },
  { href: "#expense", label: "Expense" },
]

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
      { href: "/reports", label: "Reports", icon: BarChart2, hasDropdown: true },
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
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

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
                      const isReports = item.hasDropdown

                      return (
                        <div 
                          key={item.href} 
                          className="relative"
                          onMouseEnter={() => isReports && !isCollapsed && setHoveredDropdown(item.label)}
                          onMouseLeave={() => isReports && setHoveredDropdown(null)}
                        >
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                asChild={!isReports}
                                variant={active ? "secondary" : "ghost"}
                                className={`w-full justify-start gap-2 ${
                                  isCollapsed ? "justify-center px-2" : ""
                                }`}
                                onClick={isReports && isCollapsed ? () => setHoveredDropdown(hoveredDropdown === item.label ? null : item.label) : undefined}
                              >
                                {isReports ? (
                                  <Link href={item.href} className="flex items-center gap-2 w-full">
                                    <Icon className="h-4 w-4" />
                                    {!isCollapsed && (
                                      <>
                                        <span className="uppercase tracking-wide text-xs flex-1 text-left">
                                          {item.label}
                                        </span>
                                        <ChevronDown className={`h-3 w-3 transition-transform ${hoveredDropdown === item.label ? 'rotate-180' : ''}`} />
                                      </>
                                    )}
                                  </Link>
                                ) : (
                                  <Link href={item.href}>
                                    <Icon className="h-4 w-4" />
                                    {!isCollapsed && (
                                      <span className="uppercase tracking-wide text-xs">
                                        {item.label}
                                      </span>
                                    )}
                                  </Link>
                                )}
                              </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                              <TooltipContent side="right" className="bg-gray-100 text-gray-400">
                                <p>{item.label}</p>
                              </TooltipContent>
                            )}
                          </Tooltip>

                          {/* Dropdown menu for Reports */}
                          {isReports && (
                            <>
                              {/* Desktop dropdown */}
                              {!isCollapsed && hoveredDropdown === item.label && (
                                <div className="absolute left-0 top-full mt-1 w-full bg-background border rounded-md shadow-lg z-50">
                                  <div className="py-1">
                                    {reportsSubItems.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className="block px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                        onClick={() => setHoveredDropdown(null)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Collapsed sidebar dropdown */}
                              {isCollapsed && hoveredDropdown === item.label && (
                                <div className="absolute left-full top-0 ml-2 w-48 bg-background border rounded-md shadow-lg z-50">
                                  <div className="py-1">
                                    {reportsSubItems.map((subItem) => (
                                      <Link
                                        key={subItem.href}
                                        href={subItem.href}
                                        className="block px-4 py-2 text-xs uppercase tracking-wide text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                        onClick={() => setHoveredDropdown(null)}
                                      >
                                        {subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
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
                      const isReports = item.hasDropdown

                      return (
                        <div key={item.href}>
                          <SheetClose asChild={!isReports}>
                            <Button
                              asChild={!isReports}
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start gap-2"
                              onClick={isReports ? () => setHoveredDropdown(hoveredDropdown === item.label ? null : item.label) : undefined}
                            >
                              {isReports ? (
                                <Link href={item.href} className="flex items-center gap-2 w-full">
                                  <Icon className="h-4 w-4" />
                                  <span className="uppercase tracking-wide text-xs flex-1 text-left">
                                    {item.label}
                                  </span>
                                  <ChevronDown className={`h-3 w-3 transition-transform ${hoveredDropdown === item.label ? 'rotate-180' : ''}`} />
                                </Link>
                              ) : (
                                <Link href={item.href}>
                                  <Icon className="h-4 w-4" />
                                  <span className="uppercase tracking-wide text-xs">
                                    {item.label}
                                  </span>
                                </Link>
                              )}
                            </Button>
                          </SheetClose>
                          
                          {/* Mobile dropdown */}
                          {isReports && hoveredDropdown === item.label && (
                            <div className="mt-1 ml-6 space-y-1">
                              {reportsSubItems.map((subItem) => (
                                <SheetClose asChild key={subItem.href}>
                                  <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start text-xs"
                                  >
                                    <Link href={subItem.href} className="pl-4">
                                      {subItem.label}
                                    </Link>
                                  </Button>
                                </SheetClose>
                              ))}
                            </div>
                          )}
                        </div>
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