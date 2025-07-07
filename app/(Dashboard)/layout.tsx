"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Clock,
  Calendar,
  BarChart3,
  FileText,
  Users,
  User,
  Tag,
  Settings,
  ChevronDown,
  Menu as MenuIcon,
  X as CloseIcon
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navLinks = [
  { href: '/time-tracker', label: 'TIME TRACKER', icon: Clock },
  { href: '/calendar', label: 'CALENDAR', icon: Calendar },
  { href: '/dashboard', label: 'DASHBOARD', icon: BarChart3 },
  { href: '/reports', label: 'REPORTS', icon: FileText },
  { href: '/projects', label: 'PROJECTS', icon: FileText },
  { href: '/team', label: 'TEAM', icon: Users },
  { href: '/clients', label: 'CLIENTS', icon: User },
  { href: '/tags', label: 'TAGS', icon: Tag },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (path === '/time-tracker' && pathname === '/');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar - Drawer on mobile, fixed on desktop */}
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">clockify</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
          <MenuIcon className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setSidebarOpen(false)} />
          {/* Drawer */}
          <div className="relative w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col h-full">
            <button className="absolute top-4 right-4" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <CloseIcon className="w-6 h-6 text-gray-700" />
            </button>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900">clockify</h1>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <span>max dev</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <button className="mt-3 w-full bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                UPGRADE
              </button>
            </div>
            <nav className="p-4 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {navLinks.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(href)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Sidebar desktop */}
      <div className="hidden lg:flex flex-col w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen sticky top-0">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">clockify</h1>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>max dev</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
          <button className="mt-3 w-full bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
            UPGRADE
          </button>
        </div>
        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      {/* Main Content - responsive padding */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header - always visible, sticky on mobile */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-4 sm:px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">MA</span>
            </div>
          </div>
        </div>
        {/* Page Content */}
        <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 w-full max-w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
