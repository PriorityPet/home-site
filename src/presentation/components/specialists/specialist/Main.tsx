import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DefaultInput } from '../../core/Inputs'
import { FiDollarSign, FiGlobe, FiHome, FiImage, FiPhone, FiStar, FiUser } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { ISpecialistsContext, SpecialistsContext } from '../context/SpecialistsContext'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import ReservationCard from './reservation/Main'
import moment from 'moment';

const UserCardComponent = ({specialist}:{specialist:Specialist}) => {

    const [ageBirth, setAgeBirth] = useState(0)

    function formatDateBirth(){
        var years = moment().utc().diff(moment(specialist?.birthDate, "YYYY-MM-DD"), 'years');
        setAgeBirth(years)
    }
    useEffect(()=>{
        formatDateBirth()
    },[specialist])

    return(
        <div className="w-full lg:w-[55%] bg-white rounded-lg p-6 shadow-sm border relative h-fit flex flex-col justify-start items-start gap-5">
            <div className="w-full h-fit flex justify-start items-center gap-5">
                <div className='w-36 h-36 overflow-hidden rounded-md border'>
                    {specialist?.avatar !== "" ? 
                        <img src={specialist?.avatar} className='w-full h-full object-cover' />
                    :     
                        <span className='w-full h-full flex justify-center items-center bg-slate-200 text-slate-400 text-4xl'>
                            <FiImage/>
                        </span>
                    }
                </div>
                <div className="h-36 flex flex-col justify-start items-start text-left">
                    <p className='text-lg text-slate-900 font-semibold'>
                        {specialist.sex === 1 ? "Dra." : "Dr."} {specialist?.names} {specialist?.firstName}
                    </p>
                    <div className="flex flex-col justify-center items-start">
                        {ageBirth > 0 && <p className='text-base text-slate-500 font-light'>{ageBirth} años</p>}
                        <p className='text-base text-slate-500 font-light'>{specialist?.country}</p>
                        <p className='text-base text-slate-500 font-light'>CURP: {specialist.curp ?? "-"}</p>
                    </div>
                </div>
            </div>
            <InformationComponent specialist={specialist} />
            <LocalitiesComponent specialist={specialist} />
        </div>
    )
}

const InformationComponent = ({specialist}:{specialist:Specialist}) => {
    return(
        <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
            <div className='w-full flex flex-col justify-center items-start gap-2'>
                <p className='text-lg text-slate-900 font-semibold'>Información sobre mí</p>
                <div className="w-full bg-slate-300 h-px block relative"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                <p className='text-base text-slate-900 font-light'>{specialist?.aboutMe}</p>
                <div className="w-full flex justify-between items-center gap-3">
                    <div className="w-1/2 flex justify-start items-start gap-3">
                        <div className="flex justify-center items-center w-12 h-12 text-lg text-secondary text-center rounded-md bg-white border">
                            <FiStar/>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <p className='subtitle'>Especialista en:</p>
                            <div className="flex flex-col justify-center items-start gap-1">
                                {specialist.specialities.map((elem:any)=> 
                                    <div className='w-full flex justify-start items-center gap-2'>
                                        <span className='w-1 h-1 rounded-full bg-slate-500'></span>
                                        <p className='paragraph'>{elem["nombre"]} - {elem["institucion"]}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-start items-start gap-3">
                        <div className="flex justify-center items-center w-12 h-12 text-lg text-secondary text-center rounded-md bg-white border">
                            <FiPhone/>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <p className='subtitle'>Teléfono:</p>
                            <p className='paragraph'>{specialist?.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const LocalitiesComponent = ({specialist}:{specialist:Specialist}) => {

    const { state } = useContext<ISpecialistsContext>(SpecialistsContext);
    const { 
        data: localities, 
        loading: loadingLocalities, 
        successful: loadedLocalities, 
        error: errorLocalities
      } = state.getSpecialistLocalities;

    return(
        <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
            <div className='w-full flex flex-col justify-center items-start gap-2'>
                <p className='text-lg text-slate-900 font-semibold'>Consultorios</p>
                <div className="w-full bg-slate-300 h-px block relative"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                {loadingLocalities ? 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Cargando...</p>
                        <p className='text-slate-500 text-sm font-light'>Obteniendo los consultorios del especialista</p>    
                    </div>
                : localities.length > 0 ? localities.map((elem:any)=> 
                    <div className="w-full flex justify-start items-start gap-3 border border-slate-300 rounded-md p-3">
                        <div className='w-[8%] relative flex flex-col justify-start items-center'>
                            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center text-lg'>
                                <FiHome/>
                            </span>
                        </div>
                        <div className='w-[92%] flex flex-col justify-center items-start gap-2'>
                            <p className='paragraph text-slate-900'><b>{elem["nombre"]}</b> - Nro. de consultorio: {elem["consultorio"]}</p>
                            <p className='paragraph'>{elem["ciudad"]} - {elem["direccion"]}</p>
                        </div>
                    </div>
                ) : 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Nada por aquí</p>
                        <p className='text-slate-500 text-sm font-light'>Tal parece que este especialista no tiene consultorios aún</p>    
                    </div>
                }
            </div>
        </div>
    )
}

function Main() {

    const pathname = usePathname();
    const router = useRouter();
    
    const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
    const { 
        getSpecialist, 
        getSpecialistLocalities, 
        getSpecialistServices 
    } = actions
    const { 
      data, 
      loading, 
      successful, 
      error 
    } = state.getSpecialist;

    const [activeReservationCard, setActiveReservationCard] = useState(false)
  
    useMemo(() => {
      const url = pathname?.split("/")
      if(url){
        let id = url![url!.length - 1]
        getSpecialist(parseInt(id))(dispatch)
        getSpecialistLocalities(parseInt(id))(dispatch)
      }
    }, [pathname]);

    return (
        <div className="w-full flex flex-wrap flex-col lg:flex-row lg:flex-nowrap justify-between items-start gap-6 px-[7%] lg:px-[8%] relative">
            {loading && <div className='w-full h-[40vh] flex flex-col justify-center items-center text-center'>
                <p className='font-semibold text-base text-slate-900'>Espere un momento...</p>
                <p className='font-light text-sm text-slate-700'>Obteniendo información del especialista</p>
            </div>}
            {successful && <>
                <UserCardComponent specialist={data as Specialist}/>
                <ReservationCard setClose={setActiveReservationCard} customStyle={twMerge([
                    activeReservationCard ? "flex z-10" : "lg:flex hidden"
                ])} specialist={data as Specialist} />
                <div className='lg:hidden fixed bottom-0 left-0 w-full p-4 flex flex-col justify-center items-center bg-white'>
                    <div onClick={()=>{ setActiveReservationCard(true) }} className='btn btn-primary w-full'>Agendar cita</div>
                </div>
            </>}
        </div>
    )
}

export default Main