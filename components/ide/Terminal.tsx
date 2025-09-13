'use client'

import React, { useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, Trash2, Copy } from 'lucide-react'
import { useIDE } from '@/contexts/IDEContext'

const Terminal: React.FC = () => {
  const { state, clearTerminal, addTerminalOutput } = useIDE()
  const terminalRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [state.terminalOutput])

  const getOutputIcon = (type: string) => {
    switch (type) {
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'success':
        return '✅'
      default:
        return 'ℹ️'
    }
  }

  const getOutputColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-400'
      case 'warning':
        return 'text-yellow-400'
      case 'success':
        return 'text-green-400'
      default:
        return 'text-blue-400'
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    addTerminalOutput('info', 'Copied to clipboard')
  }

  return (
    <div className="h-full bg-gray-900 text-gray-100 flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-400">Terminal</span>
          {state.isCompiling && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-yellow-400">Compiling...</span>
            </div>
          )}
          {state.isDebugging && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-orange-400">AI Debugging...</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={clearTerminal}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            title="Clear Terminal"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {state.terminalOutput.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <TerminalIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Terminal output will appear here</p>
            <p className="text-xs mt-1">Compile contracts, deploy, and see results</p>
          </div>
        ) : (
          <div className="space-y-1">
            {state.terminalOutput.slice().reverse().map((output) => (
              <div
                key={output.id}
                className="flex items-start space-x-3 py-1 hover:bg-gray-800 rounded px-2 group"
              >
                <span className="text-xs text-gray-500 mt-0.5 w-16 flex-shrink-0">
                  {formatTime(output.timestamp)}
                </span>
                <span className="flex-shrink-0 mt-0.5">
                  {getOutputIcon(output.type)}
                </span>
                <span className={`flex-1 ${getOutputColor(output.type)}`}>
                  {output.message}
                </span>
                <button
                  onClick={() => copyToClipboard(output.message)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-all"
                  title="Copy to clipboard"
                >
                  <Copy className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Terminal Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <span className="text-green-400 font-mono text-sm">$</span>
          <input
            type="text"
            placeholder="Enter command... (e.g., 'compile', 'deploy', 'test')"
            className="flex-1 bg-transparent text-gray-100 font-mono text-sm outline-none placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const command = e.currentTarget.value.trim()
                if (command) {
                  addTerminalOutput('info', `> ${command}`)

                  // Handle basic commands
                  switch (command.toLowerCase()) {
                    case 'clear':
                      clearTerminal()
                      break
                    case 'help':
                      addTerminalOutput('info', 'Available commands: compile, deploy, test, clear, help')
                      break
                    case 'compile':
                      addTerminalOutput('info', 'Use Ctrl+Enter in the editor to compile the active file')
                      break
                    case 'deploy':
                      addTerminalOutput('info', 'Use the Deploy button to deploy contracts')
                      break
                    case 'test':
                      addTerminalOutput('info', 'Testing suite coming soon!')
                      break
                    default:
                      addTerminalOutput('warning', `Unknown command: ${command}. Type 'help' for available commands.`)
                  }

                  e.currentTarget.value = ''
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Terminal