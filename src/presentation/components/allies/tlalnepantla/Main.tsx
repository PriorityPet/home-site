import Link from 'next/link'
import React, { useState } from 'react'
import { FiCheck, FiFacebook, FiInstagram, FiLinkedin } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

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

const ContactForm = () => {
    return(
        <div className='w-full h-fit bg-white border border-slate-200 shadow-lg p-6 flex flex-col justify-start items-center gap-[2.5rem] rounded-lg'>
            <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className='font-semibold text-slate-900 text-[2rem]'>Contáctanos</p>
                <p className='font-light text-slate-500 text-base'>Envíanos un mensaje para que trabajemos juntos</p>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4">
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='font-light text-sm text-slate-600'>Tu nombre</p>
                    <input 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    type='text' placeholder='Escribe tu nombre completo...' />
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='font-light text-sm text-slate-600'>Correo electrónico</p>
                    <input 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    type='email' placeholder='contacto@mail.com' />
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='font-light text-sm text-slate-600'>Mensaje</p>
                    <textarea 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    placeholder='Hablanos de lo que necesites...'></textarea>
                </div>
            </div>
            <div className='bg-primary text-white w-full h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer text-center hover:bg-dark-primary transition'>Enviar</div>
        </div>
    )
}

const Header = () => {
    return (
        <div className='w-full flex justify-center items-center gap-[4.5rem] h-[90vh] px-[8rem]'>
            <div className='w-1/2 h-full relative flex flex-col justify-center items-start gap-5'>
                <p className="text-secondary font-bold text-[3rem] leading-[50px]">En <span className='text-primary'>Tlalnepantla</span>, tienes el centro médico perfecto para ti</p>
                <p className='text-[#798493] font-light text-base'>Nuestros locales cuentan con servicios adicionales completamente equipados</p>
            </div>
            <div className='w-1/2 h-full px-[5rem] relative flex flex-col justify-center items-center'>
                <ContactForm/>
            </div>
        </div>
    )
}

const InstallationComponent = ({src, active, customClick}:{
    src:string;
    active:boolean;
    customClick:Function;
}) => {
    return(
        <div onClick={()=>{ customClick() }} className={twMerge([
            "overflow-hidden h-[15vh] rounded-md cursor-pointer border",
            active ? "opacity-100 border-primary" : "opacity-50 border-transparent"
        ])}>
            <img src={src} className='w-full h-full object-cover'/>
        </div>
    )
}

const Installations = () => {

    const [active, setActive] = useState(0)

    return (
        <div className='w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[8rem] my-[4rem] text-center'>
            <div className='w-full flex flex-col justify-center items-center text-center gap-5'>
                <p className='text-secondary font-bold text-[3rem] leading-[50px]'>Nuestras instalaciones</p>
                <p className='w-[80%] text-[#798493] font-light text-base'>Contamos con cómodas y amplias instalaciones con áreas comunes, recepción, farmacia, laboratorio médico, cafetería y amenidades para nuestros médicos y usuarios</p>
            </div>
            <div className="w-[80%] mx-auto h-[50vh] overflow-hidden rounded-lg">
                <img src={list_images[active]} className='w-full h-full object-cover' />
            </div>
            <div className="w-[50%] grid grid-cols-4 justify-center items-center gap-[2rem]">
                {list_images.map((elem, i) => <InstallationComponent key={i} customClick={()=>{ setActive(i) }} active={active === i} src={elem} />)}
            </div>
        </div>
    )
}

const BenefitInList = ({title, description, image}:{
    title: string;
    description: string;
    image: string;
}) => {
    return(
        <div className='w-full h-fit relative flex justify-start items-start gap-6'>
            <img className='w-[35px] h-[35px] object-contain block' src={image}/>
            <div className="w-11/12 flex flex-col justify-start items-start gap-2 text-left">
                <p className='font-bold text-base text-secondary'>{title}</p>
                <p className='font-light text-base text-[#798493]'>{description}</p>
            </div>
        </div>
    )
}

const Benefits = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[8rem] my-[4rem] text-center'>
            <div className='w-full flex flex-col justify-center items-cente text-center gap-5'>
                <p className='text-secondary font-bold text-[3rem] leading-[50px]'>Beneficios que podrás disfrutar</p>
                <p className='text-[#798493] font-light text-base'>Estos son solo algunos de los beneficios que podrías esperar al rentar un local en MedHaus. Cada centro médico puede ofrecer distintos beneficios únicos que podrían ser de interés para ti</p>
            </div>
            <div className="w-full flex justify-between items-center gap-[3rem]">
                <div className='w-1/2 h-full relative flex flex-col justify-start items-start gap-4'>
                    <BenefitInList 
                        title="Acceso a una clientela segura" 
                        description="Contamos con una base de pacientes asegurados, lo que te proporciona una oportunidad única de capturar este mercado y hacer crecer tu negocio." 
                        image="../img/icons/icon-4.png" 
                    />
                    <BenefitInList 
                        title="Comodidad en un entorno sanitario" 
                        description="Te ofrecemos la tranquilidad de saber que las instalaciones están diseñadas para cumplir con los estándares más altos de limpieza e higiene." 
                        image="../img/icons/icon-5.png" 
                    />
                    <BenefitInList 
                        title="Oportunidades de colaboración" 
                        description="Al compartir espacio en MedHaus, tendrás muchas oportunidades para colaborar con otros profesionales de la salud. " 
                        image="../img/icons/icon-6.png" 
                    />
                    <BenefitInList 
                        title="Marketing integrado" 
                        description="Estarás presente en un mercado focalizado en la salud, por lo que esto puede simplificarte el marketing y permitirte llegar a más personas interesadas en la salud y el bienestar." 
                        image="../img/icons/icon-7.png" 
                    />
                </div>
                <div className='w-1/2 h-full block relative'>
                    <img className='w-full h-full object-cover' src='../img/benefits.png' alt='Plataforma médica para médicos'/>
                </div>
            </div>
        </div>
    )
}

const ServicePill = ({title}:{title:string}) => {
    return(
        <div className='w-fit p-3 rounded-md border border-primary flex justify-start items-center gap-2 bg-white cursor-default'>
            <div className="w-7 h-7 rounded-full bg-primary/30 text-primary flex justify-center items-center text-sm">
                <FiCheck/>
            </div>
            <p className='text-sm font-light text-slate-900'>{title}</p>
        </div>
    )
}

const Services = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[8rem] my-[4rem] text-center'>
            <div className='w-full flex flex-col justify-center items-cente text-center gap-5'>
                <p className='text-secondary font-bold text-[3rem] leading-[50px]'>Servicios particulares en <span className='text-primary'>Tlalnepantla</span></p>
                <p className='text-[#798493] font-light text-base w-[60%] mx-auto'>Somos el único centro médico del sur de la ciudad de México que reune las mejores especialidades médicas para consulta en un solo lugar</p>
            </div>
            <div className="w-full flex justify-center items-center gap-[1rem] flex-wrap">
                {list_services.map((elem, i) => <ServicePill title={elem} key={i} /> )}
            </div>
        </div>
    )
}

const Contact = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center gap-[3rem] h-fit px-[8rem] my-[7rem] text-center'>
            <p className='text-secondary font-bold text-[3rem] leading-[50px]'>¿Quieres tener más información?</p>
            <div className='bg-primary text-white w-fit h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer hover:bg-dark-primary transition'>Envíanos un mensaje</div>
        </div>
    )
}


const Footer = () => {
    return(
        <div className="w-full h-[15vh] border-t border-slate-200 bg-white p-[3rem_8rem] flex flex-col justify-center items-center text-center gap-2">
            <p className='text-slate-900 text-base font-light'>2023 MedHaus. Todos los derechos reservados</p>
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
        <Installations/>
        <Benefits/>
        <Services/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Main