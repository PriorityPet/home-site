import { useContext, useState, useMemo } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { usePathname } from "next/navigation";

export const AppointmentConfirmation = ({specialist}:{
  specialist:Specialist
}) => {

  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {
    createAppointment,
    changeStep
  } = actions
  
  const {
    data,
    successful,
    loading,
    error
  } = state.createAppointment
  const { data: paciente } = state.changeUserId
  const { data: id } = state.changeHourSelected

  const { data: appointmentData } = state.changeAppointmentData
  const { data: service, successful: changedServiceId } = state.changeService;
  const { data: locality } = state.changeLocality

  const pathname = usePathname();
  
  const [doctorId, setDoctorId] = useState(0)

  useMemo(()=>{
    if(successful) changeStep(3)(dispatch)
  },[successful])

  useMemo(() => {
    const url = pathname?.split("/")
    if(url){
      let id = url![url!.length - 1]
      setDoctorId(parseInt(id))
    }
  }, [pathname]);

  return(
    <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
      
      <div className='w-full h-fit flex flex-col justify-center items-start gap-4'>
        
        <div className='w-full h-fit flex justify-center items-start gap-2 text-left'>
          <p className='w-1/3 font-light text-slate-500 text-sm'>Servicio</p>
          <p className='w-2/3 font-medium text-slate-900 text-base'>{service?.name}</p>
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
          <p className='w-2/3 font-medium text-slate-900 text-base'>S\{service?.base_price}</p>
        </div>

      </div>

      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <button 
        disabled={loading}
        onClick={()=>{ createAppointment({
          pacienteId: paciente["id"],
          paciente: paciente,
          doctorId: doctorId,
          servicioId: service && service["id"],
          id: id,
          doctor: specialist,
          nombreServicio: service && service["name"],
          direccion: locality?.address.postal_code,
          date: appointmentData["date"],
          hour: appointmentData["hour"],
        })(dispatch) }} className="btn btn-primary w-full">{loading ? "Agendando..." : "Confirmar"}</button>
      </div>

    </div>
  )
}