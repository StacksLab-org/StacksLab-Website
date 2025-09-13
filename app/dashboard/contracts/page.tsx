'use client'

import React, { useState } from 'react'
import { IDEProvider, useIDE } from '@/contexts/IDEContext'
import FileExplorer from '@/components/ide/FileExplorer'
import CodeEditor from '@/components/ide/CodeEditor'
import Terminal from '@/components/ide/Terminal'
import TabManager from '@/components/ide/TabManager'
import Toolbar from '@/components/ide/Toolbar'

const IDELayout: React.FC = () => {
  const { state, updateFileContent, compileContract, saveFile, debugWithAI } = useIDE()
  const [sidebarWidth, setSidebarWidth] = useState(300)
  const [terminalHeight, setTerminalHeight] = useState(250)

  const activeProject = state.projects.find(p => p.id === state.activeProject)
  const activeFile = activeProject?.files.find(f => f.id === state.activeFile)

  // Global keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter for compilation
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault()
        if (activeFile) {
          compileContract(activeFile.id)
        }
      }
      
      // Ctrl+S for save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        if (activeFile) {
          saveFile(activeFile.id)
        }
      }

      // Ctrl+Shift+D for AI debugging
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault()
        if (activeFile && !state.isDebugging && !state.isCompiling) {
          debugWithAI(activeFile.id)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeFile, compileContract, saveFile, debugWithAI, state.isDebugging, state.isCompiling])

  const handleResize = (e: React.MouseEvent, type: 'sidebar' | 'terminal') => {
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = sidebarWidth
    const startHeight = terminalHeight

    const handleMouseMove = (e: MouseEvent) => {
      if (type === 'sidebar') {
        const newWidth = startWidth + (e.clientX - startX)
        setSidebarWidth(Math.max(200, Math.min(500, newWidth)))
      } else {
        const newHeight = startHeight - (e.clientY - startY)
        setTerminalHeight(Math.max(150, Math.min(400, newHeight)))
      }
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <Toolbar />

      {/* Main IDE Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div 
          className="bg-white border-r border-gray-200 flex-shrink-0"
          style={{ width: sidebarWidth }}
        >
          <FileExplorer />
        </div>

        {/* Sidebar Resize Handle */}
        <div
          className="w-1 bg-gray-200 hover:bg-blue-500 cursor-col-resize transition-colors"
          onMouseDown={(e) => handleResize(e, 'sidebar')}
        />

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <TabManager />

          {/* Editor Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeFile ? (
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  fileId={activeFile.id}
                  content={activeFile.content}
                  language={activeFile.language}
                  onChange={(content) => updateFileContent(activeFile.id, content)}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-400">
                <div className="text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-medium mb-2">Welcome to StacksLab IDE</h3>
                  <p className="text-gray-500 mb-4">Select a file from the explorer to start coding</p>
                  <div className="text-sm text-gray-600">
                    <p>💡 Tips:</p>
                    <p>• Ctrl+S to save</p>
                    <p>• Ctrl+Enter to compile</p>
                    <p>• Use the terminal for commands</p>
                  </div>
                </div>
              </div>
            )}

            {/* Terminal Resize Handle */}
            <div
              className="h-1 bg-gray-200 hover:bg-blue-500 cursor-row-resize transition-colors"
              onMouseDown={(e) => handleResize(e, 'terminal')}
            />

            {/* Terminal */}
            <div 
              className="border-t border-gray-200 flex-shrink-0"
              style={{ height: terminalHeight }}
            >
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ContractsPage = () => {
  return (
    <IDEProvider>
      <IDELayout />
    </IDEProvider>
  )
}

export default ContractsPage