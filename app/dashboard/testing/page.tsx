'use client'

import React from 'react'
import {
  TestTube,
  Play,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  FileText,
  Plus
} from 'lucide-react'

const TestingPage = () => {
  const testSuites = [
    {
      id: 1,
      name: 'Token Swap Tests',
      contract: 'token-swap.clar',
      status: 'passed',
      tests: 12,
      passed: 12,
      failed: 0,
      coverage: 98,
      duration: '2.3s',
      lastRun: '5 minutes ago'
    },
    {
      id: 2,
      name: 'NFT Marketplace Tests',
      contract: 'nft-marketplace.clar',
      status: 'running',
      tests: 24,
      passed: 18,
      failed: 0,
      coverage: 75,
      duration: '4.1s',
      lastRun: 'Running...'
    },
    {
      id: 3,
      name: 'Voting DAO Tests',
      contract: 'voting-dao.clar',
      status: 'failed',
      tests: 8,
      passed: 6,
      failed: 2,
      coverage: 87,
      duration: '1.8s',
      lastRun: '2 hours ago'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />
      case 'running': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />
      default: return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'running': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testing Suite</h1>
            <p className="text-gray-600 mt-1">Run comprehensive tests for your smart contracts</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Play className="w-4 h-4" />
              <span>Run All Tests</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Test</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Tests</p>
                <p className="text-2xl font-bold text-gray-900">44</p>
              </div>
              <TestTube className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Passed</p>
                <p className="text-2xl font-bold text-green-600">36</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Failed</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Coverage</p>
                <p className="text-2xl font-bold text-blue-600">87%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Test Suites */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Test Suites</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {testSuites.map((suite) => (
              <div key={suite.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(suite.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{suite.name}</h3>
                      <p className="text-sm text-gray-600">{suite.contract}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{suite.tests}</div>
                      <div className="text-xs text-gray-500">Tests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-green-600">{suite.passed}</div>
                      <div className="text-xs text-gray-500">Passed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-red-600">{suite.failed}</div>
                      <div className="text-xs text-gray-500">Failed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-blue-600">{suite.coverage}%</div>
                      <div className="text-xs text-gray-500">Coverage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">{suite.duration}</div>
                      <div className="text-xs text-gray-500">Duration</div>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(suite.status)}`}>
                        {suite.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">{suite.lastRun}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Play className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <FileText className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Test Progress</span>
                    <span>{suite.passed}/{suite.tests}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${suite.status === 'passed' ? 'bg-green-500' :
                        suite.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                      style={{ width: `${(suite.passed / suite.tests) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">All tests passed for token-swap.clar</div>
                  <div className="text-xs text-gray-500">12/12 tests • 98% coverage • 2.3s</div>
                </div>
                <div className="text-xs text-gray-500">5 minutes ago</div>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-red-50 rounded-lg">
                <XCircle className="w-5 h-5 text-red-500" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">2 tests failed for voting-dao.clar</div>
                  <div className="text-xs text-gray-500">6/8 tests • 87% coverage • 1.8s</div>
                </div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default TestingPage