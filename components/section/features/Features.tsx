// File: components/section/features/Features.tsx
'use client'

import React from 'react'
import { Code, TestTube, Zap, Shield, GitBranch, Monitor } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  badge?: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, badge }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200 relative">
      {badge && (
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs font-medium rounded ${
            badge === 'BETA' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-orange-100 text-orange-700'
          }`}>
            {badge}
          </span>
        </div>
      )}
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

const Features: React.FC = () => {
  const features = [
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Smart Contract IDE",
      description: "Write and test your Stacks smart contracts with our intuitive web-based IDE. Full Clarity language support.",
      badge: "BETA"
    },
    {
      icon: <TestTube className="w-6 h-6 text-blue-600" />,
      title: "Blockchain Simulation",
      description: "Simulate blockchain interactions in a safe environment. Test complex scenarios without real transactions.",
      badge: "COMING SOON"
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Instant Deployment",
      description: "Deploy your contracts to testnet and mainnet with one click. Integrated with Stacks ecosystem.",
      badge: "COMING SOON"
    },
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Security Analysis",
      description: "Built-in security checks help identify vulnerabilities and ensure your contracts are production-ready.",
      badge: "COMING SOON"
    },
    {
      icon: <GitBranch className="w-6 h-6 text-blue-600" />,
      title: "Team Collaboration",
      description: "Share projects, review code, and collaborate with your team using integrated workspace features.",
      badge: "COMING SOON"
    },
    {
      icon: <Monitor className="w-6 h-6 text-blue-600" />,
      title: "Contract Analytics",
      description: "Monitor contract performance and behavior with comprehensive analytics and transaction tracking.",
      badge: "COMING SOON"
    }
  ]

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-full">
              <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="#5546FF"/>
                <path d="M20 8L32 20L20 32L8 20L20 8Z" fill="white"/>
              </svg>
              <span className="text-sm font-medium text-blue-700">Built for Stacks Ecosystem</span>
            </div>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to build on Stacks
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            StacksLab provides a comprehensive suite of tools for developing, testing, and deploying smart contracts on the Stacks blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              badge={feature.badge}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features