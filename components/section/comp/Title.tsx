// File: components/section/comp/Title.tsx
'use client'

import React, { useState } from 'react'
import { X, Sparkles, ArrowRight, Bell } from 'lucide-react'

const Title = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className='relative flex items-center justify-center py-3 px-4 text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-sm font-medium shadow-sm'>
      <div className='flex items-center justify-center gap-2 max-w-7xl mx-auto'>
        <Sparkles className='w-4 h-4 text-blue-100' />
        <span className='text-center'>
          <span className='hidden sm:inline'>🎉 StacksLab is now in </span>
          <span className='font-semibold bg-white/20 px-2 py-1 rounded-full text-xs uppercase tracking-wide'>
            Beta
          </span>
          <span className='hidden sm:inline'> - Start building smart contracts today!</span>
          <span className='sm:hidden'>Beta Launch - Build smart contracts now!</span>
        </span>
        <a 
          href="#waitlist" 
          className='inline-flex items-center gap-1 ml-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105'
        >
          <Bell className='w-3 h-3' />
          <span className='hidden sm:inline'>Get Notified</span>
          <span className='sm:hidden'>Join</span>
          <ArrowRight className='w-3 h-3' />
        </a>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className='absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors duration-200'
        aria-label='Close announcement'
      >
        <X className='w-4 h-4' />
      </button>
    </div>
  )
}

export default Title