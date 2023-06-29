import { FiCheck } from "react-icons/fi";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { useContext } from "react"

export const AppointmentSuccess = () => {

  const { actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  const { changeStep } = actions
  
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
        <button onClick={()=>{ console.log(0); changeStep(0)(dispatch) }} className="btn btn-primary w-full">Regresar</button>
      </div>
    </div>
  )
}