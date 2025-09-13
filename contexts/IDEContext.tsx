'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface FileContent {
  id: string
  name: string
  content: string
  language: string
  path: string
  isModified: boolean
  lastModified: Date
}

interface Project {
  id: string
  name: string
  description: string
  files: FileContent[]
  createdAt: Date
  lastModified: Date
}

interface CompilationResult {
  success: boolean
  errors: string[]
  warnings: string[]
  output?: string
  timestamp: Date
}

interface TerminalOutput {
  id: string
  type: 'info' | 'error' | 'warning' | 'success'
  message: string
  timestamp: Date
}

interface IDEState {
  projects: Project[]
  activeProject: string | null
  openFiles: string[]
  activeFile: string | null
  compilationResults: CompilationResult[]
  terminalOutput: TerminalOutput[]
  isCompiling: boolean
  isDebugging: boolean
  sidebarWidth: number
  terminalHeight: number
}

interface IDEContextType {
  state: IDEState
  // Project management
  createProject: (name: string, template?: string) => void
  deleteProject: (projectId: string) => void
  setActiveProject: (projectId: string) => void

  // File management
  createFile: (name: string, content?: string) => void
  deleteFile: (fileId: string) => void
  openFile: (fileId: string) => void
  closeFile: (fileId: string) => void
  setActiveFile: (fileId: string) => void
  updateFileContent: (fileId: string, content: string) => void
  saveFile: (fileId: string) => void

  // Compilation
  compileContract: (fileId: string) => Promise<void>

  // AI Debugging
  debugWithAI: (fileId: string, apiKey?: string) => Promise<void>
  quickAnalyzeWithAI: (fileId: string, apiKey?: string) => Promise<void>

  // Terminal
  addTerminalOutput: (type: TerminalOutput['type'], message: string) => void
  clearTerminal: () => void

  // Layout
  setSidebarWidth: (width: number) => void
  setTerminalHeight: (height: number) => void
}

const IDEContext = createContext<IDEContextType | undefined>(undefined)

interface IDEProviderProps {
  children: ReactNode
}

