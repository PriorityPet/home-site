import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import { DefaultInput, InputSelect, SpecialSelect } from '@/presentation/components/core/Inputs'
import React, { SetStateAction, useContext, useMemo, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiBriefcase, FiCheck, FiEdit2, FiHeart, FiMapPin, FiMessageSquare, FiPhone, FiPlusCircle, FiUser } from 'react-icons/fi'
import { ISpecialistsContext, SpecialistsContext } from '../../context/SpecialistsContext'
import moment from 'moment'
import 'moment/locale/es';
import { twMerge } from 'tailwind-merge'
import { DataSelection } from './DataSelection'
import { UserConfirmation } from './UserInformation'
import { AppointmentConfirmation } from './AppointmentConfirmation'
import { AppointmentSuccess } from './AppointmentSuccess'

const ReservationCard = ({specialist}:{specialist:Specialist}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {changeAppointmentData} = actions

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

  const [step, setStep] = useState(0)

  function handleFormatList(){
    let list_localities = localities.map((elem:any)=>({
      title: elem["nombre"],
      description: elem["direccion"],
      id: elem["id"]
    }))
    setListOfLocalities(list_localities)

    console.log(services)
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
    <div className="w-full lg:w-[40%] bg-white rounded-lg p-6 shadow-sm border sticky top-[12%] h-fit flex flex-col justify-start items-start">
      <div className="w-full h-fit pb-3 mb-3 border-b border-slate-300">
        <p className="text-lg text-slate-900 font-semibold">
          {step === 0 && "Agendar cita"}
          {step === 1 && "Crear cuenta"}
          {step === 2 && "Confirma la información"}
          {step === 3 && "Cita creada exitosamente"}
        </p>
      </div>
      {step === 0 && <DataSelection listOfServices={listOfServices} listOfLocalities={listOfLocalities} step={step} setStep={setStep} />}
      {step === 1 && <UserConfirmation step={step} setStep={setStep} />}
      {step === 2 && <AppointmentConfirmation specialist={specialist} step={step} setStep={setStep} />}
      {step === 3 && <AppointmentSuccess step={step} setStep={setStep} />}
    </div>
  )
}

export default ReservationCard