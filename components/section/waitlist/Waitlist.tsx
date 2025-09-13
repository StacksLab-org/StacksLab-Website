// File: components/section/getstarted/GetStarted.tsx
'use client'

import React from 'react'
import { Code, Rocket, Users, ArrowRight, Play, BookOpen } from 'lucide-react'
import Link from 'next/link'

const GetStarted: React.FC = () => {
  return (
    <section id="get-started" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to Build on Stacks?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Start developing smart contracts with StacksLab today. Choose your path and begin building the future of decentralized applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Quick Start */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Start</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Jump right in with our interactive IDE. No setup required - start coding Clarity contracts in seconds.
            </p>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
            >
              Launch IDE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Learn First */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Learn First</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              New to Stacks? Start with our comprehensive tutorials and documentation to master Clarity development.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-200"
            >
              View Tutorials
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          {/* Join Community */}
          <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Join Community</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Connect with other Stacks developers, share projects, and get help from the community.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200"
            >
              Join Discord
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex  gap-0">
            {/* Left Content */}
            <div className="p-8 lg:p-12 xl:p-16">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Start Building Today
              </h3>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Experience the power of StacksLab with our full-featured IDE. Write, test, and deploy Clarity smart contracts with confidence.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Monaco-based code editor with syntax highlighting</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Built-in testing framework and simulation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Integrated wallet connectivity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Real-time compilation and error checking</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Launch StacksLab
                </Link>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  View Examples
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStarted