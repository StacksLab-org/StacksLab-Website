// File: components/section/navbar/NavBar.tsx
'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { BsGithub } from 'react-icons/bs'

interface NavItemProps {
    children: React.ReactNode
    hasDropdown?: boolean
    href?: string
    comingSoon?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ children, hasDropdown = false, href = '#', comingSoon = false }) => {
    return (
        <a
            href={href}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium relative"
        >
            {children}
            {hasDropdown && <ChevronDown className="w-4 h-4" />}
            {comingSoon && (
                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                    SOON
                </span>
            )}
        </a>
    )
}

interface ButtonProps {
    variant: 'primary' | 'secondary'
    children: React.ReactNode
    href?: string
}

export const Button: React.FC<ButtonProps> = ({ variant, children, href = '#' }) => {
    const baseClasses = "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"

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

export const StacksLabLogo: React.FC = () => (
    <Image src={'/stacks_lab.png'} width={100} height={100} alt='StacksLab - Smart Contract Development Platform' />
)

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <StacksLabLogo />
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavItem href="#home">Home</NavItem>
                        <NavItem href="#features">Features</NavItem>
                        <NavItem href="#docs" comingSoon>Documentation</NavItem>
                        <NavItem href="#community" comingSoon>Community</NavItem>
                    </div>

                    {/* Right Side Buttons */}
                    <div className="flex items-center space-x-4">
                        <a 
                            href="https://github.com/StacksLab-org" 
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                            aria-label="GitHub"
                        >
                            <BsGithub size={20} />
                        </a>
                        <Button variant="secondary" href="#waitlist">Join Waitlist</Button>
                        <Button variant="primary" href="#demo">Request Demo</Button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button className="text-gray-600 hover:text-gray-900">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar