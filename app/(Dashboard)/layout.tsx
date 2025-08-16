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
  X as CloseIcon,
  CalendarClock,
  Clock4
} from 'lucide-react';
import ClientLayout from './client-layout';

interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <ClientLayout>{children}</ClientLayout>
  );
};

export default Layout;
