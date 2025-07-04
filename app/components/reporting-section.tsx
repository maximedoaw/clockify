import { Feature, FeaturesSection } from "./features-section";

const reportingFeatures: Feature[] = [
    {
      id: "Reports",
      title: "Reports",
      description: "Analyze and export tracked time.",
      icon: "BarChart3",
      image: "/img6.jpg",
    },
    {
      id: "Activity",
      title: "Activity",
      description: "See who works on what.",
      icon: "Users",
      image: "/img7.jpg",
    },
    {
      id: "Rates",
      title: "Rates",
      description: "See earnings, cost, and profit.",
      icon: "Settings",
      image: "/img8.jpg",
    },
    {
      id: "Projects",
      title: "Projects",
      description: "Track project estimates and budget.",
      icon: "FileSpreadsheet",
      image: "/img9.jpg",
    },
    {
      id: "Location",
      title: "Location",
      description: "See visited sites and routes.",
      icon: "Monitor",
      image: "/img10.jpg",
    },
  ]

import React from 'react'

const ReportingSection = () => {
  return (
  <FeaturesSection
    sectionTitle="Reporting"
    features={reportingFeatures}
    featuresPosition="right"
    imagePosition="left"
    defaultActiveFeature="timer"
  />
  )
}

export default ReportingSection