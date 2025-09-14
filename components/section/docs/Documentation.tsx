// File: components/section/docs/Documentation.tsx
'use client'

import React, { useState, useEffect } from 'react'
import {
    ChevronRight,
    ChevronDown,
    Book,
    Code,
    Zap,
    Settings,
    HelpCircle,
    Search,
    ExternalLink,
    Copy,
    Check
} from 'lucide-react'

interface DocSection {
    id: string
    title: string
    icon: React.ComponentType<{ className?: string }>
    children?: DocSection[]
}

interface DocumentationProps {
    className?: string
}

const Documentation: React.FC<DocumentationProps> = ({ className = '' }) => {
    const docSections: DocSection[] = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: Book,
            children: [
                { id: 'introduction', title: 'Introduction', icon: Book },
                { id: 'quick-start', title: 'Quick Start', icon: Zap },
                { id: 'installation', title: 'Installation', icon: Settings }
            ]
        },
        {
            id: 'smart-contracts',
            title: 'Smart Contracts',
            icon: Code,
            children: [
                { id: 'clarity-basics', title: 'Clarity Basics', icon: Code },
                { id: 'contract-structure', title: 'Contract Structure', icon: Code },
                { id: 'testing', title: 'Testing Contracts', icon: Code },
                { id: 'deployment', title: 'Deployment', icon: Code }
            ]
        },
        {
            id: 'api-reference',
            title: 'API Reference',
            icon: Book,
            children: [
                { id: 'stacks-api', title: 'Stacks API', icon: Book },
                { id: 'clarity-functions', title: 'Clarity Functions', icon: Book }
            ]
        },
        {
            id: 'guides',
            title: 'Guides & Tutorials',
            icon: HelpCircle,
            children: [
                { id: 'first-contract', title: 'Your First Contract', icon: HelpCircle },
                { id: 'advanced-patterns', title: 'Advanced Patterns', icon: HelpCircle }
            ]
        }
    ]

    const [activeSection, setActiveSection] = useState('introduction')
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started', 'smart-contracts']))
    const [searchQuery, setSearchQuery] = useState('')
    const [copiedCode, setCopiedCode] = useState<string | null>(null)
    const [filteredSections, setFilteredSections] = useState(docSections)

    // Filter sections based on search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredSections(docSections)
            return
        }

        const filtered = docSections.map(section => ({
            ...section,
            children: section.children?.filter(child =>
                child.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                section.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(section =>
            section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (section.children && section.children.length > 0)
        )

        setFilteredSections(filtered)
    }, [docSections, searchQuery])

    const toggleSection = (sectionId: string) => {
        const newExpanded = new Set(expandedSections)
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId)
        } else {
            newExpanded.add(sectionId)
        }
        setExpandedSections(newExpanded)
    }

    const copyToClipboard = async (code: string, id: string) => {
        try {
            await navigator.clipboard.writeText(code)
            setCopiedCode(id)
            setTimeout(() => setCopiedCode(null), 2000)
        } catch (err) {
            console.error('Failed to copy code:', err)
        }
    }

    const renderContent = () => {
        switch (activeSection) {
            case 'introduction':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to StacksLab</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                StacksLab is a comprehensive web-based IDE for Stacks blockchain development.
                                Build, test, and deploy smart contracts with our integrated development environment.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">What is StacksLab?</h3>
                            <p className="text-blue-800">
                                StacksLab provides developers with powerful tools to create smart contracts on the Stacks blockchain,
                                featuring real-time compilation, testing frameworks, and seamless deployment capabilities.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <Code className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Contract IDE</h3>
                                <p className="text-gray-600">
                                    Monaco-based code editor with Clarity language support and syntax highlighting.
                                </p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Testing</h3>
                                <p className="text-gray-600">
                                    Built-in testing framework with simulation capabilities for contract validation.
                                </p>
                            </div>
                        </div>
                    </div>
                )

            case 'quick-start':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Get up and running with StacksLab in just a few minutes.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Connect Your Wallet</h3>
                                <p className="text-gray-600 mb-4">
                                    Connect your Stacks wallet to start developing and testing smart contracts.
                                </p>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    Connect Wallet
                                </button>
                            </div>

                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Create Your First Contract</h3>
                                <p className="text-gray-600 mb-4">
                                    Use our template to create a simple "Hello World" contract.
                                </p>
                                <div className="bg-gray-900 rounded-lg p-4 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">hello-world.clar</span>
                                        <button
                                            onClick={() => copyToClipboard(helloWorldContract, 'hello-world')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === 'hello-world' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <pre className="text-green-400 text-sm overflow-x-auto">
                                        <code>{helloWorldContract}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Test Your Contract</h3>
                                <p className="text-gray-600 mb-4">
                                    Run tests to ensure your contract works as expected.
                                </p>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <p className="text-green-800 font-medium">✓ All tests passed!</p>
                                    <p className="text-green-700 text-sm mt-1">Your contract is ready for deployment.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'clarity-basics':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Clarity Language Basics</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Learn the fundamentals of Clarity, the smart contract language for Stacks.
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-yellow-900 mb-2">What is Clarity?</h3>
                            <p className="text-yellow-800">
                                Clarity is a decidable smart contract language that optimizes for predictability and security.
                                It's designed to be more secure and predictable than other smart contract languages.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Syntax</h3>
                                <div className="bg-gray-900 rounded-lg p-4 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">basic-syntax.clar</span>
                                        <button
                                            onClick={() => copyToClipboard(basicSyntaxExample, 'basic-syntax')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === 'basic-syntax' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <pre className="text-green-400 text-sm overflow-x-auto">
                                        <code>{basicSyntaxExample}</code>
                                    </pre>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Types</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Primitive Types</h4>
                                        <ul className="text-gray-600 space-y-1 text-sm">
                                            <li>• <code className="bg-gray-100 px-1 rounded">int</code> - Signed 128-bit integer</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">uint</code> - Unsigned 128-bit integer</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">bool</code> - Boolean (true/false)</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">principal</code> - Stacks address</li>
                                        </ul>
                                    </div>
                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-900 mb-2">Composite Types</h4>
                                        <ul className="text-gray-600 space-y-1 text-sm">
                                            <li>• <code className="bg-gray-100 px-1 rounded">list</code> - Ordered collection</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">tuple</code> - Named fields</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">optional</code> - May contain value</li>
                                            <li>• <code className="bg-gray-100 px-1 rounded">response</code> - Success or error</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'installation':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Installation & Setup</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Get StacksLab running on your system with these simple installation steps.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Web-Based IDE</h3>
                            <p className="text-blue-800">
                                StacksLab runs entirely in your browser - no installation required!
                                Simply visit our platform and start coding immediately.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">System Requirements</h3>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <ul className="space-y-2 text-gray-600">
                                        <li>• Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                                        <li>• Stable internet connection</li>
                                        <li>• Stacks wallet extension (Hiro Wallet recommended)</li>
                                        <li>• Minimum 4GB RAM for optimal performance</li>
                                    </ul>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Wallet Setup</h3>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-green-500 pl-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">1. Install Hiro Wallet</h4>
                                        <p className="text-gray-600 mb-3">Download and install the Hiro Wallet browser extension.</p>
                                        <a href="https://wallet.hiro.so/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                            <ExternalLink className="w-4 h-4" />
                                            Download Hiro Wallet
                                        </a>
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">2. Create or Import Wallet</h4>
                                        <p className="text-gray-600">Set up your wallet with a secure seed phrase or import an existing one.</p>
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">3. Connect to StacksLab</h4>
                                        <p className="text-gray-600">Click "Connect Wallet" in StacksLab to link your wallet.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'contract-structure':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contract Structure</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Learn how to structure and organize your Clarity smart contracts effectively.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Basic Contract Template</h3>
                                <div className="bg-gray-900 rounded-lg p-4 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">contract-template.clar</span>
                                        <button
                                            onClick={() => copyToClipboard(contractTemplate, 'contract-template')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === 'contract-template' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <pre className="text-green-400 text-sm overflow-x-auto">
                                        <code>{contractTemplate}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Contract Elements</h4>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li>• <strong>Constants:</strong> Immutable values</li>
                                        <li>• <strong>Data Variables:</strong> Mutable state</li>
                                        <li>• <strong>Data Maps:</strong> Key-value storage</li>
                                        <li>• <strong>Public Functions:</strong> External calls</li>
                                        <li>• <strong>Read-only Functions:</strong> View functions</li>
                                        <li>• <strong>Private Functions:</strong> Internal logic</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Best Practices</h4>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li>• Use descriptive function names</li>
                                        <li>• Validate inputs early</li>
                                        <li>• Handle errors gracefully</li>
                                        <li>• Keep functions focused</li>
                                        <li>• Document complex logic</li>
                                        <li>• Test thoroughly</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'testing':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Testing Contracts</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Learn how to write comprehensive tests for your Clarity smart contracts.
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-green-900 mb-2">Testing Framework</h3>
                            <p className="text-green-800">
                                StacksLab includes a built-in testing framework that allows you to simulate contract interactions
                                and verify behavior before deployment.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Test Example</h3>
                                <div className="bg-gray-900 rounded-lg p-4 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">counter-test.ts</span>
                                        <button
                                            onClick={() => copyToClipboard(testExample, 'test-example')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === 'test-example' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <pre className="text-blue-400 text-sm overflow-x-auto">
                                        <code>{testExample}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Unit Tests</h4>
                                    <p className="text-gray-600 text-sm">Test individual functions in isolation</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Integration Tests</h4>
                                    <p className="text-gray-600 text-sm">Test contract interactions</p>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">Edge Cases</h4>
                                    <p className="text-gray-600 text-sm">Test error conditions and limits</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'deployment':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contract Deployment</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Deploy your tested smart contracts to the Stacks blockchain.
                            </p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-orange-900 mb-2">Deployment Process</h3>
                            <p className="text-orange-800">
                                Deployment requires STX tokens for transaction fees. Make sure your wallet has sufficient balance
                                before deploying to mainnet.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Testnet Deployment</h4>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li>• Free STX from faucet</li>
                                        <li>• Test all functionality</li>
                                        <li>• Verify contract behavior</li>
                                        <li>• No real value at risk</li>
                                    </ul>
                                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                                        Deploy to Testnet
                                    </button>
                                </div>
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-900 mb-3">Mainnet Deployment</h4>
                                    <ul className="space-y-2 text-gray-600 text-sm">
                                        <li>• Requires real STX</li>
                                        <li>• Production environment</li>
                                        <li>• Immutable once deployed</li>
                                        <li>• Real economic value</li>
                                    </ul>
                                    <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors">
                                        Deploy to Mainnet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'stacks-api':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Stacks API Reference</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Complete reference for interacting with the Stacks blockchain API.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Blockchain Data</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/blocks</code> - Get blocks</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/tx</code> - Get transactions</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/address</code> - Address info</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/names</code> - BNS names</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Smart Contracts</h3>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/contracts</code> - Contract info</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/call-read-only</code> - Read functions</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/map_entry</code> - Map data</li>
                                    <li>• <code className="bg-gray-100 px-1 rounded">/v1/data_var</code> - Variable data</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )

            case 'clarity-functions':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Clarity Functions Reference</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Complete reference for built-in Clarity functions and their usage.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Arithmetic</h4>
                                <ul className="space-y-1 text-gray-600 text-sm">
                                    <li><code className="bg-gray-100 px-1 rounded">+</code> Addition</li>
                                    <li><code className="bg-gray-100 px-1 rounded">-</code> Subtraction</li>
                                    <li><code className="bg-gray-100 px-1 rounded">*</code> Multiplication</li>
                                    <li><code className="bg-gray-100 px-1 rounded">/</code> Division</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Comparison</h4>
                                <ul className="space-y-1 text-gray-600 text-sm">
                                    <li><code className="bg-gray-100 px-1 rounded">is-eq</code> Equality</li>
                                    <li><code className="bg-gray-100 px-1 rounded">&lt;</code> Less than</li>
                                    <li><code className="bg-gray-100 px-1 rounded">&gt;</code> Greater than</li>
                                    <li><code className="bg-gray-100 px-1 rounded">&lt;=</code> Less or equal</li>
                                </ul>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Control Flow</h4>
                                <ul className="space-y-1 text-gray-600 text-sm">
                                    <li><code className="bg-gray-100 px-1 rounded">if</code> Conditional</li>
                                    <li><code className="bg-gray-100 px-1 rounded">begin</code> Sequence</li>
                                    <li><code className="bg-gray-100 px-1 rounded">let</code> Local binding</li>
                                    <li><code className="bg-gray-100 px-1 rounded">match</code> Pattern match</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )

            case 'first-contract':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your First Contract</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Step-by-step tutorial to create, test, and deploy your first Clarity smart contract.
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Tutorial Overview</h3>
                            <p className="text-blue-800">
                                We'll build a simple counter contract that demonstrates the core concepts of Clarity development.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 1: Create the Contract</h3>
                                <div className="bg-gray-900 rounded-lg p-4 relative">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-400 text-sm">my-first-contract.clar</span>
                                        <button
                                            onClick={() => copyToClipboard(firstContractExample, 'first-contract')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {copiedCode === 'first-contract' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <pre className="text-green-400 text-sm overflow-x-auto">
                                        <code>{firstContractExample}</code>
                                    </pre>
                                </div>
                            </div>

                            <div className="border-l-4 border-green-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 2: Test the Contract</h3>
                                <p className="text-gray-600 mb-4">
                                    Use StacksLab's testing framework to verify your contract works correctly.
                                </p>
                                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                                    Run Tests
                                </button>
                            </div>

                            <div className="border-l-4 border-purple-500 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Step 3: Deploy</h3>
                                <p className="text-gray-600 mb-4">
                                    Deploy your contract to testnet first, then to mainnet when ready.
                                </p>
                                <div className="flex gap-3">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                        Deploy to Testnet
                                    </button>
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors">
                                        Deploy to Mainnet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'advanced-patterns':
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Advanced Patterns</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Learn advanced Clarity patterns and best practices for complex smart contracts.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Access Control</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Implement role-based permissions and ownership patterns.
                                </p>
                                <div className="bg-gray-100 rounded p-3">
                                    <code className="text-sm text-gray-800">
                                        (asserts! (is-eq tx-sender contract-owner) (err u403))
                                    </code>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Upgradeable Contracts</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Design contracts that can be upgraded while preserving state.
                                </p>
                                <div className="bg-gray-100 rounded p-3">
                                    <code className="text-sm text-gray-800">
                                        (define-data-var implementation principal tx-sender)
                                    </code>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Multi-Signature</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Require multiple signatures for critical operations.
                                </p>
                                <div className="bg-gray-100 rounded p-3">
                                    <code className="text-sm text-gray-800">
                                        (define-map signatures uint (list 10 principal))
                                    </code>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Token Standards</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Implement SIP-009 NFTs and SIP-010 fungible tokens.
                                </p>
                                <div className="bg-gray-100 rounded p-3">
                                    <code className="text-sm text-gray-800">
                                        (impl-trait .sip-010-trait.sip-010-trait)
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            default:
                return (
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Documentation</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Select a topic from the sidebar to get started with StacksLab documentation.
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Choose a section from the navigation to begin learning.</p>
                        </div>
                    </div>
                )
        }
    }

    const helloWorldContract = `(define-public (say-hello)
  (ok "Hello, World!"))

(define-read-only (get-greeting)
  "Hello from StacksLab!")`

    const basicSyntaxExample = `(define-constant CONTRACT_OWNER tx-sender)

(define-data-var counter uint u0)

(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

(define-read-only (get-counter)
  (var-get counter))`

    const contractTemplate = `;; Contract: Example Template
;; Description: A basic contract structure template

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_UNAUTHORIZED (err u100))
(define-constant ERR_INVALID_INPUT (err u101))

;; Data Variables
(define-data-var contract-name (string-ascii 50) "Example Contract")
(define-data-var is-active bool true)

;; Data Maps
(define-map user-data principal {
  balance: uint,
  last-action: uint
})

;; Private Functions
(define-private (is-owner)
  (is-eq tx-sender CONTRACT_OWNER))

;; Read-Only Functions
(define-read-only (get-contract-info)
  {
    name: (var-get contract-name),
    active: (var-get is-active),
    owner: CONTRACT_OWNER
  })

;; Public Functions
(define-public (update-name (new-name (string-ascii 50)))
  (begin
    (asserts! (is-owner) ERR_UNAUTHORIZED)
    (var-set contract-name new-name)
    (ok true)))`

    const testExample = `import { describe, expect, it } from 'vitest';

describe('Counter Contract Tests', () => {
  it('should initialize with zero', async () => {
    const result = await simnet.callReadOnlyFn(
      'counter',
      'get-counter',
      [],
      address1
    );
    expect(result.result).toBe('u0');
  });

  it('should increment counter', async () => {
    const { result } = await simnet.callPublicFn(
      'counter',
      'increment',
      [],
      address1
    );
    expect(result).toBe('(ok u1)');
  });

  it('should handle multiple increments', async () => {
    await simnet.callPublicFn('counter', 'increment', [], address1);
    await simnet.callPublicFn('counter', 'increment', [], address1);
    
    const result = await simnet.callReadOnlyFn(
      'counter',
      'get-counter',
      [],
      address1
    );
    expect(result.result).toBe('u2');
  });
});`

    const firstContractExample = `;; My First Contract - A Simple Counter
;; This contract demonstrates basic Clarity concepts

;; Define a counter variable starting at 0
(define-data-var counter uint u0)

;; Define the contract owner
(define-constant CONTRACT_OWNER tx-sender)

;; Error constants
(define-constant ERR_UNAUTHORIZED (err u100))

;; Public function to increment the counter
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))))

;; Public function to decrement the counter
(define-public (decrement)
  (let ((current-value (var-get counter)))
    (if (> current-value u0)
      (begin
        (var-set counter (- current-value u1))
        (ok (var-get counter)))
      (err u101)))) ;; Cannot go below zero

;; Read-only function to get current counter value
(define-read-only (get-counter)
  (var-get counter))

;; Admin function to reset counter (only owner)
(define-public (reset-counter)
  (begin
    (asserts! (is-eq tx-sender CONTRACT_OWNER) ERR_UNAUTHORIZED)
    (var-set counter u0)
    (ok true)))`

    return (
        <div className={`min-h-screen bg-gray-50 ${className}`}>
            <div className="flex h-screen">
                {/* Left Sidebar */}
                <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
                    {/* Search */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="text-gray-700 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 flex-1 overflow-y-auto">
                        <div className="space-y-2">
                            {filteredSections.map((section) => (
                                <div key={section.id}>
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className="flex items-center justify-between w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <section.icon className="w-4 h-4 text-gray-500" />
                                            <span className="font-medium">{section.title}</span>
                                        </div>
                                        {section.children && (
                                            expandedSections.has(section.id) ?
                                                <ChevronDown className="w-4 h-4 text-gray-400" /> :
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Subsections */}
                                    {section.children && expandedSections.has(section.id) && (
                                        <div className="ml-4 mt-2 space-y-1">
                                            {section.children.map((child) => (
                                                <button
                                                    key={child.id}
                                                    onClick={() => setActiveSection(child.id)}
                                                    className={`flex items-center space-x-3 w-full px-3 py-2 text-left text-sm rounded-lg transition-colors ${activeSection === child.id
                                                        ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    <child.icon className="w-4 h-4" />
                                                    <span>{child.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* Footer Links */}
                    <div className="p-4 border-t border-gray-200 bg-white mt-auto">
                        <div className="space-y-2">
                            <a
                                href="https://github.com/StacksLab-org"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>GitHub Repository</span>
                            </a>
                            <a
                                href="https://docs.stacks.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <Book className="w-4 h-4" />
                                <span>Stacks Documentation</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <HelpCircle className="w-4 h-4" />
                                <span>Get Help</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-8">
                        <div className="max-w-4xl mx-auto">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Documentation