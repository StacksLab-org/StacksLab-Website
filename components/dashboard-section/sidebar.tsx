'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Code,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import { StacksLabLogo } from '../section/navbar/NavBar'
import { FaUserGroup } from 'react-icons/fa6'

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
    const pathname = usePathname()

    const sidebarItems = [
       // { icon: Home, label: 'Overview', href: '/dashboard', count: null, comingSoon: false },
        { icon: Code, label: 'Smart Contract', href: '/dashboard/contracts', count: 12, comingSoon: false, badge: 'BETA' },
        { icon: FaUserGroup, label: 'Collaboration', href: '/dashboard/collaboration', count: 12,  badge: 'BETA' },
    ]

    return (
        <div className={`${
            sidebarOpen ? 'w-64' : 'w-16'
        } border-r border-gray-200 transition-all duration-300 ease-in-out bg-white  flex flex-col text-sm relative group`}>
            
            {/* Sidebar Header */}
            <div className={`${
                sidebarOpen ? 'px-4 ' : 'px-2 '
            } border-b border-gray-200 flex items-center justify-between transition-all duration-300`}>
                <div className={`transition-all duration-300 ${sidebarOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}>
                    <StacksLabLogo/>
                </div>

                
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 ${
                        sidebarOpen ? 'ml-auto' : 'mx-auto'
                    }`}
                    title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    {sidebarOpen ? (
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                    ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                </button>
            </div>
             
            {/* Sidebar Navigation */}
            <nav className={`flex-1 ${sidebarOpen ? 'p-4' : 'p-2'} space-y-2 transition-all duration-300`}>
                {sidebarItems.map((item, index) => {
                    const isActive = pathname === item.href

                    return (
                        <div key={index} className="relative group/item">
                            <Link
                                href={item.href}
                                className={`flex items-center ${
                                    sidebarOpen ? 'space-x-3 px-3 py-3' : 'justify-center px-2 py-3'
                                }  cursor-pointer transition-all duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600  border-l-2 border-blue-200'
                                        : 'hover:bg-gray-50 text-gray-400 hover:text-gray-900 hover:'
                                } ${!sidebarOpen && isActive ? 'border-l-4 border-blue-600' : ''}`}
                            >
                                <item.icon className={`${
                                    sidebarOpen ? 'w-5 h-5' : 'w-5 h-5'
                                } flex-shrink-0 transition-all duration-200 ${
                                    isActive ? 'text-blue-600' : ''
                                }`} />
                                
                                {sidebarOpen && (
                                    <div className="flex items-center justify-between w-full overflow-hidden">
                                        <span className={`font-medium transition-all duration-300 ${
                                            isActive ? 'text-blue-600' : 'text-gray-400'
                                        }`}>
                                            {item.label}
                                        </span>
                                        
                                        <div className="flex items-center space-x-2">
                                            {item.badge && (
                                                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full transition-all duration-200">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.comingSoon && !item.badge && (
                                                <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
                                            {item.count && !item.badge && !item.comingSoon && (
                                                <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                                                    {item.count}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Link>

                            {/* Tooltip for collapsed state */}
                            {!sidebarOpen && (
                                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 pointer-events-none z-50 whitespace-nowrap">
                                    <div className="flex items-center space-x-2">
                                        <span>{item.label}</span>
                                        {item.badge && (
                                            <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.count && !item.badge && !item.comingSoon && (
                                            <span className="bg-gray-600 text-white text-xs px-1.5 py-0.5 rounded">
                                                {item.count}
                                            </span>
                                        )}
                                    </div>
                                    {/* Arrow */}
                                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </nav>

            {/* Sidebar Footer */}
        
            {/* Resize handle (optional visual indicator) */}
            <div className={`absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-200 transition-colors duration-200 ${
                sidebarOpen ? 'cursor-col-resize' : ''
            }`}></div>
        </div>
    )
}

export default Sidebar