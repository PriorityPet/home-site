import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-20 border-b bg-white max-h-[10vh] h-[10vh] p-[0.5%_10%] box-border flex justify-between items-center'>
      <Link className='w-[10%] h-full object-contain' href="/">
        <img src='../vercel.svg' className='w-full h-full object-contain'/>
      </Link>
      <div className="lg:hidden sm:block w-[90%] h-full"></div>
      <div className="sm:hidden lg:flex justify-end items-center w-[90%] h-full gap-7 box-border">
        <Link href="/" className="font-medium text-slate-500 text-[14px]">Inicio</Link>
        <Link href="/centers" className="font-medium text-slate-500 text-[14px]">Centros</Link>
        <Link href="/" className="font-medium text-slate-500 text-[14px]">Servicios</Link>
        <Link href="/" className="font-medium text-slate-500 text-[14px]">Especialistas</Link>
        <div className="w-fit p-[10px_40px] block relative bg-primary font-semibold text-[13px] text-white rounded-md cursor-pointer">Unirse</div>
      </div>
    </div>
  )
}

export default Navbar