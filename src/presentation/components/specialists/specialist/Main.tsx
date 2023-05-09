import React, { useContext, useMemo } from 'react'
import { DefaultInput } from '../../core/Inputs'
import { FiDollarSign, FiGlobe, FiHome, FiPhone, FiStar } from 'react-icons/fi'
import ReservationCard from '../../core/Reservation/ReservationCard'
import { twMerge } from 'tailwind-merge'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { ISpecialistsContext, SpecialistsContext } from '../context/SpecialistsContext'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'

function Main() {

    const UserCardComponent = ({specialist}:{specialist:Specialist}) => {
        return(
            <div className="w-full lg:w-[30%] relative h-fit flex flex-col justify-start items-start">
                <div className="w-full h-fit bg-white rounded-lg p-5 shadow-lg border flex flex-col justify-start items-start gap-5">
                    <div className='w-36 h-36 overflow-hidden rounded-full mx-auto'><img src={specialist["image"]} className='w-full h-full object-cover' /></div>
                    <div className="w-full text-center">
                        <p className='subtitle'>{specialist["name"]}</p>
                        <p className='paragraph'>Odontólogo</p>
                    </div>
                    <div className={twMerge('w-full h-fit p-[0.35rem_1rem] rounded font-medium text-[12px] text-white text-center',
                        specialist?.status?.toString() === "0" && "bg-success",
                        specialist?.status?.toString() === "1" && "bg-warning",
                    )}>
                        {specialist?.status?.toString() === "0" && "Disponible"}
                        {specialist?.status?.toString() === "1" && "No disponible"}
                    </div>
                    <div className="btn btn-primary w-full">Reservar cita</div>
                </div>
            </div>
        )
    }

    const InformationComponent = ({specialist}:{specialist:Specialist}) => {
        return(
            <div className="w-full lg:w-[60%] relative h-fit flex flex-col justify-start items-start gap-5">
                <p className='title mb-5'>Información sobre mí</p>
                <div className="w-full flex justify-start items-start gap-3">
                    <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
                        <FiStar/>
                    </div>
                    <div className="flex flex-col justify-center items-start gap-1">
                        <p className='subtitle'>Especialista en:</p>
                        <p className='paragraph'>Esp. en Ortodoncia, Ms. en Endodoncia, Periodoncia, Odontopediatría</p>
                    </div>
                </div>
                <div className="w-full bg-slate-300 h-px block relative"></div>
                <p className='paragraph'>Me especializo en el diagnóstico, tratamiento y prevención de enfermedades y trastornos que afectan la salud oral y dental.</p>
                <div className="w-full bg-slate-300 h-px block relative"></div>
                <div className="w-full flex justify-between items-center gap-3">
                    <div className="w-1/2 flex justify-start items-start gap-3">
                        <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
                            <FiPhone/>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <p className='subtitle'>Teléfono:</p>
                            <p className='paragraph'>{specialist?.phone}</p>
                        </div>
                    </div>
                    <div className="w-1/2 flex justify-start items-start gap-3">
                        <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
                            <FiGlobe/>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <p className='subtitle'>Sitio web:</p>
                            <p className='paragraph'>www.mipagina.com</p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    const pathname = usePathname();
    const router = useRouter();
    
    const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
    const { getSpecialist } = actions
    const { 
      data, 
      loading, 
      successful, 
      error 
    } = state.getSpecialist;
  
    useMemo(() => {
      const url = pathname?.split("/")
      if(url){
        let id = url![url!.length - 1]
        getSpecialist(parseInt(id))(dispatch)
      }
    }, [pathname]);

    return (
        <div className="w-full flex flex-wrap flex-col lg:flex-row lg:flex-nowrap justify-between items-start gap-6 px-[7%] lg:px-[13%]">
            {loading && <p>Cargando...</p>}
            {successful && <>
                <UserCardComponent specialist={data as Specialist}/>
                <InformationComponent specialist={data as Specialist}/>
            </>}
        </div>
    )
}

export default Main