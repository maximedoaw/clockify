
import React from 'react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Check, Clock } from 'lucide-react'
import { VideoSection } from '../components/video-section'

const EnterprisePlanPage = () => {
  return (
    <div className='text-center bg-muted/30'>
        <main className='space-y-16'>
            {/* Hero Section */}
            <div className="pt-16 pb-8">
              <h1 className='font-bold text-3xl md:text-5xl px-4'>Enterprise plan overview</h1>
              <p className='text-lg md:text-3xl mt-4 px-4'>Improve company's profitability and employee productivity.</p>
              <Button className='bg-blue-500 text-white px-5 mt-6 hover:bg-blue-600 hover:brightness-110 cursor-pointer'>
                Start free trial
              </Button>
              <div className="mt-12">
                <VideoSection videoId="26st0D80IwA"/>
              </div>
            </div>

            {/* Higher Security Section */}
            <div className="bg-white py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Higher security</h2>
                    <ul className="space-y-6 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Improve user log-in security with single sign-on</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Get direct access to other people's accounts</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Create custom subdomain for all Clockify users within your team</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Require two-factor authentication for all users</span>
                      </li>
                    </ul>
                    <Button className="mt-8 text-blue-500 bg-transparent hover:bg-blue-50 px-0 text-lg">
                      See all features →
                    </Button>
                  </div>
                  <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg p-8 h-96 flex items-center justify-center">
                    <div className="text-gray-500 text-sm">Security Interface Mockup</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Integrity Section */}
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg p-8 h-96 flex items-center justify-center order-2 lg:order-1">
                    <div className="text-gray-500 text-sm">Data Management Interface</div>
                  </div>
                  <div className="text-left order-1 lg:order-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Data integrity</h2>
                    <ul className="space-y-6 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">See who changed what on time entries, and when changes were made</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Export reports on detailed log of changes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-lg">Keep your data on regional or global server</span>
                      </li>
                    </ul>
                    <Button className="mt-8 text-blue-500 bg-transparent hover:bg-blue-50 px-0 text-lg">
                      See all features →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="bg-white py-16">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">Pricing</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                  <div className="text-center lg:text-left">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">ENTERPRISE</h3>
                      <p className="text-gray-600 text-lg">Control & Security</p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-baseline justify-center lg:justify-start gap-2">
                        <span className="text-gray-500 text-xl">$</span>
                        <span className="text-6xl font-bold text-blue-600">11</span>
                        <span className="text-gray-500 text-xl">.99 USD</span>
                      </div>
                      <p className="text-gray-500 mt-2">per seat/month billed annually</p>
                      <p className="text-gray-500">(or $14.99 if billed monthly)</p>
                    </div>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg">
                      Upgrade
                    </Button>
                  </div>
                  <div className="text-left">
                    <h4 className="text-2xl font-semibold text-gray-900 mb-6">What's included in this price?</h4>
                    <p className="text-gray-600 mb-6 text-lg">All PRO features, plus:</p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">Single sign-on (SSO)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">Custom subdomain</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">Control accounts</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">Audit log</span>
                      </li>
                    </ul>
                    <Button className="mt-8 text-blue-500 bg-transparent hover:bg-blue-50 px-0 text-lg">
                      See full pricing →
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gray-50 py-16">
              <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">Frequently asked questions</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="limits" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      Are there any limits in the free plan?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      The free plan includes unlimited users, projects, and time tracking. However, some advanced features like detailed reporting and integrations are limited to paid plans.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="trial" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      Can I try out the paid features?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      Yes, you can start a free trial to test all premium features for 7 days without providing a credit card.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="seat" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      What is a seat?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      A seat represents one user account in your workspace. You only pay for active users who track time in your workspace.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="taxes" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      Are there any additional taxes?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      Depending on your location, applicable taxes may be added to your subscription. The final price will be shown during checkout.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="canceling" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      How does canceling work?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      You can cancel your subscription at any time. Your account will remain active until the end of your billing period, then automatically downgrade to the free plan.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      What types of payment are supported?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      We accept all major credit cards (Visa, MasterCard, American Express) and PayPal payments for subscription billing.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="refunds" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      Do you offer refunds?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      We offer a 30-day money-back guarantee for all paid plans. Contact our support team if you're not satisfied with your purchase.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="discounts" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      Do you offer discounts?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      Yes, we offer discounts for annual billing, educational institutions, and non-profit organizations. Contact our sales team for more information.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="kiosk" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      How does kiosk pricing work?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      Kiosk mode allows employees to clock in/out from a shared device. It's included in all paid plans at no additional cost per kiosk device.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="yearly" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      How does yearly pricing work?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      Annual billing offers significant savings compared to monthly billing. You pay for the entire year upfront and receive up to 20% discount.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="bundle" className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-6 text-left text-lg font-medium hover:no-underline">
                      How to get Clockify + Plaky + Pumble together?
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 text-gray-600">
                      You can get all three apps together with our Business Bundle at a discounted price. Contact our sales team to learn more about bundle pricing.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* Explore Other Plans Section */}
            <div className="bg-white py-16">
              <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
                  Explore other paid <em className="italic">plans</em>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="flex justify-center">
                    <div className="relative">
                      <Clock className="w-48 h-48 text-blue-500" strokeWidth={1} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
                        <p className="text-gray-600">Administration</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">→</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Standard</h3>
                        <p className="text-gray-600">Timesheeting & Billing</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">→</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
                        <p className="text-gray-600">Profit & Productivity</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-400">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div className="bg-blue-600 py-16">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 text-xl rounded-lg">
                  Start free trial ⚡
                </Button>
              </div>
            </div>
        </main>
    </div>
  )
}

export default EnterprisePlanPage
