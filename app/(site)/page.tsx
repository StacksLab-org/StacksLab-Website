// File: app/(site)/page.tsx
'use client'

import React from 'react'
import {  ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Features from '@/components/section/features/Features'
import HowItWorks from '@/components/section/how-it-works/HowItWorks'
import CodeDemo from '@/components/section/demo/CodeDemo'
import CallToAction from '@/components/section/cta/CallToAction'
import Waitlist from '@/components/section/waitlist/Waitlist'
import { FcLinux } from 'react-icons/fc'
import { FaWindows } from 'react-icons/fa6'
import { FaApple } from 'react-icons/fa'

interface ButtonProps {
    variant: 'primary' | 'secondary'
    children: React.ReactNode
    href?: string
}

const HeroButton: React.FC<ButtonProps> = ({ variant, children, href = '#' }) => {
    const baseClasses = "inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-md transition-all duration-200"

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
    }

    return (
        <a
            href={href}
            className={`${baseClasses} ${variants[variant]}`}
        >
            {children}
        </a>
    )
}

const DownloadIcon: React.FC<{
    platform: 'windows' | 'mac' | 'linux'
    onComingSoon: (platform: string) => void
}> = ({ platform, onComingSoon }) => {
    const [showTooltip, setShowTooltip] = React.useState(false)

    const iconMap = {
        windows: <FaWindows className="w-8 h-8" />,
        mac: <FaApple className="w-8 h-8" />,
        linux: <FcLinux className="w-8 h-8"/>
    }

    const platformNames = {
        windows: 'Windows',
        mac: 'macOS',
        linux: 'Linux'
    }

    const handleClick = () => {
        // Simple scroll to waitlist for now
        const waitlistSection = document.getElementById('waitlist')
        if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div
            className="relative flex items-center justify-center w-12 h-12 bg-gray-100 text-zinc-800 rounded-lg hover:bg-orange-100 transition-colors duration-200 cursor-pointer group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
        >
            {iconMap[platform]}
            <span className="absolute -top-1 -right-1 px-1 py-0.5 bg-orange-500 text-white text-xs rounded-full text-[8px] font-medium">
                SOON
            </span>
            {showTooltip && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                    {platformNames[platform]} - Coming Soon
                </div>
            )}
        </div>
    )
}

const StacksHero: React.FC = () => (
    <Image src={'/stacks_hero.png'} width={500} height={500} alt='stacks_hero' />
)

