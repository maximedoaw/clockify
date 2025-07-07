import { Calendar, Clock, FileSpreadsheet, Monitor, Zap } from "lucide-react"
import { ClockifySection } from "../components/clockify-section";
import { HeroSection } from "../components/hero-section";
import { VideoSection } from "../components/video-section";
import TimekeepingSection from "../components/time-keeping-section";
import ReportingSection from "../components/reporting-section";
import { WhyClockifySection } from "../components/why-clockify-section";
import { TestimonialsSection } from "../components/testimonials-section";
import TextAndImage from "../components/text-and-image";
import ClockifyCtaSection from "../components/clockify-cta-section";


export default function TimeKeeperPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection title="Free Timekeeping Software" subtitle="Clockify is the only FREE timekeeping software for tracking and managing work hours online. Keep track of work hours and run reports to see detailed time breakdown" />
        <VideoSection videoId="4K6yRS_CFbk"/>
        <TextAndImage imageSrc="/img10.jpg" />
        <TextAndImage imageSrc="/img12.jpg" />
        <TextAndImage imageSrc="/img13.jpg" />
        <TextAndImage imageSrc="/img14.jpg" />
        <ClockifyCtaSection/>
        </main>
      </div>
    )
  }
