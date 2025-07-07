import React from 'react'
import { HeroSection } from '../components/hero-section'
import { VideoSection } from '../components/video-section'
import ProjectSetup from '../components/project-setup'
import ClockifyCtaSection from '../components/clockify-cta-section'

const EmployeeSchedulingSoftwarePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection title="Free Timekeeping Software" subtitle="Clockify is the only FREE timekeeping software for tracking and managing work hours online. Keep track of work hours and run reports to see detailed time breakdown" />

      <main className='text-center bg-green-50'>
        <VideoSection videoId="4K6yRS_CFbk"/>
        <h1 className="text-4xl font-bold mb-6">What is employee scheduling software?</h1>
        <h2 className="text-2xl font-semibold mb-4">
        Clockify is a software for staff scheduling & time tracking allowing you to organize your work and keep up with all your projects. With Clockify you will be able to:
        </h2>
        <ul className="list-disc list-inside text-lg space-y-2">
            <li>Monitor team availability</li>
            <li>Make optimized schedules</li>
            <li>Manage time off</li>
            <li>Visualize projects &amp; milestones</li>
            <li>Monitor budget &amp; expenses</li>
            <li>Export reports for payroll</li>
        </ul>
        <h1 className='mfont-bold text-3xl'>How does employee scheduling work?</h1>
        <VideoSection videoId="JmQ8nT8qPnw"/>
        {Array.from({ length: 3 }).map((_, i) => <ProjectSetup key={i} />)}

      </main>
      <ClockifyCtaSection/>

    </div>
)
}

export default EmployeeSchedulingSoftwarePage