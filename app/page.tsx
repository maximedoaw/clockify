import { Calendar, Clock, FileSpreadsheet, Monitor, Zap } from "lucide-react"
import { ClockifySection } from "./components/clockify-section";
import { HeroSection } from "./components/hero-section";
import { VideoSection } from "./components/video-section";
import TimekeepingSection from "./components/time-keeping-section";
import ReportingSection from "./components/reporting-section";
import { WhyClockifySection } from "./components/why-clockify-section";
import { TestimonialsSection } from "./components/testimonials-section";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection title="Free Online Time Reporting System" subtitle="Clockify's time reporting system lets you and your team see where the time really goes, and export the data." />
        <VideoSection videoId="4K6yRS_CFbk"/>
        <TimekeepingSection />
        <ReportingSection />
        <WhyClockifySection />
        <TestimonialsSection/>
        </main>
      </div>
    )
  }