const HeroSection: React.FC = () => {
    return (
        <section className="bg-white py-5 lg:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="max-w-xl">
                        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                            <p className='text-blue-500'> Build & Test Smart </p>  Contracts on StacksLab
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                            StacksLab is the complete development platform for Stacks blockchain.
                            Write, test, and deploy Clarity smart contracts with confidence using
                            our powerful simulation and testing environment.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <HeroButton variant="primary" href="#waitlist">
                                Join Waitlist
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </HeroButton>
                            <HeroButton variant="secondary" href="#demo">
                                Request Demo
                            </HeroButton>
                        </div>

                        {/* Download Section */}
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-gray-700">
                                Desktop apps coming soon for
                            </p>
                            <div className="flex items-center space-x-4">
                                <DownloadIcon platform="windows" onComingSoon={() => { }} />
                                <DownloadIcon platform="mac" onComingSoon={() => { }} />
                                <DownloadIcon platform="linux" onComingSoon={() => { }} />
                            </div>
                            <p className="text-xs text-gray-500">
                                Click to get notified when available
                            </p>
                        </div>

                        {/* Powered by Stacks Badge */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Powered by</span>
                                <a 
                                    href="https://stacks.co" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                   <Image
                                   className='rounded-md'
                             src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAY1BMVEX8ZDL////8hF39x7X/+fj9mHf8eEz8Zzb8bD38ZTP8aTn9vaj/8u79qo//6uP9nX78fVP/2Mz8gFf8iWP8cUP8jmr/4tn9spr/9PH/3dP/08X8k3H/59/8ooT9zLz9rJL9w6/kXZ75AAAEVklEQVR4nO2c65aqMAyFRUFuyiBeET36/k95xuXgJCNCC7YE3N9Pl3Xt0E0bS8JkAgAAsgj7FvA2xhMJAAAAAIB0kHkBAAAAAAAARIA/J+LAlAAAAAAAAAuExfLOOdUf7K+/7nib9yvTZO+UuPqRXB+DkxaX4a1s3IcWJw80B29/xzpXA+J0oIE4sebYBRn7z4w+ZcIZEeNu2w9dm1KoSkQv6y7SGPlFBjpLYwKVOVM9e/Vxm4SMS3xzAlXx25mrgydNEZzaXFo2kRejApVpY/bgQMbkOreWSa5ElJpLwn90yNS0QFXYfXtS2RbZJGqsEKahW7TKtpjSNXslxVg32BLU6BS+Ys1tCFSFZRuN966nOYE2WdOca1b/3ZSuWEcBWyEjple5PidfkW8eRBnrxpyuXKu6lYsZS8hWSNkqJvRzsStWCTXX66zcP1JjZTYFquJTc71M6JfUWIVVgcoU1FwvtmtmrFzqAzNmrsqcK6LGWog01o0oJzIrE/o9+YLzZV2gMgXVWZHQs6OKo1Rj3aBX/NlcPtsK+z7JqiXYEalPCT1bsc69CFRmWrMtZjTHmknLsf7CVi6W0IdsK9Q9lbQOO4rYUbnsuEHAOVYTLEknCT1L9K+SV6wStlc89ryQLgOL/p8iKMA2k8cJPTPWsVeBqlyo5HJ1YquZk8i41aOtV8OeSf6++l5RFJcD/zA/1/2Epa2SJbBmsHMgcWkW0hXXSiBxs5DOWNn2EQgCQSAfEsiyWUdXDjbimGzyZiXdcC0l+eF8ahYZmRgAAAAAhkUWz8yytJOjZIfmtK8jdkpO981COmPlaHg0f6wQCAJBIB8SiNesoysnG3FM/P3BreFZVtWHdb/gJrZaF4J5DV7CFcfTNE2LI48jTut+QsgjePa0sKyciWj1hrMbwkNdHsislJzRT/NeBSrCap0Wv3nsUCqcHjDBpHImYg/axVXJPsGKTVnlTMbKS6XfJaxC88/jdHaM7/UkUJW6kqxgQObixvprn1RkG08VvN3quXJmMJVObMWqqJf1qbkSueZiJVmVBwistkZcx0UJM9aLkixW/yHVXKyT7UUCy9vdZJqLZVMvm3oy8eYKFG9kttMINFeo2lUptJfygXor4lx0gbxO57Foc7EC7IZGHV7rL6uJxGMl8U12YR2uuaSVK9B8XwLLuSS1Lej+jWV/hwU1kuj33rLeXqXGcRu0UcVil9LQzg6DFXe4kK5cQtrfWPvhVXXUXKtx3Ab670m40/Z9KsZo3clGkzOnf3Ppvu7hF1lHESzHOuk16pzpzdV3Y/uUaNHOyam5VkbkqbMh/tC+Y2nHa+/vsMjy5M6pMVd8Zp0vfoj7vke+t7boTqsk1g9+eLcqAAAAAAAAAABaSHvs9emMZT4Qh3BGG9hAqLj+g5ySatGDDGUc4NIDA4Qj8dVIwhhNIGPx1VjmQzkO6fFK1/dpYD5EgekQxWimYySBjCSMzuA6gHb8B38sM5NakHIYAAAAAElFTkSuQmCC'}
                  height={25}
                  width={25} alt='stacks' />
                                    <span className="text-sm font-medium text-gray-700">Stacks Blockchain</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Hero Image */}
                    <div className="flex justify-center lg:justify-end">
                        <StacksHero />
                    </div>
                </div>
            </div>
        </section>
    )
}

const HomePage: React.FC = () => {
    return (
        <>
            <HeroSection />
            <Features />
            <HowItWorks />
            <CodeDemo />
            <Waitlist />
            <CallToAction />
        </>
    )
}

export default HomePage