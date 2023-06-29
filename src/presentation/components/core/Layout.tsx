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
                <title>{`${title} - Prosit`}</title>
                <link rel="icon" href="/favicon.png" sizes="32x32"/>
                <link rel="icon" href="/favicon.png" sizes="192x192"/>
            </Head>
            <div className={`relative block w-full bg-slate-100`}>
                <Navbar/>
                <div className="py-[3%] box-border">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Layout