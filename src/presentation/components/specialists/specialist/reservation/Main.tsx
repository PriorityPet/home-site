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
import { ILocality } from '@/lib/domain/core/entities/localityEntity';

const ReservationCard = ({specialist, customStyle, setClose}:{specialist:Specialist;customStyle:any; setClose:any}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {data: step} = state.changeStep

  const { 
    data: localities,
    successful: loadedLocalities,
  } = state.getSpecialistLocalities;

  const [listOfLocalities, setListOfLocalities] = useState([])

  function handleFormatList(){
    let list_localities = localities.map((elem:ILocality)=>({
      title: elem.name,
      description: elem.address.city,
      id: elem.id
    }))
    setListOfLocalities(list_localities)
  }
  
  useMemo(() => {
    if (loadedLocalities) handleFormatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities]);

  return (
    <div className={twMerge([
      "bg-white rounded-lg p-6 shadow-sm border items-start flex-col",
      "lg:w-[45%] lg:sticky lg:top-[12%] lg:h-fit lg:justify-start lg:overflow-y-auto",
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
      {step === 0 && listOfLocalities.length > 0 &&
        <DataSelection specialist={specialist} listOfLocalities={listOfLocalities}/>
      }
      {/*step === 1 && <UserConfirmation/>*/}
      {step === 2 && <AppointmentConfirmation specialist={specialist}/>}
      {step === 3 && <AppointmentSuccess/>}
      <div className='lg:hidden w-full text-center justify-center items-center'>
        <p onClick={()=>{ setClose(false) }} className='cursor-pointer text-base text-secondary font-light'>Regresar</p>
      </div>
    </div>
  )
}

export default ReservationCard