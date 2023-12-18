import { useContext } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../context/SpecialistsContext";

export default function RegisterClient({
  setActivationReservationCard
}:{
  setActivationReservationCard: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);

  const {data: isRegister} = state.registerClient
  const {
    changeStep,
    isRegisterClient,
  } = actions;

  return(
    <div className="w-full lg:w-[55%] mb-4 flex flex-wrap flex-col lg:flex-row lg:flex-nowrap justify-between items-start gap-6 relative">
      <div>
        <p>
          Realiza tu próxima cita o regístrate y crea tu cuenta.
        </p>
      </div>
      <div>
        <div onClick={()=>{ changeStep(1)(dispatch); isRegisterClient(true)(dispatch) }} className='btn btn-primary w-full lg:block hidden'>Registrarme</div>
        <div onClick={()=>{ changeStep(1)(dispatch); isRegisterClient(true)(dispatch); setActivationReservationCard(true) }} className='btn btn-primary w-full block lg:hidden'>Registrarme</div>
      </div>
    </div>
  )
}