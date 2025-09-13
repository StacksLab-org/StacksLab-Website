'use client'

import React from 'react'
import { 
  Code, 
  Play, 
  TestTube, 
  Layers,
  Activity,
  ChevronRight,
  Plus,
  Search,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react'

const Dashboard = () => {
  const features = [
    {
      title: 'Smart Contracts',
      description: 'Build and deploy smart contracts with our integrated development environment',
      icon: Code,
      color: 'bg-blue-500',
      stats: '12 Active',
      href: '/dashboard/contracts'
    },
    {
      title: 'Testing Suite',
      description: 'Comprehensive testing suite for validating contract functionality',
      icon: TestTube,
      color: 'bg-green-500',
      stats: '98% Coverage',
      href: '/dashboard/testing'
    },
    {
      title: 'Simulation',
      description: 'Simulate blockchain interactions in a safe testing environment',
      icon: Play,
      color: 'bg-purple-500',
      stats: '5 Running',
      href: '/dashboard/simulation'
    },
    {
      title: 'Templates',
      description: 'Pre-built contract templates to accelerate your development',
      icon: Layers,
      color: 'bg-orange-500',
      stats: '24 Available',
      href: '/dashboard/templates'
    }
  ]

  const recentActivity = [
    { action: 'Contract deployed', name: 'token-swap.clar', time: '2 minutes ago', status: 'success' },
    { action: 'Test suite completed', name: 'nft-marketplace', time: '15 minutes ago', status: 'success' },
    { action: 'Simulation started', name: 'defi-protocol', time: '1 hour ago', status: 'running' },
    { action: 'Template created', name: 'voting-contract', time: '2 hours ago', status: 'success' },
  ]

  const quickStats = [
    { label: 'Active Contracts', value: '12', change: '+2', trend: 'up' },
    { label: 'Tests Passed', value: '847', change: '+23', trend: 'up' },
    { label: 'Simulations', value: '5', change: '0', trend: 'neutral' },
    { label: 'Success Rate', value: '98%', change: '+1%', trend: 'up' },
  ]

  return (
    <>
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
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.href}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-blue-200 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
              <div className="text-xs text-gray-500 font-medium">{feature.stats}</div>
            </a>
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
                    <div className="flex-shrink-0">
                      {activity.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {activity.status === 'running' && <Activity className="w-5 h-5 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.action}: <span className="text-blue-600">{activity.name}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{activity.time}</span>
                      </div>
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
              <a
                href="/dashboard/contracts"
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3 group"
              >
                <Code className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400">Create Smart Contract</span>
              </a>
              <a
                href="/dashboard/testing"
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3 group"
              >
                <TestTube className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400">Run Test Suite</span>
              </a>
              <a
                href="/dashboard/simulation"
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3 group"
              >
                <Play className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400">Start Simulation</span>
              </a>
              <a
                href="/dashboard/templates"
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3 group"
              >
                <Layers className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400">Browse Templates</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard