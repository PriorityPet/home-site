import React from 'react'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { ServicesRoutesEnum } from '@/lib/routes/servicesRoutes'
import { AuthRoutesEnum } from '@/lib/routes/authRoutes'

const Ribbon = () => {
  return(
    <Link href={"/"} className='w-full h-fit p-3 flex justify-center items-center bg-gradient-to-r to-primary from-dark-primary'>
      <p className='text-white text-sm font-light'>Eres especialista y necesitas una plataforma para gestionar a todos tus pacientes ?, <span className='underline'>ve a Noodus</span></p>
    </Link>
  )
}

const Navbar = () => {
  return (
      <div className='fixed top-0 left-0 w-full z-20 box-border'>
        <Ribbon/>
        <div className='w-full bg-white p-[0.5%_10%] max-h-[10vh] h-[10vh] border-b box-border flex justify-between items-center'>
          <Link className='w-[15%] h-full object-contain' href="/">
            <img src='https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2022/09/cropped-IMG_5684.jpg?fit=927%2C927&ssl=1' className='w-full h-full object-cover object-center'/>
          </Link>
          <div className="lg:hidden sm:block w-[90%] h-full"></div>
          <div className="sm:hidden lg:flex justify-end items-center w-[90%] h-full gap-7 box-border">
            <Link href="/" className="font-medium text-slate-500 text-[14px]">Inicio</Link>
            <Link href={`${LocalitiesRoutesEnum.Localities}`} className="font-medium text-slate-500 text-[14px]">Centros</Link>
            <Link href={`${ServicesRoutesEnum.Services}`} className="font-medium text-slate-500 text-[14px]">Servicios</Link>
            <Link href="/" className="font-medium text-slate-500 text-[14px]">Especialistas</Link>
            <Link href={`${AuthRoutesEnum.SignUp}`} className="btn btn-primary">Unirse</Link>
          </div>
        </div>
      </div>
  )
}

export default Navbar