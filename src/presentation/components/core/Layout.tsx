import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

interface Props {
    title: string
    children: React.ReactNode
}

const Layout = (props:Props) => {
    const {title, children} = props
    return (
        <div className='h-fit'>
            <Head>
                <title>{`${title} - Medhaus`}</title>
                <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=32%2C32&amp;ssl=1" sizes="32x32"/>
                <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=192%2C192&amp;ssl=1" sizes="192x192"/>
            </Head>
            <div className={`relative block w-full bg-slate-100`}>
                <Navbar/>
                <div className="pt-[2%] mt-[16vh] pb-[7%] box-border">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout