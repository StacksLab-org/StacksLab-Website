import Footer from '@/components/section/footer/Footer';
import NavBar from '@/components/section/navbar/NavBar';
import React from 'react'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col w-full h-full'>
            <NavBar/>
            
             {children}
             
             <Footer/> </div>
    )
}

export default SiteLayout;