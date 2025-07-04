import { Calendar, Clock, FileSpreadsheet, Monitor, Zap } from "lucide-react"

interface Feature {
    id: string
    title: string
    description: string
    icon: React.ElementType
    image: string
  }
  
  export const timekeepingFeatures: Feature[] = [
    {
      id: "timer",
      title: "Timer",
      description: "Track work hours in real time.",
      icon: Clock,
      image: "/img1.jpg",
    },
    {
      id: "timesheet",
      title: "Timesheet",
      description: "Enter time in a weekly timesheet.",
      icon: FileSpreadsheet,
      image: "/img2.jpg",
    },
    {
      id: "calendar",
      title: "Calendar",
      description: "Visually block out and manage time.",
      icon: Calendar,
      image: "/img3.jpg",
    },
    {
      id: "auto-tracker",
      title: "Auto tracker",
      description: "Track apps and websites you use.",
      icon: Zap,
      image: "/img4.jpg",
    },
    {
      id: "kiosk",
      title: "Kiosk",
      description: "Clock in from a shared device.",
      icon: Monitor,
      image: "/img5.jpg",
    },
  ]