import React from 'react'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { ServicesRoutesEnum } from '@/lib/routes/servicesRoutes'
import { AccountRoutesEnum } from '@/lib/routes/accountRoutes'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-20 border-b bg-white max-h-[10vh] h-[10vh] p-[0.5%_10%] box-border flex justify-between items-center'>
      <Link className='w-[10%] h-full object-contain' href="/">
        <img src='/vercel.svg' className='w-full h-full object-contain'/>
      </Link>
      <div className="lg:hidden sm:block w-[90%] h-full"></div>
      <div className="sm:hidden lg:flex justify-end items-center w-[90%] h-full gap-7 box-border">
        <Link href="/" className="font-medium text-slate-500 text-[14px]">Inicio</Link>
        <Link href={`${LocalitiesRoutesEnum.Localities}`} className="font-medium text-slate-500 text-[14px]">Centros</Link>
        <Link href={`${ServicesRoutesEnum.Services}`} className="font-medium text-slate-500 text-[14px]">Servicios</Link>
        <Link href="/" className="font-medium text-slate-500 text-[14px]">Especialistas</Link>
        <Link href={`${AccountRoutesEnum.SignUp}`} className="btn btn-primary">Unirse</Link>
      </div>
    </div>
  )
}

export default Navbar