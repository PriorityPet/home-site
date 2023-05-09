import Link from 'next/link'
import React, { useState } from 'react'
import { FiAlertOctagon, FiCheck, FiFacebook, FiInstagram, FiLinkedin, FiTruck } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { Contact } from '../components/Contact'
import { Services } from '../components/Services'
import { Benefits } from '../components/Benefits'
import { Installations } from '../components/Installations'
import { ContactForm } from '../components/ContactForm'

let list_images = [
    "../img/tlalneplantla/1.jpg",
    "../img/tlalneplantla/2.jpg",
    "../img/tlalneplantla/3.jpg",
    "../img/tlalneplantla/4.jpg",
]

let list_services = [
    "Servicio de recepción general",
    "Servicio de Agenda",
    "Servicio de limpieza",
    "Servicio de publicidad",
    "Servicio de luz incluído en renta",
    "Servicio de internet incluído en renta",
    "Convenios con comercios locales",
    "Servicio de agua incluido en renta",
    "Mobiliario de oficina incluido zona para asistentes",
    "Cafetería",
    "Consultorios con acabados terminados",
    "Salas de espera",
    "Laboratorio Clínico",
    "Snack bar",
    "Gimnasio",
    "SPA",
    "Estacionamiento incluido",
]

const Header = () => {
    return (
        <div className={twMerge([
            'w-full flex flex-col justify-center items-center gap-[4.5rem] h-fit px-[12%]',
            'lg:px-[8rem] lg:flex-row lg:h-[90vh]',
        ])}>
            <div className={twMerge([
                'w-full h-full relative flex flex-col justify-center items-start gap-5 text-center',
                'lg:w-1/2 lg:text-left',
            ])}>
                <div className="w-full border border-1 border-yellow-700 bg-yellow-100 h-fit text-left flex justify-start items-center p-3 rounded-md gap-3">
                    <div className='w-8 h-8 flex justify-center items-center text-yellow-700 text-2xl'>
                        <FiAlertOctagon/>
                    </div>
                    <div className="">
                        <p className='text-yellow-700 text-base font-semibold'>Advertencia</p>
                        <p className='text-yellow-700 text-sm font-light'>Este proyecto está en construcción</p>
                    </div>
                </div>
                <p className="allies-title">En <span className='text-primary'>Interlomas</span>, tienes el centro médico perfecto para ti</p>
                <p className='allies-description'>Nuestros locales cuentan con servicios adicionales completamente equipados</p>
            </div>
            <div className={twMerge([
                'w-full h-full relative flex flex-col justify-center items-center',
                'lg:w-1/2 lg:px-[4%]',
            ])}>
                <ContactForm/>
            </div>
        </div>
    )
}

const Footer = () => {
    return(
        <div className={twMerge([
            "w-full h-[15vh] border-t border-slate-200 bg-white p-[3rem_2rem] flex flex-col justify-center items-center text-center gap-2",
            "lg:p-[3rem_8rem]",
            "md:p-[3rem_8rem]",
        ])}>            <p className='text-slate-900 text-base font-light'>2023 MedHaus. Todos los derechos reservados</p>
            <div className="w-[50%] flex gap-[1rem] justify-center items-center">
                <Link className='text-primary text-2xl' href="https://www.facebook.com/medhausinterlomas" target='_blank'>
                    <FiFacebook/>
                </Link>
            </div>
        </div>
    )
}

function Main() {
  return (
    <div className='md:mt-0 lg:mt-0 mt-[8rem]'>
        <Header/>
        <Installations list={list_images}/>
        <Benefits/>
        <Services list={list_services}/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Main