// File: components/section/demo/CodeDemo.tsx
'use client'

import React, { useState } from 'react'
import { Copy, Play, CheckCircle } from 'lucide-react'

const CodeDemo: React.FC = () => {
  const [copied, setCopied] = useState(false)

  const sampleCode = `(define-public (transfer (amount uint) (recipient principal))
  (begin
    (asserts! (> amount u0) (err u1))
    (asserts! (>= (get-balance tx-sender) amount) (err u2))
    (try! (ft-transfer? stackslab-token amount tx-sender recipient))
    (ok true)
  )
)

(define-read-only (get-balance (account principal))
  (ft-get-balance stackslab-token account)
)`

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Write Clarity contracts with confidence
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Our interactive environment lets you write, test, and debug Clarity smart contracts 
              with real-time feedback. See your code in action before deploying to mainnet.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Syntax highlighting and auto-completion</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Real-time error detection</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                <span className="text-gray-300">Interactive testing environment</span>
              </div>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200">
              Try the Editor
            </button>
          </div>

          {/* Right Content - Code Editor */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            {/* Editor Header */}
            <div className="bg-gray-700 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm">token-contract.clar</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Play className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4 font-mono text-sm">
              <pre className="text-gray-300 leading-relaxed">
                <code>
                  <span className="text-purple-400">(define-public</span> <span className="text-blue-400">(transfer</span> <span className="text-yellow-400">(amount uint)</span> <span className="text-yellow-400">(recipient principal)</span><span className="text-blue-400">)</span>
                  {'\n'}  <span className="text-purple-400">(begin</span>
                  {'\n'}    <span className="text-purple-400">(asserts!</span> <span className="text-blue-400">(&gt; amount u0)</span> <span className="text-red-400">(err u1)</span><span className="text-purple-400">)</span>
                  {'\n'}    <span className="text-purple-400">(asserts!</span> <span className="text-blue-400">(&gt;= (get-balance tx-sender) amount)</span> <span className="text-red-400">(err u2)</span><span className="text-purple-400">)</span>
                  {'\n'}    <span className="text-purple-400">(try!</span> <span className="text-blue-400">(ft-transfer? stackslab-token amount tx-sender recipient)</span><span className="text-purple-400">)</span>
                  {'\n'}    <span className="text-green-400">(ok true)</span>
                  {'\n'}  <span className="text-purple-400">)</span>
                  {'\n'}<span className="text-purple-400">)</span>
                  {'\n'}
                  {'\n'}<span className="text-purple-400">(define-read-only</span> <span className="text-blue-400">(get-balance</span> <span className="text-yellow-400">(account principal)</span><span className="text-blue-400">)</span>
                  {'\n'}  <span className="text-blue-400">(ft-get-balance stackslab-token account)</span>
                  {'\n'}<span className="text-purple-400">)</span>
                </code>
              </pre>
            </div>

            {/* Status Bar */}
            <div className="bg-gray-700 px-4 py-2 text-xs text-gray-400 flex items-center justify-between">
              <span>✓ No errors found</span>
              <span>Clarity • 12 lines</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CodeDemo