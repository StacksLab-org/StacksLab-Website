// File: components/section/navbar/NavBar.tsx
'use client'

import { ChevronDown, LogOut } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { BsGithub } from 'react-icons/bs'
import { useStacks } from '@/hooks/useStacks'
import { abbreviateAddress } from '@/lib/stx-utils'
import { useRouter } from 'next/navigation'
import { BiSolidBellRing, BiWallet } from 'react-icons/bi'
import MobileExperienceDialog from '@/components/ui/MobileExperienceDialog'
import { useMobileDetection } from '@/hooks/useMobileDetection'

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
    const { userData, connectWallet, disconnectWallet } = useStacks()
    const { showMobileDialog, closeMobileDialog, dismissMobileDialog } = useMobileDetection()



    return (
        <>
            <MobileExperienceDialog
                isOpen={showMobileDialog}
                onClose={closeMobileDialog}
                onDismiss={dismissMobileDialog}
            />
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
                            <NavItem href="/">Home</NavItem>
                            <NavItem href="#features">Features</NavItem>
                            <NavItem href="/docs" >Documentation</NavItem>
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


                            {/* Wallet Section */}
                            {userData ? (
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => router.push(`/dashboard/contracts`)}
                                        className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] transition-transform duration-700"></div>
                                        <span className="relative flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                            Dashboard
                                        </span>
                                    </button>
                                    <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-gray-700 text-sm font-medium">
                                                {abbreviateAddress(userData.profile.stxAddress.mainnet)}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={disconnectWallet}
                                            className="group px-3 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 border-l border-gray-200 rounded-r-lg transition-all duration-200"
                                            title="Disconnect Wallet"
                                        >
                                            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={connectWallet}
                                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    <span className="relative flex items-center gap-2">
                                        <BiWallet className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                        Connect Wallet
                                    </span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Right Side */}
                        <div className="flex lg:hidden items-center space-x-2">
                            {/* Wallet button for tablet/mobile */}
                            <div className="flex md:flex lg:hidden">
                                {userData ? (
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => router.push(`/dashboard/contracts`)}
                                            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                                        >
                                            <span className="flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                Dashboard
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={disconnectWallet}
                                            className="group text-gray-400 hover:text-red-500 px-2 py-1.5 hover:bg-red-50 rounded-md transition-all duration-200"
                                            title="Disconnect"
                                        >
                                            <LogOut className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={connectWallet}
                                        className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                                    >
                                        <span className="flex items-center gap-1">
                                            <BiWallet className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                                            Connect
                                        </span>
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
                                        <div className="space-y-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    router.push(`/dashboard/contracts`)
                                                    setMobileMenuOpen(false)
                                                }}
                                                className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 text-sm font-medium rounded-lg translors dall duration-200 hover:shadow-lg
                                       " >
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                    </svg>
                                                    Dashboard
                                                </span>
                                            </button>
                                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-3">
                                                <div className="flex items-center justween">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                        <span className="text-gray-700 text-sm font-medium">
                                                            {abbreviateAddress(userData.profile.stxAddress.mainnet)}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            disconnectWallet()
                                                            setMobileMenuOpen(false)
                                                        }}
                                                        className="group text-gray-400 hover:text-red-500 px-2 py-1 hover:bg-red-50 rounded-md transition-all duration-200"
                                                    >
                                                        <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                connectWallet()
                                                setMobileMenuOpen(false)
                                            }}
                                            className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                <BiWallet className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                                Connect Wallet
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div >
            </nav >
        </>
    )
}

export default Navbar