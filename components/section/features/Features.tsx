// File: components/section/features/Features.tsx
'use client'

import React from 'react'
import { Code, TestTube, Zap, Shield, GitBranch, Monitor } from 'lucide-react'
import Image from 'next/image'

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
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-50 rounded-full">
            <a
                                    href="https://stacks.co"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 px-3 py-1.5  rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <Image
                                        className='rounded-md'
                                        src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAY1BMVEX8ZDL////8hF39x7X/+fj9mHf8eEz8Zzb8bD38ZTP8aTn9vaj/8u79qo//6uP9nX78fVP/2Mz8gFf8iWP8cUP8jmr/4tn9spr/9PH/3dP/08X8k3H/59/8ooT9zLz9rJL9w6/kXZ75AAAEVklEQVR4nO2c65aqMAyFRUFuyiBeET36/k95xuXgJCNCC7YE3N9Pl3Xt0E0bS8JkAgAAsgj7FvA2xhMJAAAAAIB0kHkBAAAAAAAARIA/J+LAlAAAAAAAAAuExfLOOdUf7K+/7nib9yvTZO+UuPqRXB+DkxaX4a1s3IcWJw80B29/xzpXA+J0oIE4sebYBRn7z4w+ZcIZEeNu2w9dm1KoSkQv6y7SGPlFBjpLYwKVOVM9e/Vxm4SMS3xzAlXx25mrgydNEZzaXFo2kRejApVpY/bgQMbkOreWSa5ElJpLwn90yNS0QFXYfXtS2RbZJGqsEKahW7TKtpjSNXslxVg32BLU6BS+Ys1tCFSFZRuN966nOYE2WdOca1b/3ZSuWEcBWyEjple5PidfkW8eRBnrxpyuXKu6lYsZS8hWSNkqJvRzsStWCTXX66zcP1JjZTYFquJTc71M6JfUWIVVgcoU1FwvtmtmrFzqAzNmrsqcK6LGWog01o0oJzIrE/o9+YLzZV2gMgXVWZHQs6OKo1Rj3aBX/NlcPtsK+z7JqiXYEalPCT1bsc69CFRmWrMtZjTHmknLsf7CVi6W0IdsK9Q9lbQOO4rYUbnsuEHAOVYTLEknCT1L9K+SV6wStlc89ryQLgOL/p8iKMA2k8cJPTPWsVeBqlyo5HJ1YquZk8i41aOtV8OeSf6++l5RFJcD/zA/1/2Epa2SJbBmsHMgcWkW0hXXSiBxs5DOWNn2EQgCQSAfEsiyWUdXDjbimGzyZiXdcC0l+eF8ahYZmRgAAAAAhkUWz8yytJOjZIfmtK8jdkpO981COmPlaHg0f6wQCAJBIB8SiNesoysnG3FM/P3BreFZVtWHdb/gJrZaF4J5DV7CFcfTNE2LI48jTut+QsgjePa0sKyciWj1hrMbwkNdHsislJzRT/NeBSrCap0Wv3nsUCqcHjDBpHImYg/axVXJPsGKTVnlTMbKS6XfJaxC88/jdHaM7/UkUJW6kqxgQObixvprn1RkG08VvN3quXJmMJVObMWqqJf1qbkSueZiJVmVBwistkZcx0UJM9aLkixW/yHVXKyT7UUCy9vdZJqLZVMvm3oy8eYKFG9kttMINFeo2lUptJfygXor4lx0gbxO57Foc7EC7IZGHV7rL6uJxGMl8U12YR2uuaSVK9B8XwLLuSS1Lej+jWV/hwU1kuj33rLeXqXGcRu0UcVil9LQzg6DFXe4kK5cQtrfWPvhVXXUXKtx3Ab670m40/Z9KsZo3clGkzOnf3Ppvu7hF1lHESzHOuk16pzpzdV3Y/uUaNHOyam5VkbkqbMh/tC+Y2nHa+/vsMjy5M6pMVd8Zp0vfoj7vke+t7boTqsk1g9+eLcqAAAAAAAAAABaSHvs9emMZT4Qh3BGG9hAqLj+g5ySatGDDGUc4NIDA4Qj8dVIwhhNIGPx1VjmQzkO6fFK1/dpYD5EgekQxWimYySBjCSMzuA6gHb8B38sM5NakHIYAAAAAElFTkSuQmCC'}
                                        height={25}
                                        width={25} alt='stacks' />
                                    <span className="text-sm font-medium text-gray-700">Built for Stacks ecosystem</span>
                                </a>
             
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to build on Stacks
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            StacksLab provides a comprehensive suite of tools for developing, testing, and deploying smart contracts on the Stacks blockchain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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