// File: components/section/cta/CallToAction.tsx
'use client'

import React from 'react'
import { ArrowRight, Github, BookOpen } from 'lucide-react'

interface CTAButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  href?: string
  icon?: React.ReactNode
}

const CTAButton: React.FC<CTAButtonProps> = ({ variant, children, href = '#', icon }) => {
  const baseClasses = "inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-md transition-all duration-200"
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-gray-900 border border-gray-300 hover:border-gray-400 hover:bg-gray-50"
  }

  return (
    <a
      href={href}
      className={`${baseClasses} ${variants[variant]}`}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </a>
  )
}

const CallToAction: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
          Ready to revolutionize Stacks development?
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed max-w-2xl mx-auto">
          StacksLab is launching soon. Be among the first to experience the future 
          of smart contract development on Stacks blockchain.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <CTAButton 
            variant="primary" 
            href="#waitlist"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Join the Waitlist
          </CTAButton>
          <CTAButton 
            variant="secondary" 
            href="#demo"
          >
            Request Early Access
          </CTAButton>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-blue-100">
          <a 
            href="https://github.com/StacksLab-org" 
            className="flex items-center hover:text-white transition-colors duration-200"
          >
            <Github className="w-5 h-5 mr-2" />
            Follow on GitHub
          </a>
          <a 
            href="#updates" 
            className="flex items-center hover:text-white transition-colors duration-200"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Development Updates
          </a>
        </div>

        {/* Launch Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-blue-500">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">Q2 2025</div>
            <div className="text-blue-200">Expected Launch</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-blue-200">Developers Waiting</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-blue-200">Open Source</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction