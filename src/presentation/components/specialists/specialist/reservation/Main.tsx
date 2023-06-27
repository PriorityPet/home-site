import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import { DefaultInput, InputSelect } from '@/presentation/components/core/Inputs'
import React, { SetStateAction, useContext, useMemo, useState } from 'react'
import { FiArrowDown, FiArrowUp, FiBriefcase, FiCheck, FiEdit2, FiHeart, FiMapPin, FiPhone, FiPlusCircle, FiUser } from 'react-icons/fi'
import { ISpecialistsContext, SpecialistsContext } from '../../context/SpecialistsContext'
import moment from 'moment'
import 'moment/locale/es';
import { twMerge } from 'tailwind-merge'

const ReservationCard = ({specialist}:{specialist:Specialist}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  const { 
    getAttentionWindowsByService 
} = actions
  const { 
    data: localities, 
    loading: loadingLocalities, 
    successful: loadedLocalities, 
    error: errorLocalities
  } = state.getSpecialistLocalities;
  const { 
    data: services, 
    loading: loadingServices, 
    successful: loadedServices, 
    error: errorServices
  } = state.getSpecialistServices;
  const { 
    data: windows, 
    loading: loadingWindows, 
    successful: loadedWindows, 
    error: errorWindows
  } = state.getAttentionWindowsByService;

  const [listOfLocalities, setListOfLocalities] = useState([])
  const [listOfServices, setListOfServices] = useState([])

  const [step, setStep] = useState(0)
  const [service, setService] = useState(0)

  const [hourSelected, setHourSelected] = useState("")

  const HourComponent = ({hour}:{hour:any}) => {

    let isEqual = hourSelected === hour["id"]
    let hourToShow = moment(hour["fechaReserva"]).format("hh:mm a")
    let isntFree = hour["sujetoId"] !== null

    return(
      <div onClick={()=>{ setHourSelected(hour["id"]) }} className={twMerge([
        "transition font-normal text-xs w-full h-fit text-center py-2 rounded-md hover:bg-secondary/20 hover:border-secondary text-secondary  bg-secondary/10 border border-secondary/0",
        isEqual && "text-white bg-secondary",
        isntFree ? "bg-transparent text-gray-500 line-through" : "cursor-pointer"
      ])}>
        <p>{hourToShow}</p>
      </div>
    )
  }

  const DayComponent = ({day}:{day:any}) => {
    let dateSpanish = moment(day["fechaInicio"]).format("ddd")
    let dateCalendar = moment(day["fechaInicio"]).format("DD MMM")
    return(
      <div className='h-fit flex flex-col justify-start items-center gap-3'>
        <div className='flex flex-col justify-center items-center text-center gap-1 bg-white'>
          <p className='font-normal text-slate-900 text-sm capitalize'>{dateSpanish}</p>
          <p className='font-light text-slate-500 text-xs'>{dateCalendar}</p>
        </div>
        <div className='w-full h-fit flex flex-col justify-start items-center gap-2'>
          {day["Citas"].map((elem:any)=> <HourComponent hour={elem} /> )}
        </div>

      </div>
    )
  }

  const AttentionWindowsComponent = ({windows}:{windows:any[]}) => {
    
    let theresALongerList = windows.find((elem:any)=> elem["Citas"].length > 5)
    
    const [expanded, setExpanded] = useState(false)

    return(
      <>
        <div className={twMerge([
          `w-full grid grid-cols-5 gap-2 overflow-hidden relative ${expanded ? "h-fit" : "h-[41vh]"}`
        ])}>
          {windows.map((elem:any) => <DayComponent day={elem}/> )}
        </div>
        {theresALongerList && 
          <div onClick={()=>{ setExpanded(!expanded) }} className='cursor-pointer transition w-full relative flex justify-center items-center gap-2 py-3 bg-white hover:bg-secondary/5 text-secondary text-sm font-medium'>
            <p>Mostrar {expanded ? "menos" : "más"} horas</p>
            {expanded ? 
              <FiArrowUp/>
            : 
              <FiArrowDown/>
            }
          </div>
        }
      </>
    )
  }

  const DataSelection = () => {
    return(
      <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
        
        <div className='w-full flex justify-start items-start gap-5'>
          <div className='w-[10%] relative flex flex-col justify-start items-center'>
            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
              <FiMapPin/>
            </span>
          </div>
          <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
            <div className=''>
              <p className='font-medium text-slate-900 text-base'>Consultorio</p>
              <p className='font-light text-slate-500 text-sm'>Selecciona el consultorio que te convenga más</p>
            </div>
            {loadingLocalities ? 
              <p>Cargando...</p>
            : 
              <InputSelect
                onChangeCustom={(e: any) => console.log(e)}
                placeholder={"-"}
                value={""}
                list={listOfLocalities}
              />
            }
          </div>
        </div>

        <div className='w-full flex justify-start items-start gap-3'>
          <div className='w-[10%] relative flex flex-col justify-start items-center'>
            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
              <FiBriefcase/>
            </span>
          </div>
          <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
            <div className=''>
              <p className='font-medium text-slate-900 text-base'>Servicio</p>
              <p className='font-light text-slate-500 text-sm'>Selecciona la razón por la cual necesitas la consulta</p>
            </div>
            {loadingServices ?
              <p>Cargando...</p>
            : 
              <InputSelect
                onChangeCustom={(e: any) => setService(+e)}
                placeholder={"-"}
                value={service}
                list={listOfServices}
              />
            }
          </div>
        </div>
        <div className='w-full relative flex flex-col justify-start items-start gap-2'>
          <div className=''>
            <p className='font-medium text-slate-900 text-base'>Para cuando</p>
            <p className='font-light text-slate-500 text-sm'>Selecciona la fecha indicada para ti y conoce la disponibilidad</p>
          </div>
        </div>
        {(!loadedWindows && !loadingWindows) && 
          <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
            <p className="text-base text-slate-900 font-medium">Nada por aquí</p>
            <p className='text-sm text-slate-500 font-light'>Seleccina un servicio para conocer la disponibilidad</p>
          </div>
        }
        {(loadedWindows && windows.length === 0) && 
          <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
            <p className="text-base text-slate-900 font-medium">Sin ventanas de atención</p>
            <p className='text-sm text-slate-500 font-light'>No hay ventanas de atención disponibles para este servicio</p>
          </div>
        }
        {(loadedWindows && windows.length > 0) && <AttentionWindowsComponent windows={windows as any[]} />}
        <div className="w-full border-t border-slate-300 pt-6 mt-3">
          <button 
          disabled={
            service === 0 ||
            hourSelected === ""
          } 
          onClick={()=>{ setStep(1) }}
          className="btn btn-primary w-full">Agendar</button>
        </div>

      </div>
    )
  }

  const UserConfirmation = () => {
    return(
      <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
        
        <div className='w-full flex justify-start items-start gap-5'>
          <div className='w-[10%] relative flex flex-col justify-start items-center'>
            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
              <FiUser/>
            </span>
          </div>
          <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
            <div className=''>
              <p className='font-medium text-slate-900 text-base'>Cuál es tu nombre</p>
              <p className='font-light text-slate-500 text-sm'>Escribe tu nombre completo para la cita</p>
            </div>
            <div className="w-full grid grid-cols-2 justify-start items-center gap-2">
              <DefaultInput
                type='text'
                onChangeCustom={(e: any) => console.log(e)}
                placeholder={"Nombre"}
                value={""}
              />
              <DefaultInput
                type='text'
                onChangeCustom={(e: any) => console.log(e)}
                placeholder={"Apellido"}
                value={""}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex justify-start items-start gap-5'>
          <div className='w-[10%] relative flex flex-col justify-start items-center'>
            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
              <FiPhone/>
            </span>
          </div>
          <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
            <div className=''>
              <p className='font-medium text-slate-900 text-base'>Teléfono</p>
              <p className='font-light text-slate-500 text-sm'>Indica tu número de téfono en caso de necesitarlo</p>
            </div>
            <DefaultInput
              type='text'
              onChangeCustom={(e: any) => console.log(e)}
              placeholder={"..."}
              value={""}
            />
          </div>
        </div>
        <div className='w-full flex justify-start items-start gap-5'>
          <div className='w-[10%] relative flex flex-col justify-start items-center'>
            <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
              <FiHeart/>
            </span>
          </div>
          <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
            <div className=''>
              <p className='font-medium text-slate-900 text-base'>Sexo</p>
              <p className='font-light text-slate-500 text-sm'>Indica tu sexo para facilitar la información al especialista</p>
            </div>
            <InputSelect
              list={[]}
              onChangeCustom={(e: any) => console.log(e)}
              placeholder={"..."}
              value={""}
            />
          </div>
        </div>
        <div className="w-full border-t border-slate-300 pt-6 mt-3">
          <button 
          disabled={
            service === 0 ||
            hourSelected === ""
          } 
          onClick={()=>{ setStep(2) }}
          className="btn btn-primary w-full">Crear cuenta</button>
        </div>

      </div>
    )
  }

  const AppointmentConfirmation = () => {
    return(
      <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
        
        <div className='w-full h-fit flex flex-col justify-center items-start gap-4'>
          
          <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
            <p className='w-1/3 font-light text-slate-500 text-sm'>Servicio</p>
            <p className='w-2/3 font-medium text-slate-900 text-base'>Consulta general</p>
          </div>
          <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
            <p className='w-1/3 font-light text-slate-500 text-sm'>El</p>
            <p className='w-2/3 font-medium text-slate-900 text-base'>23 de Junio 2023</p>
          </div>
          <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
            <p className='w-1/3 font-light text-slate-500 text-sm'>A las</p>
            <p className='w-2/3 font-medium text-slate-900 text-base'>09:00 am</p>
          </div>
          <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
            <p className='w-1/3 font-light text-slate-500 text-sm'>Precio de la cita</p>
            <p className='w-2/3 font-medium text-slate-900 text-base'>$20</p>
          </div>

        </div>

        <div className="w-full border-t border-slate-300 pt-6 mt-3">
          <button onClick={()=>{ setStep(3) }} className="btn btn-primary w-full">Confirmar</button>
        </div>

      </div>
    )
  }

  const AppointmentSuccess = () => {
    return(
      <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
        
        <div className='w-full h-fit py-5 flex flex-col justify-center items-center gap-4'>
          <span className='w-20 h-20 flex flex-col justify-center items-center text-4xl bg-green-200 text-green-800 rounded-lg'>
            <FiCheck/>
          </span>
          <div className='w-full h-fit flex flex-col justify-center items-center gap-1'>
            <p className='text-slate-900 text-xl font-semibold'>Excelente</p>
            <p className='text-slate-500 text-base font-light'>Tu cita ha sido agendada exitosamente</p>
          </div>
        </div>

        <div className="w-full border-t border-slate-300 pt-6 mt-3">
          <button onClick={()=>{ setStep(0) }} className="btn btn-primary w-full">Regresar</button>
        </div>

      </div>
    )
  }

  function handleFormatList(){
    console.log(localities)
    let list_localities = localities.map((elem:any)=>({
      title: `${elem["nombre"]} - ${elem["direccion"]}`,
      value: elem["id"]
    }))
    setListOfLocalities(list_localities)

    let list_services = services.map((elem:any)=>({
      title: elem["nombre"],
      value: elem["id"]
    }))
    setListOfServices(list_services)
  }

  useMemo(()=>{
    if(service > 0) getAttentionWindowsByService(service, moment().format("YYYY-MM-DD"))(dispatch)
  },[service])

  useMemo(() => {
    if (loadedLocalities && loadedServices) handleFormatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities, loadedServices]);

  return (
    <div className="w-full lg:w-[40%] bg-white rounded-lg p-6 shadow-sm border sticky top-[18%] h-fit flex flex-col justify-start items-start">
      <div className="w-full h-fit pb-3 mb-3 border-b border-slate-300">
        <p className="text-lg text-slate-900 font-semibold">
          {step === 0 && "Agendar cita"}
          {step === 1 && "Crear cuenta"}
          {step === 2 && "Confirma la información"}
          {step === 3 && "Cita creada exitosamente"}
        </p>
      </div>
      {step === 0 && <DataSelection/>}
      {step === 1 && <UserConfirmation/>}
      {step === 2 && <AppointmentConfirmation/>}
      {step === 3 && <AppointmentSuccess/>}
    </div>
  )
}

export default ReservationCard