// File: components/section/how-it-works/HowItWorks.tsx
'use client'

import React from 'react'
import { Upload, Play, Rocket, CheckCircle } from 'lucide-react'

interface StepProps {
  number: number
  icon: React.ReactNode
  title: string
  description: string
  isLast?: boolean
}

const Step: React.FC<StepProps> = ({ number, icon, title, description, isLast = false }) => {
  return (
    <div className="flex flex-col items-center text-center relative">
      {/* Step Number */}
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 relative z-10">
        {number}
      </div>
      
      {/* Connector Line */}
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 transform translate-x-1/2 z-0"></div>
      )}
      
      {/* Icon */}
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      
      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-xs leading-relaxed">{description}</p>
    </div>
  )
}

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Upload className="w-6 h-6 text-blue-600" />,
      title: "Upload Contract",
      description: "Upload your Clarity smart contract or start from one of our templates to begin testing."
    },
    {
      icon: <Play className="w-6 h-6 text-blue-600" />,
      title: "Test & Simulate",
      description: "Run comprehensive tests and simulate blockchain interactions in our secure environment."
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      title: "Analyze Results",
      description: "Review test results, security analysis, and performance metrics to optimize your contract."
    },
    {
      icon: <Rocket className="w-6 h-6 text-blue-600" />,
      title: "Deploy Confidently",
      description: "Deploy your thoroughly tested smart contract to the Stacks mainnet with confidence."
    }
  ]

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How StacksLab Works
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Get your smart contracts from development to deployment in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <Step
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks