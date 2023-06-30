import { SpecialSelect } from "@/presentation/components/core/Inputs"
import moment from "moment"
import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react"
import { FiArrowDown, FiArrowUp, FiBriefcase, FiChevronLeft, FiChevronRight, FiMapPin } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext"
import { MdArrowBack, MdArrowLeft } from "react-icons/md"

const HourComponent = ({hour, setHourSelected, hourSelected}:{
    hour:any;
    setHourSelected:Dispatch<SetStateAction<string>>;
    hourSelected:string;
}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {changeAppointmentData} = actions
  const {
    data: appointmentData
  } = state.changeAppointmentData;

  let dateCorrect = moment(hour["fechaReserva"]).toDate()

  let isEqual = hourSelected === hour["id"]
  let hourToShow = moment(hour["fechaReserva"]).utc().format("hh:mm a")
  let disabled = moment(dateCorrect).isBefore(moment().utc(true))
  let isntFree = hour["sujetoId"] !== null

  function selectHour(data:any){
    setHourSelected(data["id"])
    let dateDataChanged = {
      ...appointmentData,
      date: moment(data["fechaReserva"]).utc().format("dddd, MMMM D YYYY"),
      hour: moment(data["fechaReserva"]).utc().format("hh:mm a")
    }
    changeAppointmentData(dateDataChanged)(dispatch)
  }

  return(
    <div onClick={()=>{ (!disabled && !isntFree) && selectHour(hour) }} className={twMerge([
      "transition font-normal text-xs w-full h-fit text-center py-2 rounded-md text-secondary  bg-secondary/10 border border-secondary/0",
      isEqual && "text-white bg-secondary",
      isntFree && "bg-transparent text-gray-500 line-through",
      disabled && "bg-transparent text-gray-500 cursor-not-allowed",
      (!disabled && !isntFree) && "cursor-pointer hover:bg-secondary/20 hover:border-secondary"
    ])}>
      <p>{hourToShow}</p>
    </div>
  )
}

const DayComponent = ({day, setHourSelected, hourSelected}:{
    day:any;
    setHourSelected:Dispatch<SetStateAction<string>>;
    hourSelected:string;
}) => {
    let dateSpanish = moment(day["fechaInicio"]).format("ddd")
    let dateCalendar = moment(day["fechaInicio"]).format("DD MMM")
    return(
      <div className='h-fit flex flex-col justify-start items-center gap-3'>
        <div className='flex flex-col justify-center items-center text-center gap-1 bg-white'>
          <p className='font-normal text-slate-900 text-sm capitalize'>{dateSpanish}</p>
          <p className='font-light text-slate-500 text-xs'>{dateCalendar}</p>
        </div>
        <div className='w-full h-fit flex flex-col justify-start items-center gap-2'>
          {day["Citas"]
            .sort((a:any,b:any) => Date.parse(a["fechaReserva"]) - Date.parse(b["fechaReserva"]) )
            .map((elem:any)=> <HourComponent
            setHourSelected={setHourSelected}
            hourSelected={hourSelected} 
            hour={elem} 
            /> )}
        </div>

      </div>
    )
}

