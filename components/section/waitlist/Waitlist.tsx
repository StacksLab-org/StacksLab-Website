// File: components/section/waitlist/Waitlist.tsx
'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    setIsLoading(false)
  }

  if (isSubmitted) {
    return (
      <section id="waitlist" className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're on the list! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Thanks for joining our waitlist. We'll notify you as soon as StacksLab is ready for early access.
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">What's next?</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• We'll send you exclusive updates on our progress</li>
                <li>• Early access invitation when we launch beta</li>
                <li>• Special pricing for early supporters</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="waitlist" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-12 lg:p-16">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Join the Waitlist
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Be among the first to experience StacksLab. Get early access, 
                exclusive updates, and help shape the future of Stacks development.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Early access to beta platform</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Exclusive development updates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Special launch pricing</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Direct feedback channel</span>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="bg-gray-50 p-12 lg:p-16">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    What best describes you?
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select your role</option>
                    <option value="blockchain-developer">Blockchain Developer</option>
                    <option value="smart-contract-developer">Smart Contract Developer</option>
                    <option value="full-stack-developer">Full Stack Developer</option>
                    <option value="startup-founder">Startup Founder</option>
                    <option value="student">Student/Learning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>

              {/* Stats */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-600">Developers waiting</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">Q2 2025</div>
                    <div className="text-sm text-gray-600">Expected launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Waitlist