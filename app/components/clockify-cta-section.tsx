import { ArrowRight, Users } from "lucide-react"

export default function ClockifyCtaSection() {
  return (
    <section className="bg-blue-50 py-10 rounded-2xl mx-4 md:mx-auto max-w-4xl text-center shadow-sm">
      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        Start tracking time with Clockify
      </h2>
      <p className="text-sm md:text-base text-gray-700 mb-4">
        24/7 Support • Cancel Anytime • Free Forever
      </p>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 justify-center mx-auto transition-colors">
        Create FREE account
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
        <Users className="w-3.5 h-3.5" />
        145,573 people signed up last month
      </p>
    </section>
  );
}
