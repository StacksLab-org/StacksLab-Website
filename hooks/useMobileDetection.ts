// File: hooks/useMobileDetection.ts
'use client'

import { useState, useEffect } from 'react'

interface MobileDetectionHook {
    isMobile: boolean
    showMobileDialog: boolean
    closeMobileDialog: () => void
    dismissMobileDialog: () => void
}

export const useMobileDetection = (): MobileDetectionHook => {
    const [isMobile, setIsMobile] = useState(false)
    const [showMobileDialog, setShowMobileDialog] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase()
            const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone']
            const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) || window.innerWidth < 768
            
            setIsMobile(isMobileDevice)
            
            // Check if user has dismissed the dialog before
            const hasSeenDialog = localStorage.getItem('stackslab-mobile-dialog-dismissed')
            
            // Show dialog if mobile and hasn't been dismissed
            if (isMobileDevice && !hasSeenDialog) {
                // Delay showing dialog to avoid flash on page load
                setTimeout(() => {
                    setShowMobileDialog(true)
                }, 1000)
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const closeMobileDialog = () => {
        setShowMobileDialog(false)
    }

    const dismissMobileDialog = () => {
        setShowMobileDialog(false)
        localStorage.setItem('stackslab-mobile-dialog-dismissed', 'true')
    }

    return {
        isMobile,
        showMobileDialog,
        closeMobileDialog,
        dismissMobileDialog
    }
}