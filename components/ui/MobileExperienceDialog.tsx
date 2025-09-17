// File: components/ui/MobileExperienceDialog.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { X, Monitor, Smartphone } from 'lucide-react'

interface MobileExperienceDialogProps {
    isOpen: boolean
    onClose: () => void
    onDismiss?: () => void
}

const MobileExperienceDialog: React.FC<MobileExperienceDialogProps> = ({ isOpen, onClose, onDismiss }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Monitor className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Better Experience Available</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                            <Smartphone className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 mb-2">Mobile Development Limitations</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                StacksLab is optimized for desktop development. While you can browse and explore on mobile, 
                                the full IDE experience with code editing, debugging, and testing works best on a PC or laptop.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-blue-900 mb-2">What you'll get on desktop:</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Full-featured code editor with syntax highlighting</li>
                            <li>• Integrated terminal and debugging tools</li>
                            <li>• Smart contract testing and simulation</li>
                            <li>• Better keyboard shortcuts and navigation</li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={onClose}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                        >
                            Continue on Mobile
                        </button>
                        <button
                            onClick={onDismiss || onClose}
                            className="w-full text-gray-600 hover:text-gray-800 px-4 py-2 text-sm font-medium transition-colors duration-200"
                        >
                            Don't show this again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileExperienceDialog