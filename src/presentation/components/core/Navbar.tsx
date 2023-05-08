import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { ServicesRoutesEnum } from '@/lib/routes/servicesRoutes'
import { AuthRoutesEnum } from '@/lib/routes/authRoutes'
import { SpecialistsRoutesEnum } from '@/lib/routes/SpecialistsRoutes'
import { FiMenu } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/router'

const Ribbon = () => {
  return(
    <Link href={"/"} className='w-full h-fit p-3 flex justify-center items-center bg-gradient-to-r to-primary from-dark-primary'>
      <p className='text-white text-sm font-light'>Eres especialista y necesitas una plataforma para gestionar a todos tus pacientes ?, <span className='underline'>ve a Noodus</span></p>
    </Link>
  )
}

const Navbar = () => {

  const router = useRouter()

  const [active, setActive] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(false)

  const [activeURL, setActiveURL] = useState("")

  useMemo(()=>{
    setActiveURL(router.pathname)
  },[router.pathname])

  return (
      <div className='sticky top-0 left-0 w-full z-20 box-border'>
        <Ribbon/>
        <div className='w-full bg-white p-[0.5%_10%] max-h-[10vh] h-[10vh] border-b box-border flex justify-between items-center'>
          <Link className='w-[40%] md:w-[15%] lg:w-[15%] h-full object-contain' href="/marketplace">
            <img src='https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2022/09/cropped-IMG_5684.jpg?fit=927%2C927&ssl=1' className='w-full h-full object-cover object-center'/>
          </Link>
          <div
          onClick={()=>{ setActive(!active) }}
          className="flex lg:hidden flex-col justify-center items-center w-10 h-10 text-2xl text-primary">
            <FiMenu/>
          </div>
          <div className="hidden lg:flex justify-end items-center w-[90%] h-full gap-7 box-border">
            <Link href="/marketplace" className={twMerge([
              "text-slate-500 text-[14px]",
              activeURL.includes("/marketplace") ? "font-semibold text-slate-900" : "font-light"
            ])}>Inicio</Link>
            <Link href={`${LocalitiesRoutesEnum.Localities}`} className={twMerge([
              "text-slate-500 text-[14px]",
              activeURL.includes("/discover/localities") ? "font-semibold text-slate-900" : "font-light"
            ])}>Centros</Link>
            <Link href={`${ServicesRoutesEnum.Services}`} className={twMerge([
              "text-slate-500 text-[14px]",
              activeURL.includes("/discover/services") ? "font-semibold text-slate-900" : "font-light"
            ])}>Servicios</Link>
            <Link href={`${SpecialistsRoutesEnum.Specialists}`} className={twMerge([
              "text-slate-500 text-[14px]",
              activeURL.includes("/discover/specialists") ? "font-semibold text-slate-900" : "font-light"
            ])}>Especialistas</Link>
            <div onClick={()=>{ setActiveDropdown(!activeDropdown) }} className="btn btn-primary">Unirse</div>
            {activeDropdown && <div className='flex flex-col justify-between items-start gap-4 w-[8rem] absolute top-[6.5rem] right-[8.5rem] bg-white border rounded-md p-4 shadow-lg'>
              <Link href="/" className={twMerge(["text-slate-500 text-[14px] font-light hover:font-medium hover:text-slate-900 transition"])}>Médicos</Link>
              <Link href="/register" className={twMerge(["text-slate-500 text-[14px] font-light hover:font-medium hover:text-slate-900 transition"])}>Pacientes</Link>
            </div>}
          </div>
        </div>
        <div className={twMerge([
          "w-full relative flex lg:hidden flex-col justify-between items-start gap-4 overflow-hidden bg-white border-b text-left",
          active ? "h-fit p-[5%_10%]" : "h-0"
        ])}>
          <Link href="/marketplace" className={twMerge([
            "text-slate-500 text-[14px]",
            activeURL.includes("/marketplace") ? "font-semibold text-slate-900" : "font-light"
          ])}>Inicio</Link>
          <Link href={`${LocalitiesRoutesEnum.Localities}`} className={twMerge([
            "text-slate-500 text-[14px]",
            activeURL.includes("/discover/localities") ? "font-semibold text-slate-900" : "font-light"
          ])}>Centros</Link>
          <Link href={`${ServicesRoutesEnum.Services}`} className={twMerge([
            "text-slate-500 text-[14px]",
            activeURL.includes("/discover/services") ? "font-semibold text-slate-900" : "font-light"
          ])}>Servicios</Link>
          <Link href={`${SpecialistsRoutesEnum.Specialists}`} className={twMerge([
            "text-slate-500 text-[14px]",
            activeURL.includes("/discover/specialists") ? "font-semibold text-slate-900" : "font-light"
          ])}>Especialistas</Link>
          <div onClick={()=>{ setActiveDropdown(!activeDropdown) }} className="btn btn-primary w-full">Unirse</div>
          {activeDropdown && <div className='w-full flex flex-col justify-between items-start gap-4'>
            <Link href="/" className={twMerge(["text-slate-500 text-[14px] font-light hover:font-medium hover:text-slate-900 transition"])}>Médicos</Link>
            <Link href="/register" className={twMerge(["text-slate-500 text-[14px] font-light hover:font-medium hover:text-slate-900 transition"])}>Pacientes</Link>
          </div>}
        </div>
      </div>
  )
}

export default Navbar