import { Clock, FileSpreadsheet, Calendar, Zap, Monitor, BarChart3, Users, Settings } from "lucide-react"
import { FeaturesSection, type Feature } from "./features-section"

// Exemple 1: Features de Time Management (comme l'original)
const timekeepingFeatures: Feature[] = [
  {
    id: "timer",
    title: "Timer",
    description: "Track work hours in real time.",
    icon: "Clock",
    image: "/img1.jpg",
  },
  {
    id: "timesheet",
    title: "Timesheet",
    description: "Enter time in a weekly timesheet.",
    icon: "FileSpreadsheet",
    image: "/img2.jpg",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "Visually block out and manage time.",
    icon: "Calendar",
    image: "/img3.jpg",
  },
  {
    id: "auto-tracker",
    title: "Auto tracker",
    description: "Track apps and websites you use.",
    icon: "Zap",
    image: "/img4.jpg",
  },
  {
    id: "kiosk",
    title: "Kiosk",
    description: "Clock in from a shared device.",
    icon: "Monitor",
    image: "/img5.jpg",
  },
]



export default function TimekeepingSection() {
  return (
    <FeaturesSection
      title="Time management features"
      subtitle="Track productivity, attendance, and billable hours with a simple time tracker and timesheet."
      sectionTitle="Timekeeping"
      features={timekeepingFeatures}
      featuresPosition="left"
      imagePosition="right"
      defaultActiveFeature="timer"
    />
  )
}

