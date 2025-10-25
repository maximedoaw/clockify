import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Settings, FileText, Users, MoreHorizontal, Clock, Puzzle } from "lucide-react"
import { UserAvatar } from "../ui/user-avatar"
import { useRouter } from "next/navigation"

export function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="w-full bg-background border-b border-clockify-border fixed z-20">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-blue-500 text-white">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold text-clockify-dark">clockify</span>
          </div>
          <span className="text-clockify-gray text-sm">maxdev</span>
          
          {/* Three dots dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-clockify-gray hover:bg-clockify-light-gray p-1 h-auto">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="w-56 bg-popover border border-clockify-border shadow-lg rounded-lg p-0"
              sideOffset={8}
            >
              <div className="py-2">
                <DropdownMenuItem 
                className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer"
                onClick={() => router.push("/workspace-settings")}
                >
                  <Settings className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Workspace settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <FileText className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Subscription</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <Users className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Manage workspaces</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">

          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-clockify-light-gray flex items-center justify-center">
               <Puzzle className="w-5 h-5 rounded-full bg-warning"/>
            </div>
          </div>

          {/* Help Dropdown */}
          <DropdownMenu open={isHelpDropdownOpen} onOpenChange={setIsHelpDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-6 h-6 rounded-full bg-clockify-light-gray flex items-center justify-center hover:bg-clockify-border p-0 min-w-0"
              >
                <span className="text-xs text-clockify-gray">?</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-48 bg-popover border border-clockify-border shadow-lg rounded-lg p-0"
              sideOffset={8}
            >
              <div className="py-2">
                <DropdownMenuItem className="flex items-center px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <span className="text-sm text-clockify-dark">Help center</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <span className="text-sm text-clockify-dark">Tutorials</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <span className="text-sm text-clockify-dark">Contact support</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                <UserAvatar name="MA" className="cursor-pointer" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 bg-popover border border-clockify-border shadow-lg rounded-lg p-0"
              sideOffset={8}
            >
              <div className="p-4 border-b border-clockify-border">
                <div className="flex items-center space-x-3">
                  <UserAvatar name="MA" />
                  <div>
                    <p className="text-sm font-medium text-clockify-dark">maxdev</p>
                    <p className="text-xs text-clockify-gray">Admin</p>
                  </div>
                </div>
              </div>
              
              <div className="py-2">
                <DropdownMenuItem 
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer"
                  onClick={() => router.push("/workspace-settings")}
                >
                  <Settings className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Workspace settings</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <FileText className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Subscription</span>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <Users className="w-4 h-4 text-clockify-gray" />
                  <span className="text-sm text-clockify-dark">Manage workspaces</span>
                </DropdownMenuItem>
              </div>

              <DropdownMenuSeparator className="bg-clockify-border" />
              
              <div className="py-2">
                <DropdownMenuItem className="flex items-center space-x-3 px-4 py-3 hover:bg-clockify-light-gray cursor-pointer">
                  <span className="text-sm text-clockify-dark">Sign out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}