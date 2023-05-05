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

        return(
            <div className={twMerge([
                "transition w-full top-0 left-0 sticky border-b border-slate-200 bg-white px-[2rem] z-10 overflow-hidden",
                "lg:px-[8rem]",
                "md:px-[8rem]",
                active ? "h-fit" : "h-[10vh]"
            ])}>
                <div className={twMerge([
                    "w-full flex justify-between items-center h-[10vh]"
                ])}>
                    <div className={twMerge([
                        "block w-[30%] h-full",
                        "lg:w-[13%]",
                        "md:w-[13%]"
                    ])}>
                        <img className='w-full h-full object-cover' src='https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2022/09/cropped-IMG_5684.jpg?fit=927%2C927&ssl=1' alt='Plataforma médica para médicos'/>
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
                        "hidden grid-cols-4 gap-5 justify-between items-center justify-items-center",
                        "lg:w-[40%] lg:grid",
                        "md:w-[40%] md:grid"
                    ])}>
                        <Link className={twMerge([
                            "font-light text-base text-secondary",
                            activeLink === "platform" && "font-bold"
                        ])} href={"/"}>Plataforma</Link>
                        <Link className={twMerge([
                            "font-light text-base text-secondary",
                            activeLink === "center-1" && "font-bold"
                        ])} href={"/coyoacan"}>Coyoacán</Link>
                        <Link className={twMerge([
                            "font-light text-base text-secondary",
                            activeLink === "center-2" && "font-bold"
                        ])} href={"/interlomas"}>Interlomas</Link>
                        <Link className={twMerge([
                            "font-light text-base text-secondary",
                            activeLink === "center-3" && "font-bold"
                        ])} href={"/tlalnepantla"}>Tlalnepantla</Link>
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
        )
    }

    return (
        <div className='bg-white'>
            <Head>
                <title>{`${title} - Medhaus`}</title>
                <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=32%2C32&amp;ssl=1" sizes="32x32"/>
                <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=192%2C192&amp;ssl=1" sizes="192x192"/>
            </Head>
            <Navbar/>
            <div className={`relative block w-full bg-white lg:mt-0 md:mt-0 mt-[15vh]`}>
                {children}
            </div>
        </div>
    )
}

export default LayoutAllies