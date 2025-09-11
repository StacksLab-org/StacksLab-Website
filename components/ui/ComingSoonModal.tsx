// File: components/ui/ComingSoonModal.tsx
'use client'

import React from 'react'
import { X, Clock, ArrowRight } from 'lucide-react'

interface ComingSoonModalProps {
  isOpen: boolean
  onClose: () => void
  feature: string
  description?: string
}

const ComingSoonModal: React.FC<ComingSoonModalProps> = ({ 
  isOpen, 
  onClose, 
  feature, 
  description = "This feature is currently in development and will be available soon." 
}) => {
  if (!isOpen) return null

  const handleWaitlistClick = () => {
    onClose()
    const waitlistSection = document.getElementById('waitlist')
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {feature} Coming Soon!
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>

          <div className="space-y-3">
            <button
              onClick={handleWaitlistClick}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Join Waitlist for Updates
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-600 py-2 px-4 rounded-md font-medium hover:text-gray-800 transition-colors duration-200"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoonModal