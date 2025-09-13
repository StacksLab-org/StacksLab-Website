'use client'

import React, { useEffect, useState } from 'react'
import Sidebar from './sidebar'
import { useStacks } from '@/hooks/useStacks'
import { useRouter } from 'next/navigation'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const { userData } = useStacks();
    const router = useRouter()
    useEffect(() => {
        if (!userData) {
            router.push('/')
        }

    }, [userData, router])

    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout