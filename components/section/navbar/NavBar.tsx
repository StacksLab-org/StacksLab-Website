// File: components/section/navbar/NavBar.tsx
'use client'

import { ChevronDown, Wallet, LogOut } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { useWallet } from '@/contexts/WalletContext'
import { useState } from 'react'
import { useStacks } from '@/hooks/useStacks'
import { abbreviateAddress } from '@/lib/stx-utils'
import { useRouter } from 'next/navigation'
import { BiSolidBellRing, BiWallet } from 'react-icons/bi'

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
    const baseClasses = "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"

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
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const router = useRouter()
    const { userData, connectWallet, disconnectWallet } = useStacks();



    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="w-20 sm:w-24 md:w-28">
                            <StacksLabLogo />
                        </div>
                    </div>

                    {/* Navigation Links - Desktop */}
                    <div className="hidden lg:flex items-center space-x-8">
                        <NavItem href="#home">Home</NavItem>
                        <NavItem href="#features">Features</NavItem>
                        <NavItem href="#docs" comingSoon>Documentation</NavItem>
                        <NavItem href="#community" comingSoon>Community</NavItem>
                    </div>

                    {/* Right Side Buttons - Desktop */}
                    <div className="hidden lg:flex items-center space-x-3">
                        <a
                            href="https://github.com/StacksLab-org"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2"
                            aria-label="GitHub"
                        >
                            <BsGithub size={18} />
                        </a>
                        <Button variant="secondary" href="#waitlist">
                            <BiSolidBellRing className="w-4 h-4" />
                            <span className="hidden xl:inline">Receive Notifications</span>
                            <span className="xl:hidden">Notify</span>
                        </Button>

                        {/* Wallet Section */}
                        {userData ? (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => router.push(`/dashboard/contracts`)}
                                    className="text-blue-600 px-3 py-2 text-sm font-medium bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md transition-colors duration-200"
                                >
                                    Dashboard
                                </button>
                                <div className="flex items-center bg-blue-50 border border-blue-200 rounded-md">
                                    <span className="text-blue-600 px-3 py-2 text-sm font-medium">
                                        {abbreviateAddress(userData.profile.stxAddress.mainnet)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={disconnectWallet}
                                        className="text-red-600 px-3 py-2 text-sm font-medium hover:bg-red-50 border-l border-blue-200 rounded-r-md transition-colors duration-200"
                                        title="Disconnect Wallet"
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={connectWallet}
                                className="flex gap-2 items-center text-white px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
                            >
                                <BiWallet className="w-4 h-4" />
                                Connect Wallet
                            </button>
                        )}
                    </div>

                    {/* Mobile Right Side */}
                    <div className="flex lg:hidden items-center space-x-2">
                        {/* Wallet button for tablet/mobile */}
                        <div className="hidden md:flex lg:hidden">
                            {userData ? (
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/dashboard/contracts`)}
                                        className="text-blue-600 px-2 py-1 text-xs font-medium bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        type="button"
                                        onClick={disconnectWallet}
                                        className="text-red-600 px-2 py-1 text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 rounded"
                                        title="Disconnect"
                                    >
                                        <LogOut className="w-3 h-3" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="flex gap-1 items-center text-white px-2 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 rounded"
                                >
                                    <BiWallet className="w-3 h-3" />
                                    Connect
                                </button>
                            )}
                        </div>

                        <a
                            href="https://github.com/StacksLab-org"
                            className="text-gray-600 hover:text-gray-900 transition-colors duration-200 p-2"
                            aria-label="GitHub"
                        >
                            <BsGithub size={18} />
                        </a>

                        {/* Mobile menu button */}
                        <button
                            className="text-gray-600 hover:text-gray-900 p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <a href="#home" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50">
                                Home
                            </a>
                            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50">
                                Features
                            </a>
                            <div className="flex items-center px-3 py-2">
                                <span className="text-gray-600 text-sm font-medium">Documentation</span>
                                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                                    SOON
                                </span>
                            </div>
                            <div className="flex items-center px-3 py-2">
                                <span className="text-gray-600 text-sm font-medium">Community</span>
                                <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                                    SOON
                                </span>
                            </div>

                            {/* Mobile Actions */}
                            <div className="px-3 py-2 space-y-3 border-t border-gray-100 mt-2 pt-3">
                                <a
                                    href="#waitlist"
                                    className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    <BiSolidBellRing className="w-4 h-4" />
                                    Receive Notifications
                                </a>

                                {/* Mobile Wallet Section */}
                                {userData ? (
                                    <div className="space-y-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                router.push(`/dashboard/contracts`)
                                                setMobileMenuOpen(false)
                                            }}
                                            className="flex items-center gap-2 w-full px-3 py-2 text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            Dashboard
                                        </button>
                                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-md">
                                            <span className="text-gray-700 text-sm font-medium">
                                                {abbreviateAddress(userData.profile.stxAddress.mainnet)}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    disconnectWallet()
                                                    setMobileMenuOpen(false)
                                                }}
                                                className="text-red-600 px-2 py-1 text-xs font-medium bg-red-50 border border-red-200 hover:bg-red-100 rounded"
                                            >
                                                Disconnect
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            connectWallet()
                                            setMobileMenuOpen(false)
                                        }}
                                        className="flex items-center gap-2 w-full px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200"
                                    >
                                        <BiWallet className="w-4 h-4" />
                                        Connect Wallet
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar