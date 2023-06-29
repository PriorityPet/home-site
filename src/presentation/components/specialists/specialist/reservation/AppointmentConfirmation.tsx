import { useContext, useMemo } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";

export const AppointmentConfirmation = ({step, setStep, specialist}:{
  step:number;
  setStep:React.Dispatch<React.SetStateAction<number>>;
  specialist:Specialist
}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  
  const {
    data,
    successful,
    loading,
    error
  } = state.createAppointment
  const { data: pacienteId } = state.changeUserId
  const { data: id } = state.changeHourSelected
  const { data: appointmentData } = state.changeAppointmentData

  const {
    createAppointment
  } = actions

  useMemo(()=>{
    if(successful) setStep(3)
  },[successful])

  return(
    <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
      
      <div className='w-full h-fit flex flex-col justify-center items-start gap-4'>
        
        <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
          <p className='w-1/3 font-light text-slate-500 text-sm'>Servicio</p>
          <p className='w-2/3 font-medium text-slate-900 text-base'>{appointmentData.title}</p>
        </div>
        <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
          <p className='w-1/3 font-light text-slate-500 text-sm'>El</p>
          <p className='w-2/3 font-medium text-slate-900 text-base'>{appointmentData.date}</p>
        </div>
        <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
          <p className='w-1/3 font-light text-slate-500 text-sm'>A las</p>
          <p className='w-2/3 font-medium text-slate-900 text-base'>{appointmentData.hour}</p>
        </div>
        <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
          <p className='w-1/3 font-light text-slate-500 text-sm'>Precio de la cita</p>
          <p className='w-2/3 font-medium text-slate-900 text-base'>${appointmentData.price}</p>
        </div>

      </div>

      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <button 
        disabled={loading}
        onClick={()=>{ createAppointment({
          pacienteId: pacienteId,
          doctorId: specialist.userId,
          id: id
        })(dispatch) }} className="btn btn-primary w-full">{loading ? "Agendando..." : "Confirmar"}</button>
      </div>

    </div>
  )
}