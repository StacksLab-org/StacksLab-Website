'use client'

import React, { useState, useEffect } from 'react'
import {
  Save,
  Play,
  RefreshCw,
  Settings,
  Download,
  Upload,
  GitBranch,
  Zap,
  Brain,
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { useIDE } from '@/contexts/IDEContext'
import { useWallet } from '@/contexts/WalletContext'
import { useStacks } from '@/hooks/useStacks'
import { abbreviateAddress } from '@/lib/stx-utils'
import APIKeyModal from '@/components/ide/APIKeyModal'
import { openContractDeploy } from '@stacks/connect'
import { STACKS_TESTNET } from '@stacks/network'

const Toolbar: React.FC = () => {
  const { state, saveFile, compileContract, debugWithAI, quickAnalyzeWithAI, addTerminalOutput } = useIDE()
  const { wallet } = useWallet()
  const { userData } = useStacks();
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false)
  const [showDebugMenu, setShowDebugMenu] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedTxId, setDeployedTxId] = useState<string | null>(null)
  const activeProject = state.projects.find(p => p.id === state.activeProject)
  const activeFile = activeProject?.files.find(f => f.id === state.activeFile)

  // Clear deployed transaction ID when active file changes
  useEffect(() => {
    setDeployedTxId(null)
  }, [state.activeFile])

  // Debug logging for deploy button state
  useEffect(() => {
    console.log('Deploy button debug:', {
      activeFile: !!activeFile,
      activeFileName: activeFile?.name,
      walletConnected: wallet.isConnected,
      isCompiling: state.isCompiling,
      isDebugging: state.isDebugging,
      isDeploying: isDeploying,
      disabled: !activeFile || !wallet.isConnected || state.isCompiling || state.isDebugging || isDeploying
    })
  }, [activeFile, wallet.isConnected, state.isCompiling, state.isDebugging, isDeploying])

  const handleSave = () => {
    if (activeFile) {
      saveFile(activeFile.id)
    }
  }

  const handleCompile = async () => {
    if (!activeFile) {
      addTerminalOutput('warning', 'No file selected for compilation')
      return
    }

    if (state.isCompiling) {
      addTerminalOutput('warning', 'Compilation already in progress')
      return
    }

    if (activeFile.content.trim().length === 0) {
      addTerminalOutput('error', 'Cannot compile empty file')
      return
    }

    // Auto-save before compilation
    if (activeFile.isModified) {
      saveFile(activeFile.id)
      addTerminalOutput('info', `Auto-saved ${activeFile.name} before compilation`)
    }

    try {
      await compileContract(activeFile.id)
    } catch (error) {
      addTerminalOutput('error', `Compilation failed: ${error}`)
    }
  }

  const handleDebugWithAI = async (quick: boolean = false) => {
    if (!activeFile) {
      addTerminalOutput('warning', 'No file selected for AI debugging')
      return
    }

    if (state.isDebugging) {
      addTerminalOutput('warning', 'AI debugging already in progress')
      return
    }

    if (activeFile.content.trim().length === 0) {
      addTerminalOutput('error', 'Cannot debug empty file')
      return
    }

    setShowDebugMenu(false)

    try {
      if (quick) {
        await quickAnalyzeWithAI(activeFile.id)
      } else {
        await debugWithAI(activeFile.id)
      }
    } catch (error) {
      addTerminalOutput('error', `AI debugging failed: ${error}`)
    }
  }

  const handleDeploy = async () => {
    if (!wallet.isConnected) {
      addTerminalOutput('error', 'Please connect your wallet to deploy contracts')
      return
    }

    if (!activeFile) {
      addTerminalOutput('warning', 'No file selected for deployment')
      return
    }

    if (activeFile.content.trim().length === 0) {
      addTerminalOutput('error', 'Cannot deploy empty contract')
      return
    }

    // Clear previous deployment result
    setDeployedTxId(null)
    setIsDeploying(true)
    addTerminalOutput('info', `Initiating deployment of ${activeFile.name} to testnet...`)

    try {
      // Extract contract name from filename (remove .clar extension)
      const contractName = activeFile.name.replace(/\.clar$/, '')

      const deployOptions = {
        contractName,
        codeBody: activeFile.content,
        network: STACKS_TESTNET,
        onFinish: (data: unknown) => {
          if (data && typeof data === 'object' && 'txId' in data) {
            const txId = (data as { txId: string }).txId
            setDeployedTxId(txId)
            setIsDeploying(false)

            // Success message in toolbar area
            addTerminalOutput('success', `✓ Contract "${contractName}" deployed successfully!`)

            // Detailed deployment info in terminal
            addTerminalOutput('info', '=== DEPLOYMENT DETAILS ===')
            addTerminalOutput('info', `Contract Name: ${contractName}`)
            addTerminalOutput('info', `Network: Stacks Testnet`)
            addTerminalOutput('info', `Transaction ID: ${txId}`)
            addTerminalOutput('info', `Explorer: https://explorer.hiro.so/txid/${txId}?chain=testnet`)
            addTerminalOutput('info', `Status: Pending confirmation...`)
            addTerminalOutput('info', '========================')
          } else {
            setIsDeploying(false)
            addTerminalOutput('error', 'Deployment completed but received unexpected response format')
          }
        },
        onCancel: () => {
          setIsDeploying(false)
          addTerminalOutput('warning', 'Contract deployment cancelled by user')
        }
      }

      await openContractDeploy(deployOptions)
    } catch (error) {
      setIsDeploying(false)
      addTerminalOutput('error', `Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      console.error('Deployment error:', error)
    }
  }

  const handleExport = () => {
    if (activeProject) {
      const projectData = JSON.stringify(activeProject, null, 2)
      const blob = new Blob([projectData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${activeProject.name}.json`
      a.click()
      URL.revokeObjectURL(url)
      addTerminalOutput('success', `Exported project: ${activeProject.name}`)
    }
  }

  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      {/* Left Side - File Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleSave}
          disabled={!activeFile || !activeFile.isModified}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-600 border  hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          title="Save (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        <button
          onClick={handleCompile}
          disabled={!activeFile || state.isCompiling}
          className={`flex items-center space-x-2 px-3 py-1.5 border hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm ${state.isCompiling
            ? 'bg-yellow-50 text-yellow-600 border-yellow-300'
            : 'bg-green-50 text-green-600 border-green-300'
            }`}
          title="Compile (Ctrl+Enter)"
        >
          {state.isCompiling ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span>{state.isCompiling ? 'Compiling...' : 'Compile'}</span>
          {state.isCompiling && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </button>

        <button
          onClick={() => handleDebugWithAI(false)}
          disabled={!activeFile || state.isDebugging || state.isCompiling}
          className={`flex items-center space-x-2 px-3 py-1.5 border hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm ${state.isDebugging
            ? 'bg-orange-50 text-orange-600 border-orange-300'
            : 'bg-orange-50 text-orange-600 border-orange-300'
            }`}
          title="AI Debug with Claude (Ctrl+Shift+D)"
        >
          {state.isDebugging ? (
            <Brain className="w-4 h-4 animate-pulse" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{state.isDebugging ? 'AI Debugging...' : 'AI Debug'}</span>
          {state.isDebugging && (
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          )}
        </button>

        <button
          onClick={handleDeploy}
          disabled={!activeFile || !wallet.isConnected || state.isCompiling || state.isDebugging || isDeploying}
          className={`flex items-center space-x-2 px-3 py-1.5 border hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm ${isDeploying
            ? 'bg-yellow-50 text-yellow-600 border-yellow-300'
            : 'bg-purple-50 text-purple-600 border-purple-300'
            }`}
          title={`Deploy to Testnet ${!activeFile ? '(No file selected)' : !wallet.isConnected ? '(Wallet not connected)' : state.isCompiling ? '(Compiling...)' : state.isDebugging ? '(Debugging...)' : isDeploying ? '(Deploying...)' : ''}`}
        >
          {isDeploying ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          <span>{isDeploying ? 'Deploying...' : 'Deploy to Testnet'}</span>
          {isDeploying && (
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </button>

        {/* Show explorer link when deployment is successful */}
        {deployedTxId && (
          <button
            onClick={() => window.open(`https://explorer.hiro.so/txid/${deployedTxId}?chain=testnet`, '_blank')}
            className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 text-green-600 border border-green-300 hover:bg-green-100 transition-colors text-sm"
            title="View transaction on Stacks Explorer"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View on Explorer</span>
          </button>
        )}
      </div>

      {/* Center - Project Info */}
      <div className="flex items-center space-x-4 text-sm text-gray-600">
        {activeProject && (
          <>
            <div className="flex items-center space-x-2">
              <GitBranch className="w-4 h-4" />
              <span>{activeProject.name}</span>
            </div>
            {activeFile && (
              <>
                <span>•</span>
                <span>{activeFile.name}</span>
                {activeFile.isModified && (
                  <span className="text-orange-500">• Modified</span>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Right Side - Project Actions */}
      <div className="flex items-center space-x-2">
        {/* Wallet Connection Status */}
        {
          userData && (
            <button
              type="button"
              className="text-blue-500 px-4 py-2 text-sm font-medium bg-blue-100 border border-blue-500 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {abbreviateAddress(userData?.profile.stxAddress.mainnet)}
            </button>

          )}
        <button
          onClick={handleExport}
          disabled={!activeProject}
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 text-gray-600 border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          title="Export Project"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>

        <button
          className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 text-gray-600 border hover:bg-gray-100 transition-colors text-sm"
          title="Import Project"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>

        <div className="w-px h-6 bg-gray-300"></div>

        <button
          onClick={() => setShowAPIKeyModal(true)}
          className="p-2 hover:bg-gray-100 border transition-colors"
          title="IDE Settings & API Keys"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* API Key Modal */}
      <APIKeyModal
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
        onSave={() => {
          addTerminalOutput('success', 'OpenRouter API key saved successfully')
          addTerminalOutput('info', 'You can now use AI debugging features')
        }}
      />
    </div>
  )
}

export default Toolbar