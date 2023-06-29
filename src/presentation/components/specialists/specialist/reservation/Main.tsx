import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import React, { useContext, useMemo, useState } from 'react'
import { ISpecialistsContext, SpecialistsContext } from '../../context/SpecialistsContext'
import moment from 'moment'
import 'moment/locale/es';
import { twMerge } from 'tailwind-merge'
import { DataSelection } from './DataSelection'
import { UserConfirmation } from './UserInformation'
import { AppointmentConfirmation } from './AppointmentConfirmation'
import { AppointmentSuccess } from './AppointmentSuccess'

const ReservationCard = ({specialist, customStyle, setClose}:{specialist:Specialist;customStyle:any; setClose:any}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {changeAppointmentData} = actions

  const {data: step} = state.changeStep

  const {
    successful: changedServiceId,
    data: service
  } = state.changeService;

  const {
    data: appointmentData
  } = state.changeAppointmentData;

  const { 
    data: localities,
    successful: loadedLocalities,
  } = state.getSpecialistLocalities;

  const { 
    data: services,
    successful: loadedServices,
  } = state.getSpecialistServices;

  const [listOfLocalities, setListOfLocalities] = useState([])
  const [listOfServices, setListOfServices] = useState([])

  function handleFormatList(){
    let list_localities = localities.map((elem:any)=>({
      title: elem["nombre"],
      description: elem["direccion"],
      id: elem["id"]
    }))
    setListOfLocalities(list_localities)

    let list_services = services.map((elem:any)=>({
      title: elem["nombre"],
      description: elem["descripcion"] + " - $" + elem["precioBase"],
      id: elem["id"]
    }))
    setListOfServices(list_services)
  }

  function loadServiceIntoAppointmentData(){
    let findedService = services.find((elem:any)=> elem["id"] === service )
    findedService = {
      ...appointmentData,
      title: findedService["nombre"],
      price: findedService["precioBase"]
    }
    changeAppointmentData(findedService)(dispatch)
  }

  useMemo(()=>{
    if(changedServiceId) loadServiceIntoAppointmentData()
  },[changedServiceId])

  useMemo(() => {
    if (loadedLocalities && loadedServices) handleFormatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities, loadedServices]);

  return (
    <div className={twMerge([
      "bg-white rounded-lg p-6 shadow-sm border items-start flex-col",
      "lg:w-[40%] lg:sticky lg:top-[12%] lg:h-fit lg:justify-start lg:overflow-y-auto",
      "w-full fixed top-[7%] left-0 h-[93%] justify-between overflow-y-scroll",
      customStyle
    ])}>
      <div className="w-full h-fit pb-3 mb-3 border-b border-slate-300">
        <p className="text-lg text-slate-900 font-semibold">
          {step === 0 && "Agendar cita"}
          {step === 1 && "Crear cuenta"}
          {step === 2 && "Confirma la información"}
          {step === 3 && "Cita creada exitosamente"}
        </p>
      </div>
      {step === 0 && <DataSelection listOfServices={listOfServices} listOfLocalities={listOfLocalities}/>}
      {step === 1 && <UserConfirmation/>}
      {step === 2 && <AppointmentConfirmation specialist={specialist}/>}
      {step === 3 && <AppointmentSuccess/>}
      <div className='lg:hidden w-full text-center justify-center items-center'>
        <p onClick={()=>{ setClose(false) }} className='cursor-pointer text-base text-secondary font-light'>Regresar</p>
      </div>
    </div>
  )
}

export default ReservationCard