import React, { useContext, useMemo, useState } from 'react'
import { DefaultInput } from '../../core/Inputs'
import { FiDollarSign, FiHome } from 'react-icons/fi'
import ReservationCard from '../../core/Reservation/ReservationCard'
import { IServicesContext, ServicesContext } from '../context/ServicesContext'
import { Service } from '@/lib/domain/core/entities/services/service'
import { redirect, usePathname } from "next/navigation";
import { useRouter } from 'next/router'

function Main() {

  const HeaderComponent = ({service}:{service:Service;}) => {
    return(
      <div className="w-full h-[25vh] rounded-lg overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-r from-dark-primary/50 to-dark-primary/15 absolute top-0 left-0 flex flex-col justify-center items-start p-8">
          <p className="text-white font-normal text-2xl">{service.name}</p>
          <p className="text-white font-light text-base">{service.categorie}</p>
        </div>
        <img className='w-full h-full object-cover object-center' src={service.image} alt={service.name} />
      </div>
    )
  }

  const HeaderInformationComponent = ({service}:{service:Service;}) => {
    return(
      <div className="w-full h-fit relative flex flex-col gap-4">
      </div>
    )
  }

  const InformationComponent = ({service}:{service:Service;}) => {
    return(
      <div className="w-full lg:w-[58%] relative h-fit flex flex-col justify-start items-start gap-5">
        <p className='title'>Información de este servicio</p>
        <div className="w-full flex justify-start items-start gap-3">
          <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
            <FiHome/>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <p className='subtitle'>Tlalnepantla</p>
            <p className='paragraph'>Av. Tlalnepantla-Tenayuca 25, San Bartolo Tenayuca, 54150 Tlalnepantla de Baz, México</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 h-px block relative"></div>
        <p className='paragraph'>Hacemos la limpieza dental usando ultrasonido, que funciona a base de vibración y agua a presión. Este procedimiento se realiza en tan sólo 1 sesión.</p>
        <div className="w-full flex justify-start items-start gap-3">
          <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
            <FiDollarSign/>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <p className='subtitle'>Precio</p>
            <p className='paragraph'>$30.00</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 h-px block relative"></div>
        <p className='paragraph'>
          Ortodoncia: Corrección de la alineación dental y de la mandíbula.<br/>
          Endodoncia: Tratamiento de los conductos radiculares y la pulpa dental.<br/>
          Periodoncia: Me enfoco en el tratamiento y prevención de enfermedades de las encías y estructuras de soporte dental.
          Odontopediatría: Me especializo en el cuidado dental de los niños.<br/>
          Odontología estética: Mejoro la apariencia dental a través de técnicas como blanqueamiento, carillas, entre otros.<br/>
          Cirugía oral y maxilofacial: Trato enfermedades, lesiones y defectos en la boca, la cabeza, el cuello, la cara, la mandíbula y los tejidos duros y blandos de la región maxilofacial.<br/>
          Odontología restaurativa: Restauro la función y la estética dental mediante técnicas como las prótesis dentales.
        </p>
      </div>
    )
  }

  const pathname = usePathname();
  const router = useRouter();
  
  const { state, actions, dispatch } = useContext<IServicesContext>(ServicesContext);
  const { getService } = actions
  const { 
    data, 
    loading, 
    successful, 
    error 
  } = state.getService;

  useMemo(() => {
    const url = pathname?.split("/")
    if(url){
      let id = url![url!.length - 1]
      getService(parseInt(id))(dispatch)
    }
  }, [pathname]);

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-start gap-5 px-[7%] lg:px-[13%]">
      {loading && <p>Cargando...</p>}
      {successful && <>
        <HeaderComponent service={data as Service} />
        <HeaderInformationComponent service={data as Service} />
        <div className="w-full flex flex-wrap flex-col lg:flex-row lg:flex-nowrap justify-between items-start gap-6">
          <InformationComponent service={data as Service} />
          <ReservationCard />
        </div>
      </>}
    </div>
  )
}

export default Main