'use client'

import React, { useState } from 'react'
import {
    Menu,
    X,
    Code,
    Play,
    TestTube,
    FileText,
    Settings,
    Home,
    Layers,
    Database,
    Activity,
    Users,
    ChevronRight,
    Plus,
    Search
} from 'lucide-react'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const sidebarItems = [
        { icon: Home, label: 'Overview', active: true },
        { icon: Code, label: 'Smart Contracts', count: 12 },
        { icon: TestTube, label: 'Testing Suite', count: 8 },
        { icon: Play, label: 'Simulation', count: 5 },
        { icon: Layers, label: 'Templates', count: 24 },
        { icon: Database, label: 'Blockchain Data' },
        { icon: Activity, label: 'Analytics' },
        { icon: Users, label: 'Collaboration' },
        { icon: Settings, label: 'Settings' },
    ]

    const features = [
        {
            title: 'Smart Contract Development',
            description: 'Build and deploy smart contracts with our integrated development environment',
            icon: Code,
            color: 'bg-blue-500',
            stats: '12 Active Contracts'
        },
        {
            title: 'Contract Testing',
            description: 'Comprehensive testing suite for validating contract functionality',
            icon: TestTube,
            color: 'bg-green-500',
            stats: '98% Test Coverage'
        },
        {
            title: 'Blockchain Simulation',
            description: 'Simulate blockchain interactions in a safe testing environment',
            icon: Play,
            color: 'bg-purple-500',
            stats: '5 Active Simulations'
        },
        {
            title: 'Developer Tools',
            description: 'Advanced tooling for Stacks blockchain development workflows',
            icon: Layers,
            color: 'bg-orange-500',
            stats: '24 Tools Available'
        }
    ]

    const recentActivity = [
        { action: 'Contract deployed', name: 'token-swap.clar', time: '2 minutes ago' },
        { action: 'Test suite completed', name: 'nft-marketplace', time: '15 minutes ago' },
        { action: 'Simulation started', name: 'defi-protocol', time: '1 hour ago' },
        { action: 'Template created', name: 'voting-contract', time: '2 hours ago' },
    ]

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-white shadow-lg flex flex-col`}>
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    {sidebarOpen && (
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                                <Code className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-gray-900">StacksLab</span>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarItems.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${item.active
                                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                    : 'hover:bg-gray-50 text-gray-400'
                                }`}
                        >
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {sidebarOpen && (
                                <>
                                    <span className="flex-1 font-medium">{item.label}</span>
                                    {item.count && (
                                        <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                                            {item.count}
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                {sidebarOpen && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">Developer</div>
                                <div className="text-xs text-gray-500">Free Plan</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">Welcome to your StacksLab development environment</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search contracts, tests..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>New Contract</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-auto p-6">
                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                                <div className="text-xs text-gray-500 font-medium">{feature.stats}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {activity.action}: <span className="text-blue-600">{activity.name}</span>
                                                </div>
                                                <div className="text-xs text-gray-500">{activity.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                            </div>
                            <div className="p-6 space-y-3">
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                    <Code className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-400">Create Smart Contract</span>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                    <TestTube className="w-5 h-5 text-green-500" />
                                    <span className="text-gray-400">Run Test Suite</span>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                    <Play className="w-5 h-5 text-purple-500" />
                                    <span className="text-gray-400">Start Simulation</span>
                                </button>
                                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                                    <FileText className="w-5 h-5 text-orange-500" />
                                    <span className="text-gray-400">Browse Templates</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Development Stats */}
                    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Development Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                                <div className="text-sm text-gray-600">Active Contracts</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-600 mb-2">847</div>
                                <div className="text-sm text-gray-600">Tests Passed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
                                <div className="text-sm text-gray-600">Simulations Running</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard