import { FiCheck } from "react-icons/fi";

export const AppointmentSuccess = ({step, setStep}:{step:number;setStep:React.Dispatch<React.SetStateAction<number>>}) => {
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