const AttentionWindowsComponent = ({windows, setHourSelected, hourSelected}:{
    windows:any[];
    setHourSelected:Dispatch<SetStateAction<string>>;
    hourSelected:string;
}) => {
    
    let theresALongerList = windows.find((elem:any)=> elem["Citas"].length > 5)
    
    const [expanded, setExpanded] = useState(false)

    return(
      <>
        <div className={twMerge([
          `w-full grid grid-cols-5 gap-2 overflow-hidden relative ${expanded ? "h-fit" : "h-[41vh]"}`
        ])}>
          {windows.map((elem:any) => <DayComponent 
            setHourSelected={setHourSelected}
            hourSelected={hourSelected}
            day={elem}
          /> )}
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

export const DataSelection = ({listOfServices, listOfLocalities}:{
  listOfServices: any[];
  listOfLocalities: any[];
}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  
  const {
    changeLocality,
    changeService,
    changeHourSelected,
    changeStep,
    getAttentionWindowsByService
  } = actions

  const { data: service } = state.changeService;
  const { data: locality } = state.changeLocality;

  const { 
    data: windows, 
    loading: loadingWindows, 
    successful: loadedWindows, 
    error: errorWindows
  } = state.getAttentionWindowsByService;

  const {
    successful: changedHourSelected
  } = state.changeHourSelected;

  const [hourSelected, setHourSelected] = useState("")
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

  useMemo(()=> {
    if(changedHourSelected) changeStep(1)(dispatch)
  } ,[changedHourSelected])

  useMemo(()=> getAttentionWindowsByService(service, date)(dispatch) ,[date])

  useMemo(()=>{
    if(service > 0) getAttentionWindowsByService(service, date)(dispatch)
  },[service])

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
          <SpecialSelect customClick={(value:any)=>{ console.log(value["id"]) }} selectedItem={(value:any)=> changeLocality(value["id"])(dispatch) } list={listOfLocalities} />
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
          <SpecialSelect customClick={(value:any)=>{ console.log(value["id"]) }} selectedItem={(value:any)=> changeService(value["id"])(dispatch) } list={listOfServices} />
        </div>
      </div>
      <div className='w-full relative flex flex-col justify-start items-start gap-2'>
        <div className=''>
          <p className='font-medium text-slate-900 text-base'>Para cuando</p>
          <p className='font-light text-slate-500 text-sm'>Selecciona la fecha indicada para ti y conoce la disponibilidad</p>
        </div>
        {loadedWindows && <div className="w-full flex justify-between items-center">
          <input 
            type="date" 
            value={date}
            onChange={(e)=>{ setDate(e.target.value) }} 
            min={moment().format("YYYY-MM-DD")} 
            className={twMerge([
              "w-1/2 relative block",
              "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
              "focus:outline-none focus:border-slate-400",
              "placeholder-slate-800"
            ])}
          />
          <div className="w-1/2 flex justify-end items-center gap-2">
            {moment().format("YYYY-MM-DD") !== date && 
              <span onClick={()=>{ setDate(moment(date, "YYYY-MM-DD").subtract(1, "day").format("YYYY-MM-DD")) }} className="cursor-pointer transition w-[2.5rem] h-[2.5rem] rounded-full flex flex-col justify-center items-center text-3xl bg-secondary/0 text-secondary hover:bg-secondary/20">
                <FiChevronLeft/>
              </span>
            }
            <span onClick={()=>{ setDate(moment(date, "YYYY-MM-DD").add(1, "day").format("YYYY-MM-DD")) }} className="cursor-pointer transition w-[2.5rem] h-[2.5rem] rounded-full flex flex-col justify-center items-center text-3xl bg-secondary/0 text-secondary hover:bg-secondary/20">
              <FiChevronRight/>
            </span>
          </div>
        </div>}
      </div>
      {loadingWindows && 
        <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
          <p className="text-base text-slate-900 font-medium">Cargando...</p>
          <p className='text-sm text-slate-500 font-light'>Cargando la disponibilidad del servicio</p>
        </div>
      }
      {(!loadedWindows && !loadingWindows) && 
        <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
          <p className="text-base text-slate-900 font-medium">Nada por aquí</p>
          <p className='text-sm text-slate-500 font-light'>Seleccina un servicio para conocer la disponibilidad</p>
        </div>
      }
      {(loadedWindows && windows.length === 0) && 
        <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
          <p className="text-base text-slate-900 font-medium">No hay disponibilidad</p>
          <p className='text-sm text-slate-500 font-light'>No hay disponibilidad para esta semana</p>
        </div>
      }
      {(loadedWindows && windows.length > 0) && <AttentionWindowsComponent setHourSelected={setHourSelected} hourSelected={hourSelected} windows={windows as any[]} />}
      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <button 
        disabled={
          service === 0 ||
          hourSelected === ""
        } 
        onClick={()=>{ changeHourSelected(hourSelected)(dispatch); }}
        className="btn btn-primary w-full">Agendar</button>
      </div>

    </div>
  )
}