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