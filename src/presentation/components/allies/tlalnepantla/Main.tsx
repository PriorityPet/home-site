import Link from 'next/link'
import React, { useState } from 'react'
import { FiCheck, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
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
    "Servicio de limpieza",
    "Servicio de publicidad",
    "Servicio de luz incluido en renta",
    "Servicio de agua incluido en renta",
    "Mobiliario de oficina incluido",
    "Servicio de internet incluido",
    "Aire acondicionado",
    "Consultorios con acabados terminados",
    "Zona de asistentes",
    "Salas de espera",
    "Cafetería",
    "Rayos X",
    "Laboratorio Clínico",
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
                <p className="allies-title">En <span className='text-primary'>Tlalnepantla</span>, tienes el centro médico perfecto para ti</p>
                <p className='allies-description'>Nuestros locales cuentan con servicios adicionales completamente equipados</p>
            </div>
            <div className={twMerge([
                'w-full h-full relative flex flex-col justify-center items-center',
                'lg:w-1/2 lg:px-[4%]',
            ])}>
                <ContactForm email_to={"administracion@medhaus-tlalnepantla.com"}/>
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
                <Link className='text-primary text-2xl' href="https://www.instagram.com/medhaus_tlalnepantla/" target='_blank'>
                    <FiInstagram/>
                </Link>
                <Link className='text-primary text-2xl' href="https://www.linkedin.com/company/medhaus-tlalnepantla/" target='_blank'>
                    <FiLinkedin/>
                </Link>
                <Link className='text-primary text-2xl' href="https://www.facebook.com/medhaustlalnepantla" target='_blank'>
                    <FiFacebook/>
                </Link>
            </div>
        </div>
    )
}

function Main() {
  return (
    <div>
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