import Head from 'next/head'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiMenu, FiX } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

function LayoutAllies({children, title, activeLink}:{
    children:any;
    title: string;
    activeLink: string;
}) {

    const Navbar = () => {
        
        const [active, setActive] = useState(false)
        const [activeDropdown, setActiveDropdown] = useState(false)

        return(
        <>
            <div className={twMerge([
                "transition w-full top-0 left-0 sticky border-b border-slate-200 bg-white px-[2rem] z-10 overflow-hidden",
                "md:px-[12%]",
                "lg:px-[12%]",
                active ? "h-fit" : "h-[10vh]"
            ])}>
                <div className={twMerge([
                    "w-full flex justify-between items-center h-[10vh] relative"
                ])}>
                    <div className={twMerge([
                        "block w-[30%] h-full",
                        "md:w-[13%]",
                        "lg:w-[13%]",
                    ])}>
                        <img className='w-full h-full object-cover' src='/logo.png' alt='Plataforma médica para médicos'/>
                    </div>
                    
                    <div 
                    className={twMerge([
                        "w-[2rem] h-[2rem] relative flex flex-col justify-center items-center border border-1 border-slate-100 text-primary text-lg",
                        "lg:hidden md:hidden"
                    ])}
                    onClick={()=>{ setActive(!active) }}>
                        {active ? <FiX/> : <FiMenu/>}
                    </div>

                    <div className={twMerge([
                        "w-fit hidden grid-cols-2 gap-2 justify-between items-center justify-items-center relative",
                        "lg:grid",
                        "md:grid"
                    ])}>
                        <Link className={twMerge([
                            "font-light text-sm text-secondary",
                            activeLink === "platform" && "font-bold"
                        ])} href={"/"}>Plataforma</Link>
                        
                        <div className={`cursor-pointer relative text-sm text-white bg-primary rounded-md px-8 py-2 ${activeDropdown ? "font-semibold" : "font-light"}`} onClick={()=>{ setActiveDropdown(!activeDropdown) }}>
                            Renta con nosotros
                        </div>

                    </div>

                </div>
                <div className={twMerge([
                    "flex flex-col justify-start items-start gap-4 relative w-full bg-white py-3",
                    "lg:hidden md:hidden"
                ])}>
                    <Link className={twMerge([
                        "font-light text-sm text-secondary",
                        "lg:text-base",
                        "md:text-base",
                        activeLink === "platform" && "font-bold"
                    ])} href={"/"}>Plataforma</Link>
                    <div className={twMerge([
                        "cursor-pointer relative text-sm text-white bg-primary rounded-md w-full py-2 px-2",
                        activeDropdown ? "font-semibold" : "font-light",
                        "lg:text-base",
                        "md:text-base",
                    ])} onClick={()=>{ setActiveDropdown(!activeDropdown) }}>
                        Renta con nosotros
                    </div>
                    <div className={twMerge([
                        "border rounded-md w-full flex flex-col justify-center items-start gap-3 overflow-hidden transition",
                        activeDropdown ? "h-fit p-3 border-slate-200" : "h-0 p-0 border-transparent"
                    ])}>
                        <Link className={twMerge([
                            "font-light text-sm text-secondary",
                            "lg:text-base",
                            "md:text-base",
                            activeLink === "center-1" && "font-bold"
                        ])} href={"/coyoacan"}>Coyoacán</Link>
                        <Link className={twMerge([
                            "font-light text-sm text-secondary",
                            "lg:text-base",
                            "md:text-base",
                            activeLink === "center-2" && "font-bold"
                        ])} href={"/interlomas"}>Interlomas</Link>
                        <Link className={twMerge([
                            "font-light text-sm text-secondary",
                            "lg:text-base",
                            "md:text-base",
                            activeLink === "center-3" && "font-bold"
                        ])} href={"/tlalnepantla"}>Tlalnepantla</Link>
                    </div>
                </div>
            </div>
            {activeDropdown && <div className='hidden md:flex lg:flex flex-col justify-between items-start gap-4 w-[9rem] fixed top-[8%] right-[12%] bg-white border rounded-md p-4 shadow-lg z-10'>
                <Link className={twMerge([
                    "font-light text-sm text-secondary",
                    activeLink === "center-1" && "font-bold"
                ])} href={"/coyoacan"}>Coyoacán</Link>
                <Link className={twMerge([
                    "font-light text-sm text-secondary",
                    activeLink === "center-2" && "font-bold"
                ])} href={"/interlomas"}>Interlomas</Link>
                <Link className={twMerge([
                    "font-light text-sm text-secondary",
                    activeLink === "center-3" && "font-bold"
                ])} href={"/tlalnepantla"}>Tlalnepantla</Link>
            </div>}
        </>
        )
    }

    return (
        <div className='bg-white'>
            <Head>
                <title>{`${title} - Prosit`}</title>
                <link rel="icon" href="/favicon.png" sizes="32x32"/>
                <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=192%2C192&amp;ssl=1" sizes="192x192"/>
            </Head>
            <Navbar/>
            <div className={`relative block w-full bg-white lg:mt-0 mt-[15vh]`}>
                {children}
            </div>
        </div>
    )
}

export default LayoutAllies