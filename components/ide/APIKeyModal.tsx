'use client'

import React, { useState, useEffect } from 'react'
import { X, Key, Eye, EyeOff, ExternalLink } from 'lucide-react'

interface APIKeyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (apiKey: string) => void
}

const APIKeyModal: React.FC<APIKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Load existing API key
      const storedKey = localStorage.getItem('openrouter-api-key')
      if (storedKey) {
        setApiKey(storedKey)
      }
    }
  }, [isOpen])

  const handleSave = async () => {
    if (!apiKey.trim()) {
      alert('Please enter a valid API key')
      return
    }

    setIsLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem('openrouter-api-key', apiKey.trim())
      onSave(apiKey.trim())
      onClose()
    } catch (error) {
      alert('Failed to save API key')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = () => {
    localStorage.removeItem('openrouter-api-key')
    setApiKey('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">OpenRouter API Key</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Enter your OpenRouter API key to enable AI debugging with Claude Sonnet.
            </p>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <span>Get your API key from OpenRouter</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4 text-gray-500" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
            <p className="text-xs text-blue-800">
              <strong>Privacy:</strong> Your API key is stored locally in your browser and never sent to our servers.
              It&aposs only used to communicate directly with OpenRouter.ai.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <button
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-700 transition-colors"
          >
            Remove Key
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isLoading || !apiKey.trim()}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIKeyModal