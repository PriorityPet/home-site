import { DefaultInput } from "@/presentation/components/core/Inputs";
import { useContext, useState, useMemo } from "react";
import { FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";

export const UserConfirmation = ({step, setStep}:{step:number;setStep:React.Dispatch<React.SetStateAction<number>>}) => {
  
  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  const {
    createUser,
    changeUserId
  } = actions

  const {
    data,
    loading,
    successful,
    error
  } = state.createUser

  const [userData, setUserData] = useState({
    nombres: "",
    primerApellido: "",
    email: "",
    fechaNacimiento: "",
  })

  function usetSetterAfterCreation(){
    changeUserId(data)(dispatch)
    console.log(data)
    setStep(2)
  }

  useMemo(() =>{
    if(successful) usetSetterAfterCreation()
  }, [successful])

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
              onChangeCustom={(e: any) => setUserData({...userData, nombres: e})}
              placeholder={"Nombre"}
              value={userData.nombres}
            />
            <DefaultInput
              type='text'
              onChangeCustom={(e: any) => setUserData({...userData, primerApellido: e})}
              placeholder={"Apellido"}
              value={userData.primerApellido}
            />
          </div>
        </div>
      </div>
      <div className='w-full flex justify-start items-start gap-5'>
        <div className='w-[10%] relative flex flex-col justify-start items-center'>
          <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
            <FiMessageSquare/>
          </span>
        </div>
        <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
          <div className=''>
            <p className='font-medium text-slate-900 text-base'>Email</p>
            <p className='font-light text-slate-500 text-sm'>Indica tu email en caso de necesitarlo</p>
          </div>
          <DefaultInput
            type='text'
            onChangeCustom={(e: any) => setUserData({...userData, email: e})}
            placeholder={"..."}
            value={userData.email}
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
            <p className='font-medium text-slate-900 text-base'>Fecha de nacimiento</p>
            <p className='font-light text-slate-500 text-sm'>Indica tu fecha de nacimiento para facilitar la información al especialista</p>
          </div>
          <DefaultInput
            type='date'
            onChangeCustom={(e: any) => setUserData({...userData, fechaNacimiento: e})}
            placeholder={"..."}
            value={userData.fechaNacimiento}
          />
        </div>
      </div>
      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <button 
        disabled={
          loading ||
          userData.nombres === "" ||
          userData.primerApellido === "" ||
          userData.email === "" ||
          userData.fechaNacimiento === ""
        } 
        onClick={()=>{ createUser(userData)(dispatch) }}
        className="btn btn-primary w-full">{loading ? "Creando cuenta..." : "Crear cuenta" }</button>
      </div>
    </div>
  )
}