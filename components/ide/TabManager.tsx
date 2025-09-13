'use client'

import React from 'react'
import { X, FileText, Circle } from 'lucide-react'
import { useIDE } from '@/contexts/IDEContext'

const TabManager: React.FC = () => {
    const { state, closeFile, setActiveFile } = useIDE()

    const getOpenFiles = () => {
        const files = []
        for (const project of state.projects) {
            for (const file of project.files) {
                if (state.openFiles.includes(file.id)) {
                    files.push(file)
                }
            }
        }
        return files
    }

    const openFiles = getOpenFiles()

    if (openFiles.length === 0) {
        return (
            <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center justify-center">
                <span className="text-sm text-gray-500">No files open</span>
            </div>
        )
    }

    return (
        <div className="h-10 bg-gray-100 border-b border-gray-200 flex items-center overflow-x-auto">
            <div className="flex">
                {openFiles.map((file) => (
                    <div
                        key={file.id}
                        className={`flex items-center space-x-2 px-4 py-2 border-r border-gray-200 cursor-pointer hover:bg-gray-200 transition-colors min-w-0 ${file.id === state.activeFile
                            ? 'bg-white border-b-2 border-blue-500'
                            : 'bg-gray-100'
                            }`}
                        onClick={() => setActiveFile(file.id)}
                    >
                        <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-gray-400 truncate max-w-32">
                            {file.name}
                        </span>
                        {file.isModified && (
                            <Circle className="w-2 h-2 text-orange-500 fill-current flex-shrink-0" />
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                closeFile(file.id)
                            }}
                            className="p-0.5 hover:bg-gray-300 rounded flex-shrink-0 ml-1"
                        >
                            <X className="w-3 h-3 text-gray-500" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabManager