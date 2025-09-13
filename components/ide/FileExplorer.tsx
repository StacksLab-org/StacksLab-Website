'use client'

import React, { useState } from 'react'
import {
  Folder,
  File,
  Plus,
  MoreHorizontal,
  FileText,
  Trash2,
  Edit3,
  FolderPlus
} from 'lucide-react'
import { useIDE } from '@/contexts/IDEContext'

const FileExplorer: React.FC = () => {
  const { state, createFile, deleteFile, openFile, setActiveProject, createProject } = useIDE()
  const [showNewFileInput, setShowNewFileInput] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const [showNewProjectInput, setShowNewProjectInput] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')



  const handleCreateFile = () => {
    if (newFileName.trim()) {
      const fileName = newFileName.endsWith('.clar') ? newFileName : `${newFileName}.clar`
      createFile(fileName)
      setNewFileName('')
      setShowNewFileInput(false)
    }
  }

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      createProject(newProjectName.trim())
      setNewProjectName('')
      setShowNewProjectInput(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.clar')) {
      return <FileText className="w-4 h-4 text-blue-400" />
    }
    return <File className="w-4 h-4 text-gray-400" />
  }

  return (
    <div className="h-full bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Explorer</h3>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setShowNewFileInput(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="New File"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setShowNewProjectInput(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="New Project"
            >
              <FolderPlus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-auto">
        {/* New Project Input */}
        {showNewProjectInput && (
          <div className="p-3 bg-blue-50 border-b border-blue-200">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateProject()
                if (e.key === 'Escape') {
                  setShowNewProjectInput(false)
                  setNewProjectName('')
                }
              }}
              placeholder="Project name..."
              className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              autoFocus
            />
            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={handleCreateProject}
                className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewProjectInput(false)
                  setNewProjectName('')
                }}
                className="px-2 py-1 bg-gray-300 text-gray-400 text-xs rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {state.projects.map((project) => (
          <div key={project.id} className="border-b border-gray-200">
            {/* Project Header */}
            <div
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 ${project.id === state.activeProject ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                }`}
              onClick={() => setActiveProject(project.id)}
            >
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">{project.name}</span>
              </div>
              <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-3 h-3 text-gray-500" />
              </button>
            </div>

            {/* Project Files */}
            {project.id === state.activeProject && (
              <div className="bg-white">
                {/* New File Input */}
                {showNewFileInput && (
                  <div className="px-6 py-2 bg-yellow-50 border-b border-yellow-200">
                    <input
                      type="text"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateFile()
                        if (e.key === 'Escape') {
                          setShowNewFileInput(false)
                          setNewFileName('')
                        }
                      }}
                      placeholder="filename.clar"
                      className="w-full px-2 py-1 text-sm border border-yellow-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-600"
                      autoFocus
                    />
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={handleCreateFile}
                        className="px-2 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
                      >
                        Create
                      </button>
                      <button
                        onClick={() => {
                          setShowNewFileInput(false)
                          setNewFileName('')
                        }}
                        className="px-2 py-1 bg-gray-300 text-gray-400 text-xs rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Files List */}
                {project.files.map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center justify-between px-6 py-2 cursor-pointer hover:bg-gray-50 group ${file.id === state.activeFile ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                      }`}
                    onClick={() => openFile(file.id)}
                  >
                    <div className="flex items-center space-x-2">
                      {getFileIcon(file.name)}
                      <span className="text-sm text-gray-400">
                        {file.name}
                        {file.isModified && <span className="text-orange-500 ml-1">•</span>}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle rename
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                        title="Rename"
                      >
                        <Edit3 className="w-3 h-3 text-gray-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteFile(file.id)
                        }}
                        className="p-1 hover:bg-red-100 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}

                {project.files.length === 0 && (
                  <div className="px-6 py-4 text-center text-gray-500 text-sm">
                    No files in this project
                    <br />
                    <button
                      onClick={() => setShowNewFileInput(true)}
                      className="text-blue-600 hover:text-blue-700 mt-1"
                    >
                      Create your first file
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {state.projects.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            <Folder className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm mb-2">No projects yet</p>
            <button
              onClick={() => setShowNewProjectInput(true)}
              className="text-blue-600 hover:text-blue-700 text-sm"
            >
              Create your first project
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileExplorer