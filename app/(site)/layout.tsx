import Footer from '@/components/section/footer/Footer';
import NavBar from '@/components/section/navbar/NavBar';
import React from 'react'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col min-h-screen w-full'>
            <NavBar />
            <main className='flex-1'>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default SiteLayout;