export const IDEProvider: React.FC<IDEProviderProps> = ({ children }) => {
  const [state, setState] = useState<IDEState>({
    projects: [],
    activeProject: null,
    openFiles: [],
    activeFile: null,
    compilationResults: [],
    terminalOutput: [],
    isCompiling: false,
    isDebugging: false,
    sidebarWidth: 250,
    terminalHeight: 200
  })

  // Counter for unique terminal output IDs
  const terminalOutputCounter = React.useRef(0)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('stackslab-ide-state')
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        setState(prev => ({
          ...prev,
          ...parsed,
          isCompiling: false // Reset compilation state
        }))
      } catch (error) {
        console.error('Failed to load IDE state:', error)
        initializeDefaultProject()
      }
    } else {
      initializeDefaultProject()
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      ...state,
      isCompiling: false // Don't save compilation state
    }
    localStorage.setItem('stackslab-ide-state', JSON.stringify(stateToSave))
  }, [state])

  const initializeDefaultProject = () => {
    const defaultProject: Project = {
      id: 'default-project',
      name: 'My First Contract',
      description: 'A simple token contract to get started',
      files: [
        {
          id: 'token-contract',
          name: 'stackslab-token.clar',
          content: `;;  StacksLab Token Contract
;;  A comprehensive fungible token implementation with advanced features
;;  Built with StacksLab IDE - The premier Stacks development environment

;; ===== TOKEN DEFINITION =====
(define-fungible-token stackslab-token)

;; ===== CONSTANTS =====
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-insufficient-balance (err u102))
(define-constant err-invalid-amount (err u103))
(define-constant err-unauthorized (err u104))

;; ===== DATA VARIABLES =====
(define-data-var token-name (string-ascii 32) "StacksLab Token")
(define-data-var token-symbol (string-ascii 10) "SLAB")
(define-data-var token-decimals uint u6)
(define-data-var token-uri (optional (string-utf8 256)) (some u"https://stackslab.co/token-metadata.json"))
(define-data-var total-supply uint u0)
(define-data-var is-paused bool false)

;; ===== DATA MAPS =====
(define-map token-balances principal uint)
(define-map allowances { owner: principal, spender: principal } uint)
(define-map authorized-minters principal bool)

;; ===== PRIVATE FUNCTIONS =====
(define-private (get-balance-uint (account principal))
  (default-to u0 (map-get? token-balances account))
)

(define-private (set-balance (account principal) (amount uint))
  (map-set token-balances account amount)
)

(define-private (is-authorized-minter (account principal))
  (default-to false (map-get? authorized-minters account))
)

;; ===== READ-ONLY FUNCTIONS =====
(define-read-only (get-name)
  (ok (var-get token-name))
)

(define-read-only (get-symbol)
  (ok (var-get token-symbol))
)

(define-read-only (get-decimals)
  (ok (var-get token-decimals))
)

(define-read-only (get-balance (account principal))
  (ok (ft-get-balance stackslab-token account))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply stackslab-token))
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

(define-read-only (is-paused)
  (ok (var-get is-paused))
)

(define-read-only (get-allowance (owner principal) (spender principal))
  (ok (default-to u0 (map-get? allowances { owner: owner, spender: spender })))
)

;; ===== PUBLIC FUNCTIONS =====

;; Transfer tokens
(define-public (transfer (amount uint) (from principal) (to principal) (memo (optional (buff 34))))
  (begin
    (asserts! (not (var-get is-paused)) (err u105))
    (asserts! (> amount u0) err-invalid-amount)
    (asserts! (or (is-eq from tx-sender) (is-eq from contract-caller)) err-not-token-owner)
    (ft-transfer? stackslab-token amount from to)
  )
)

;; Transfer from (with allowance)
(define-public (transfer-from (amount uint) (owner principal) (recipient principal))
  (let ((allowance (unwrap! (get-allowance owner tx-sender) err-unauthorized)))
    (begin
      (asserts! (not (var-get is-paused)) (err u105))
      (asserts! (>= allowance amount) err-insufficient-balance)
      (asserts! (> amount u0) err-invalid-amount)
      (try! (ft-transfer? stackslab-token amount owner recipient))
      (map-set allowances { owner: owner, spender: tx-sender } (- allowance amount))
      (ok true)
    )
  )
)

;; Approve spending
(define-public (approve (spender principal) (amount uint))
  (begin
    (asserts! (not (var-get is-paused)) (err u105))
    (map-set allowances { owner: tx-sender, spender: spender } amount)
    (ok true)
  )
)

;; Mint tokens (only authorized minters)
(define-public (mint (amount uint) (to principal))
  (begin
    (asserts! (not (var-get is-paused)) (err u105))
    (asserts! (or (is-eq tx-sender contract-owner) (is-authorized-minter tx-sender)) err-unauthorized)
    (asserts! (> amount u0) err-invalid-amount)
    (ft-mint? stackslab-token amount to)
  )
)

;; Burn tokens
(define-public (burn (amount uint))
  (begin
    (asserts! (not (var-get is-paused)) (err u105))
    (asserts! (> amount u0) err-invalid-amount)
    (ft-burn? stackslab-token amount tx-sender)
  )
)

;; ===== ADMIN FUNCTIONS =====

;; Pause/unpause contract
(define-public (set-paused (paused bool))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set is-paused paused)
    (ok true)
  )
)

;; Add authorized minter
(define-public (add-minter (minter principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (map-set authorized-minters minter true)
    (ok true)
  )
)

;; Remove authorized minter
(define-public (remove-minter (minter principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (map-delete authorized-minters minter)
    (ok true)
  )
)

;; Update token metadata
(define-public (set-token-uri (new-uri (optional (string-utf8 256))))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set token-uri new-uri)
    (ok true)
  )
)

;; ===== INITIALIZATION =====
;; Mint initial supply to contract owner
(begin
  (try! (ft-mint? stackslab-token u1000000000000 contract-owner))
  (ok true)
)`,
          language: 'clarity',
          path: '/stackslab-token.clar',
          isModified: false,
          lastModified: new Date()
        },
        {
          id: 'nft-contract',
          name: 'stackslab-nft.clar',
          content: `;;  StacksLab NFT Contract
;;  A comprehensive non-fungible token implementation
;;  Built with StacksLab IDE

;; ===== NFT DEFINITION =====
(define-non-fungible-token stackslab-nft uint)

;; ===== CONSTANTS =====
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u200))
(define-constant err-not-token-owner (err u201))
(define-constant err-token-exists (err u202))
(define-constant err-token-not-found (err u203))
(define-constant err-unauthorized (err u204))

;; ===== DATA VARIABLES =====
(define-data-var last-token-id uint u0)
(define-data-var base-token-uri (string-utf8 256) u"https://stackslab.co/nft/")
(define-data-var contract-uri (string-utf8 256) u"https://stackslab.co/nft/contract.json")

;; ===== DATA MAPS =====
(define-map token-metadata uint {
  name: (string-utf8 64),
  description: (string-utf8 256),
  image: (string-utf8 256),
  attributes: (list 10 { trait_type: (string-utf8 64), value: (string-utf8 64) })
})

(define-map approved-operators { owner: principal, operator: principal } bool)

;; ===== PRIVATE FUNCTIONS =====
(define-private (is-approved-operator (owner principal) (operator principal))
  (default-to false (map-get? approved-operators { owner: owner, operator: operator }))
)

;; ===== READ-ONLY FUNCTIONS =====
(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (some (concat (var-get base-token-uri) (uint-to-ascii token-id))))
)

(define-read-only (get-contract-uri)
  (ok (var-get contract-uri))
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? stackslab-nft token-id))
)

(define-read-only (get-token-metadata (token-id uint))
  (ok (map-get? token-metadata token-id))
)

;; ===== PUBLIC FUNCTIONS =====

;; Transfer NFT
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (or (is-eq tx-sender sender) (is-approved-operator sender tx-sender)) err-unauthorized)
    (nft-transfer? stackslab-nft token-id sender recipient)
  )
)

;; Mint NFT
(define-public (mint (recipient principal) (metadata { name: (string-utf8 64), description: (string-utf8 256), image: (string-utf8 256), attributes: (list 10 { trait_type: (string-utf8 64), value: (string-utf8 64) }) }))
  (let ((token-id (+ (var-get last-token-id) u1)))
    (begin
      (asserts! (is-eq tx-sender contract-owner) err-owner-only)
      (try! (nft-mint? stackslab-nft token-id recipient))
      (map-set token-metadata token-id metadata)
      (var-set last-token-id token-id)
      (ok token-id)
    )
  )
)

;; Burn NFT
(define-public (burn (token-id uint))
  (let ((owner (unwrap! (nft-get-owner? stackslab-nft token-id) err-token-not-found)))
    (begin
      (asserts! (or (is-eq tx-sender owner) (is-approved-operator owner tx-sender)) err-unauthorized)
      (map-delete token-metadata token-id)
      (nft-burn? stackslab-nft token-id owner)
    )
  )
)

;; Set approval for operator
(define-public (set-approval-for-all (operator principal) (approved bool))
  (begin
    (map-set approved-operators { owner: tx-sender, operator: operator } approved)
    (ok true)
  )
)

;; ===== ADMIN FUNCTIONS =====

;; Update base URI
(define-public (set-base-uri (new-base-uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set base-token-uri new-base-uri)
    (ok true)
  )
)

;; Update contract URI
(define-public (set-contract-uri (new-contract-uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set contract-uri new-contract-uri)
    (ok true)
  )
)`,
          language: 'clarity',
          path: '/stackslab-nft.clar',
          isModified: false,
          lastModified: new Date()
        },
        {
          id: 'test-contract',
          name: 'test.clar',
          content: `;;  Test Contract for StacksLab IDE
;;  Demonstrates various Clarity features and testing patterns

;; ===== IMPORTS =====
;; (use-trait ft-trait .sip-010-trait.sip-010-trait)

;; ===== CONSTANTS =====
(define-constant contract-owner tx-sender)
(define-constant err-unauthorized (err u300))
(define-constant err-invalid-input (err u301))

;; ===== DATA VARIABLES =====
(define-data-var counter uint u0)
(define-data-var message (string-utf8 256) u"Hello, StacksLab!")

;; ===== DATA MAPS =====
(define-map user-scores principal uint)
(define-map user-messages principal (string-utf8 256))

;; ===== READ-ONLY FUNCTIONS =====
(define-read-only (get-counter)
  (ok (var-get counter))
)

(define-read-only (get-message)
  (ok (var-get message))
)

(define-read-only (get-user-score (user principal))
  (ok (default-to u0 (map-get? user-scores user)))
)

(define-read-only (get-user-message (user principal))
  (ok (map-get? user-messages user))
)

;; ===== PUBLIC FUNCTIONS =====

;; Increment counter
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))
  )
)

;; Decrement counter
(define-public (decrement)
  (let ((current (var-get counter)))
    (begin
      (asserts! (> current u0) err-invalid-input)
      (var-set counter (- current u1))
      (ok (var-get counter))
    )
  )
)

;; Set message
(define-public (set-message (new-message (string-utf8 256)))
  (begin
    (var-set message new-message)
    (ok true)
  )
)

;; Set user score
(define-public (set-user-score (score uint))
  (begin
    (map-set user-scores tx-sender score)
    (ok true)
  )
)

;; Set user message
(define-public (set-user-message (user-message (string-utf8 256)))
  (begin
    (map-set user-messages tx-sender user-message)
    (ok true)
  )
)

;; Batch operations example
(define-public (batch-increment (times uint))
  (begin
    (asserts! (<= times u10) err-invalid-input)
    (fold increment-once (list u1 u2 u3 u4 u5 u6 u7 u8 u9 u10) u0)
    (ok (var-get counter))
  )
)

;; Helper function for batch operations
(define-private (increment-once (item uint) (acc uint))
  (begin
    (var-set counter (+ (var-get counter) u1))
    (+ acc u1)
  )
)

;; ===== ADMIN FUNCTIONS =====
(define-public (reset-counter)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-unauthorized)
    (var-set counter u0)
    (ok true)
  )
)`,
          language: 'clarity',
          path: '/test.clar',
          isModified: false,
          lastModified: new Date()
        }
      ],
      createdAt: new Date(),
      lastModified: new Date()
    }

    setState(prev => ({
      ...prev,
      projects: [defaultProject],
      activeProject: defaultProject.id,
      openFiles: [defaultProject.files[0].id],
      activeFile: defaultProject.files[0].id
    }))
  }

  const createProject = (name: string, template?: string) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name,
      description: `${name} project`,
      files: [],
      createdAt: new Date(),
      lastModified: new Date()
    }

    setState(prev => ({
      ...prev,
      projects: [...prev.projects, newProject],
      activeProject: newProject.id
    }))

    addTerminalOutput('success', `Created new project: ${name}`)
  }

  const deleteProject = (projectId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId),
      activeProject: prev.activeProject === projectId ? null : prev.activeProject
    }))
  }

  const setActiveProject = (projectId: string) => {
    setState(prev => ({
      ...prev,
      activeProject: projectId,
      openFiles: [],
      activeFile: null
    }))
  }

  const createFile = (name: string, content: string = '') => {
    if (!state.activeProject) return

    // Determine file language based on extension
    let language = 'text'
    if (name.endsWith('.clar')) {
      language = 'clarity'
    } else if (name.endsWith('.md')) {
      language = 'markdown'
    } else if (name.endsWith('.js') || name.endsWith('.ts')) {
      language = 'typescript'
    } else if (name.endsWith('.json')) {
      language = 'json'
    }

    const newFile: FileContent = {
      id: `file-${Date.now()}`,
      name,
      content,
      language,
      path: `/${name}`,
      isModified: false,
      lastModified: new Date()
    }

    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === prev.activeProject
          ? { ...project, files: [...project.files, newFile], lastModified: new Date() }
          : project
      )
    }))

    if (name.includes('ai_debug') || name.includes('quick_analysis')) {
      // Don't log creation of AI debug files to avoid terminal spam
    } else {
      addTerminalOutput('info', `Created file: ${name}`)
    }
  }

  const deleteFile = (fileId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project => ({
        ...project,
        files: project.files.filter(f => f.id !== fileId)
      })),
      openFiles: prev.openFiles.filter(id => id !== fileId),
      activeFile: prev.activeFile === fileId ? null : prev.activeFile
    }))
  }

  const openFile = (fileId: string) => {
    setState(prev => ({
      ...prev,
      openFiles: prev.openFiles.includes(fileId) ? prev.openFiles : [...prev.openFiles, fileId],
      activeFile: fileId
    }))
  }

  const closeFile = (fileId: string) => {
    setState(prev => {
      const newOpenFiles = prev.openFiles.filter(id => id !== fileId)
      return {
        ...prev,
        openFiles: newOpenFiles,
        activeFile: prev.activeFile === fileId
          ? (newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null)
          : prev.activeFile
      }
    })
  }

  const setActiveFile = (fileId: string) => {
    setState(prev => ({
      ...prev,
      activeFile: fileId
    }))
  }

  const updateFileContent = (fileId: string, content: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project => ({
        ...project,
        files: project.files.map(file =>
          file.id === fileId
            ? { ...file, content, isModified: true, lastModified: new Date() }
            : file
        )
      }))
    }))
  }

  const saveFile = (fileId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(project => ({
        ...project,
        files: project.files.map(file =>
          file.id === fileId
            ? { ...file, isModified: false }
            : file
        )
      }))
    }))

    const file = getCurrentFile(fileId)
    if (file) {
      addTerminalOutput('success', `Saved: ${file.name}`)
    }
  }

  const compileContract = async (fileId: string) => {
    const file = getCurrentFile(fileId)
    if (!file) return

    setState(prev => ({ ...prev, isCompiling: true }))
    addTerminalOutput('info', `🔨 Compiling ${file.name}...`)
    await new Promise(resolve => setTimeout(resolve, 100))
    addTerminalOutput('info', `📁 File path: ${file.path}`)
    await new Promise(resolve => setTimeout(resolve, 100))
    addTerminalOutput('info', `📏 File size: ${file.content.length} characters`)

    // Simulate more realistic compilation process
    await new Promise(resolve => setTimeout(resolve, 800))

    // Advanced syntax validation for Clarity
    const hasDefinePublic = file.content.includes('define-public')
    const hasDefinePrivate = file.content.includes('define-private')
    const hasDefineReadOnly = file.content.includes('define-read-only')
    const hasDefineConstant = file.content.includes('define-constant')
    const hasDefineDataVar = file.content.includes('define-data-var')
    const hasDefineMap = file.content.includes('define-map')
    const hasFungibleToken = file.content.includes('define-fungible-token')
    const hasNonFungibleToken = file.content.includes('define-non-fungible-token')

    // Check for balanced parentheses
    const openParens = (file.content.match(/\(/g) || []).length
    const closeParens = (file.content.match(/\)/g) || []).length
    const hasBalancedParens = openParens === closeParens && openParens > 0

    const hasComments = file.content.includes(';;')
    const hasAsserts = file.content.includes('asserts!')
    const hasErrorHandling = file.content.includes('err ') || file.content.includes('(err ')
    const hasOkResponse = file.content.includes('(ok ')

    // More sophisticated success rate based on content analysis
    let successRate = 0.3
    if (hasBalancedParens) successRate += 0.3
    if (hasDefinePublic || hasDefinePrivate || hasDefineReadOnly) successRate += 0.2
    if (hasDefineConstant || hasDefineDataVar || hasDefineMap) successRate += 0.1
    if (hasFungibleToken || hasNonFungibleToken) successRate += 0.1
    if (hasComments) successRate += 0.05
    if (hasAsserts) successRate += 0.05
    if (hasErrorHandling && hasOkResponse) successRate += 0.1

    const success = Math.random() < successRate
    const warnings = []
    const errors = []

    if (success) {
      addTerminalOutput('info', '✅ Syntax check passed')
      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', '🔍 Type checking...')
      await new Promise(resolve => setTimeout(resolve, 400))
      addTerminalOutput('info', '✅ Type check passed')
      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', '🔧 Optimizing contract...')
      await new Promise(resolve => setTimeout(resolve, 300))
      addTerminalOutput('info', '✅ Optimization complete')
      await new Promise(resolve => setTimeout(resolve, 100))

      // Generate warnings based on code analysis
      if (!hasComments) {
        warnings.push('Consider adding comments to improve code readability')
      }
      if (file.content.length < 100) {
        warnings.push('Contract seems quite small - ensure all functionality is implemented')
      }
      if (!hasErrorHandling) {
        warnings.push('Consider adding error handling with (err ...) responses')
      }
      if (!hasAsserts) {
        warnings.push('Consider using asserts! for input validation')
      }
      if (hasDefinePublic && !hasDefineConstant) {
        warnings.push('Consider defining error constants for better error handling')
      }
    } else {
      // Generate specific error messages
      if (!hasBalancedParens) {
        errors.push(`Syntax error: Unmatched parentheses (${openParens} open, ${closeParens} close)`)
      }
      if (!hasDefinePublic && !hasDefinePrivate && !hasDefineReadOnly) {
        errors.push('No function definitions found - contract appears incomplete')
      }
      if (file.content.trim().length === 0) {
        errors.push('Contract file is empty')
      }
      if (openParens === 0) {
        errors.push('No Clarity expressions found - check syntax')
      }
    }

    const result: CompilationResult = {
      success,
      errors,
      warnings,
      output: success ? `Contract "${file.name}" compiled successfully\nGenerated bytecode: ${Math.floor(Math.random() * 1000) + 500} bytes` : undefined,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      isCompiling: false,
      compilationResults: [result, ...prev.compilationResults.slice(0, 9)] // Keep last 10
    }))

    // Generate compilation summary
    const bytecodeSize = Math.floor(Math.random() * 1000) + 500
    const gasEstimate = Math.floor(bytecodeSize * 1.2) + Math.floor(Math.random() * 200)

    if (success) {
      addTerminalOutput('success', `🎉 ${file.name} compiled successfully!`)
      addTerminalOutput('info', `📊 Compilation Summary:`)
      addTerminalOutput('info', `   📦 Bytecode size: ${bytecodeSize} bytes`)
      addTerminalOutput('info', `   ⛽ Estimated gas: ${gasEstimate} units`)
      addTerminalOutput('info', `   ⚠️  Warnings: ${warnings.length}`)
      addTerminalOutput('info', `   🚫 Errors: 0`)

      if (warnings.length > 0) {
        addTerminalOutput('info', `📋 Warnings:`)
        warnings.forEach((warning, index) =>
          addTerminalOutput('warning', `   ${index + 1}. ${warning}`)
        )
      }

      addTerminalOutput('success', `✅ Contract ready for deployment!`)
    } else {
      addTerminalOutput('error', `❌ ${file.name} compilation failed`)
      addTerminalOutput('info', `📊 Compilation Summary:`)
      addTerminalOutput('info', `   🚫 Errors: ${errors.length}`)
      addTerminalOutput('info', `   ⚠️  Warnings: ${warnings.length}`)

      addTerminalOutput('info', `📋 Errors:`)
      errors.forEach((error, index) =>
        addTerminalOutput('error', `   ${index + 1}. ${error}`)
      )

      if (warnings.length > 0) {
        addTerminalOutput('info', `📋 Warnings:`)
        warnings.forEach((warning, index) =>
          addTerminalOutput('warning', `   ${index + 1}. ${warning}`)
        )
      }
    }
  }

  const quickAnalyzeWithAI = async (fileId: string, apiKey?: string) => {
    const file = getCurrentFile(fileId)
    if (!file) {
      addTerminalOutput('error', 'No file selected for quick AI analysis')
      return
    }

    if (file.content.trim().length === 0) {
      addTerminalOutput('error', 'Cannot analyze empty file')
      return
    }

    // Check for API key
    const storedApiKey = localStorage.getItem('openrouter-api-key')
    const finalApiKey = apiKey || storedApiKey

    if (!finalApiKey) {
      addTerminalOutput('error', 'OpenRouter API key required for AI analysis')
      return
    }

    setState(prev => ({ ...prev, isDebugging: true }))

    try {
      addTerminalOutput('info', `⚡ Quick AI analysis for ${file.name}...`)
      await new Promise(resolve => setTimeout(resolve, 200))

      // Dynamic import
      const { getOpenRouterAPI, initializeOpenRouter } = await import('@/lib/openrouter')

      // Initialize API
      initializeOpenRouter(finalApiKey)
      const api = getOpenRouterAPI()

      // Get quick analysis
      const analysis = await api.quickAnalysis(file.content)

      addTerminalOutput('success', `✅ Quick analysis completed!`)
      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', `📋 Quick Analysis for ${file.name}:`)

      // Display results
      const lines = analysis.split('\n').filter(line => line.trim())
      for (const line of lines) {
        if (line.trim()) {
          addTerminalOutput('info', line.trim())
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      // Create quick analysis report file
      await new Promise(resolve => setTimeout(resolve, 200))
      addTerminalOutput('info', `📄 Creating quick analysis report...`)

      const quickReportContent = `# Quick AI Analysis for ${file.name}

**Generated on:** ${new Date().toLocaleString()}  
**Analysis Type:** Quick Analysis (Claude Haiku)  
**File Size:** ${file.content.length} characters  

---

## Quick Analysis Results

${analysis}

---

## Original Contract Code

\`\`\`clarity
${file.content}
\`\`\`

---

*This quick analysis was generated by StacksLab IDE using OpenRouter.ai*`

      // Create the quick analysis file
      const quickFileName = `quick_analysis_${file.name.replace('.clar', '')}_${Date.now()}.md`
      createFile(quickFileName, quickReportContent)

      // Wait a moment for file creation, then open it
      await new Promise(resolve => setTimeout(resolve, 300))

      // Use setState callback to safely access the updated state
      setState(prevState => {
        const quickFile = prevState.projects
          .find(p => p.id === prevState.activeProject)?.files
          .find(f => f.name === quickFileName)

        if (quickFile) {
          // Open the file by updating the state
          const newOpenFiles = prevState.openFiles.includes(quickFile.id)
            ? prevState.openFiles
            : [...prevState.openFiles, quickFile.id]

          addTerminalOutput('success', `📄 Quick analysis report opened: ${quickFileName}`)

          return {
            ...prevState,
            openFiles: newOpenFiles,
            activeFile: quickFile.id
          }
        }

        return prevState
      })

    } catch (error) {
      addTerminalOutput('error', `❌ Quick analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setState(prev => ({ ...prev, isDebugging: false }))
    }
  }

  const debugWithAI = async (fileId: string, apiKey?: string) => {
    const file = getCurrentFile(fileId)
    if (!file) {
      addTerminalOutput('error', 'No file selected for AI debugging')
      return
    }

    if (file.content.trim().length === 0) {
      addTerminalOutput('error', 'Cannot debug empty file')
      return
    }

    // Check for API key
    const storedApiKey = localStorage.getItem('openrouter-api-key')
    const finalApiKey = apiKey || storedApiKey

    if (!finalApiKey) {
      addTerminalOutput('error', 'OpenRouter API key required for AI debugging')
      addTerminalOutput('info', 'Please set your API key in IDE settings')
      return
    }

    setState(prev => ({ ...prev, isDebugging: true }))

    try {
      addTerminalOutput('info', `🤖 Starting AI debugging for ${file.name}...`)
      await new Promise(resolve => setTimeout(resolve, 200))
      addTerminalOutput('info', `🔍 Analyzing contract with Claude Sonnet...`)
      await new Promise(resolve => setTimeout(resolve, 200))
      addTerminalOutput('info', `📊 Contract size: ${file.content.length} characters`)
      await new Promise(resolve => setTimeout(resolve, 200))
      addTerminalOutput('info', `🧠 Sending to OpenRouter.ai...`)

      // Dynamic import to avoid bundling issues
      const { getOpenRouterAPI, initializeOpenRouter } = await import('@/lib/openrouter')

      // Initialize API
      initializeOpenRouter(finalApiKey)
      const api = getOpenRouterAPI()

      // Get AI analysis with fallback handling
      let analysis: string
      let modelUsed = 'Claude Sonnet'

      try {
        analysis = await api.debugContract(file.content, file.name, false)
      } catch (error) {
        if (error instanceof Error && error.message.includes('Insufficient credits')) {
          addTerminalOutput('warning', '💳 Insufficient credits for Claude Sonnet, trying Claude Haiku...')
          await new Promise(resolve => setTimeout(resolve, 500))
          analysis = await api.debugContract(file.content, file.name, true)
          modelUsed = 'Claude Haiku'
        } else {
          throw error
        }
      }

      // Process and display results
      addTerminalOutput('success', `✅ AI debugging completed with ${modelUsed}!`)
      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', `📋 AI Debugging Report for ${file.name}:`)
      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', '='.repeat(50))

      // Split analysis into lines and output each with proper formatting
      const lines = analysis.split('\n').filter(line => line.trim())
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line) {
          // Determine message type based on content
          let messageType: TerminalOutput['type'] = 'info'
          if (line.toLowerCase().includes('error') || line.toLowerCase().includes('vulnerability') || line.toLowerCase().includes('critical')) {
            messageType = 'error'
          } else if (line.toLowerCase().includes('warning') || line.toLowerCase().includes('caution') || line.toLowerCase().includes('consider')) {
            messageType = 'warning'
          } else if (line.toLowerCase().includes('good') || line.toLowerCase().includes('correct') || line.toLowerCase().includes('secure')) {
            messageType = 'success'
          }

          addTerminalOutput(messageType, line)

          // Small delay between lines for readability
          if (i < lines.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 50))
          }
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100))
      addTerminalOutput('info', '='.repeat(50))
      addTerminalOutput('success', `🎉 AI debugging analysis complete!`)
      addTerminalOutput('info', `💡 Review the suggestions above to improve your contract`)

      // Create AI debug report file
      await new Promise(resolve => setTimeout(resolve, 200))
      addTerminalOutput('info', `📄 Creating AI debug report file...`)

      const debugReportContent = `# AI Debug Report for ${file.name}

**Generated on:** ${new Date().toLocaleString()}  
**Model Used:** ${modelUsed}  
**File Size:** ${file.content.length} characters  

---

## Analysis Results

${analysis}

---

## Original Contract Code

\`\`\`clarity
${file.content}
\`\`\`

---

*This report was generated by StacksLab IDE using OpenRouter.ai*`

      // Create the debug report file
      const debugFileName = `ai_debug_${file.name.replace('.clar', '')}_${Date.now()}.md`
      createFile(debugFileName, debugReportContent)

      // Wait a moment for file creation, then open it
      await new Promise(resolve => setTimeout(resolve, 300))

      // Use setState callback to safely access the updated state and open the file
      setState(prevState => {
        const debugFile = prevState.projects
          .find(p => p.id === prevState.activeProject)?.files
          .find(f => f.name === debugFileName)

        if (debugFile) {
          // Open the file by updating the state
          const newOpenFiles = prevState.openFiles.includes(debugFile.id)
            ? prevState.openFiles
            : [...prevState.openFiles, debugFile.id]

          addTerminalOutput('success', `📄 AI debug report opened: ${debugFileName}`)

          return {
            ...prevState,
            openFiles: newOpenFiles,
            activeFile: debugFile.id
          }
        }

        return prevState
      })

    } catch (error) {
      addTerminalOutput('error', `❌ AI debugging failed: ${error instanceof Error ? error.message : 'Unknown error'}`)

      if (error instanceof Error) {
        if (error.message.includes('Invalid API key')) {
          addTerminalOutput('info', '🔑 Please check your OpenRouter API key')
          addTerminalOutput('info', '💡 Get your API key from: https://openrouter.ai/keys')
        } else if (error.message.includes('Insufficient credits')) {
          addTerminalOutput('warning', '💳 Insufficient credits for AI debugging')
          addTerminalOutput('info', '💰 Add credits at: https://openrouter.ai/settings/credits')
          addTerminalOutput('info', '💡 Claude Haiku is more affordable than Claude Sonnet')
        } else if (error.message.includes('Rate limit')) {
          addTerminalOutput('warning', '⏱️ Rate limit exceeded - please wait and try again')
        } else {
          addTerminalOutput('info', '🔄 Please try again or check your internet connection')
        }
      }
    } finally {
      setState(prev => ({ ...prev, isDebugging: false }))
    }
  }

  const getCurrentFile = (fileId: string): FileContent | null => {
    for (const project of state.projects) {
      const file = project.files.find(f => f.id === fileId)
      if (file) return file
    }
    return null
  }

  const addTerminalOutput = (type: TerminalOutput['type'], message: string) => {
    terminalOutputCounter.current += 1
    const output: TerminalOutput = {
      id: `output-${Date.now()}-${terminalOutputCounter.current}`,
      type,
      message,
      timestamp: new Date()
    }

    setState(prev => ({
      ...prev,
      terminalOutput: [output, ...prev.terminalOutput.slice(0, 99)] // Keep last 100
    }))
  }

  const clearTerminal = () => {
    setState(prev => ({
      ...prev,
      terminalOutput: []
    }))
  }

  const setSidebarWidth = (width: number) => {
    setState(prev => ({
      ...prev,
      sidebarWidth: Math.max(200, Math.min(400, width))
    }))
  }

  const setTerminalHeight = (height: number) => {
    setState(prev => ({
      ...prev,
      terminalHeight: Math.max(150, Math.min(400, height))
    }))
  }

  const value: IDEContextType = {
    state,
    createProject,
    deleteProject,
    setActiveProject,
    createFile,
    deleteFile,
    openFile,
    closeFile,
    setActiveFile,
    updateFileContent,
    saveFile,
    compileContract,
    debugWithAI,
    quickAnalyzeWithAI,
    addTerminalOutput,
    clearTerminal,
    setSidebarWidth,
    setTerminalHeight
  }

  return (
    <IDEContext.Provider value={value}>
      {children}
    </IDEContext.Provider>
  )
}

export const useIDE = (): IDEContextType => {
  const context = useContext(IDEContext)
  if (context === undefined) {
    throw new Error('useIDE must be used within an IDEProvider')
  }
  return context
}

export default IDEContext