import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import { FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

function LayoutAllies({children, title, activeLink}:{
    children:any;
    title: string;
    activeLink: string;
}) {
  return (
    <div className='bg-white'>
        <Head>
            <title>{`${title} - Medhaus`}</title>
            <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=32%2C32&amp;ssl=1" sizes="32x32"/>
            <link rel="icon" href="https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2021/06/cropped-logo_med-haus-01.png?fit=192%2C192&amp;ssl=1" sizes="192x192"/>
        </Head>
        <div className="w-full top-0 left-0 sticky h-[10vh] border-b border-slate-200 bg-white px-[8rem] flex justify-between items-center z-10">
            <div className='w-[13%] h-full'>
                <img className='w-full h-full object-cover' src='https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2022/09/cropped-IMG_5684.jpg?fit=927%2C927&ssl=1' alt='Plataforma médica para médicos'/>
            </div>
            <div className="w-[40%] grid grid-cols-4 gap-5 justify-between items-center justify-items-center">
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
        <div className={`relative block w-full bg-white`}>
            {children}
        </div>
    </div>
  )
}

export default LayoutAllies