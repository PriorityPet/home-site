import Head from 'next/head'
import React from 'react'
import Navbar from './Navbar'

interface Props {
    title: string
    children: React.ReactNode
}

const Layout = (props:Props) => {
    const {title, children} = props
    return (
        <div className='bg-white h-fit'>
            <Head>
                <title>{`${title} - Medhouse`}</title>
            </Head>
            <div className={`relative block w-full`}>
                <Navbar/>
                {children}
            </div>
        </div>
    )
}

export default Layout