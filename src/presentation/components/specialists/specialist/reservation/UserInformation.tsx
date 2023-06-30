import { DefaultInput } from "@/presentation/components/core/Inputs";
import { useContext, useState, useMemo } from "react";
import { FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { VALIDATE_EMAIL, VALIDATE_STRING } from "@/lib/utils/errors-validation";

export const UserConfirmation = () => {
  
  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  const {
    createUser,
    changeUserId,
    changeStep
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

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidFirstname, setInvalidFirstname] = useState(false)
  const [invalidSecondname, setInvalidSecondname] = useState(false)

  function usetSetterAfterCreation(){
    changeUserId(data)(dispatch)
    changeStep(2)(dispatch)
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
            <div className="flex flex-col justify-start items-start">
              <DefaultInput
                type='text'
                onChangeCustom={(e: any)=>{
                  if(VALIDATE_STRING(e) && e !== ""){
                    setInvalidFirstname(true)
                  }else{
                    setInvalidFirstname(false)
                    setUserData({...userData, nombres: e})
                  }
                }}
                placeholder={"Nombre"}
                value={userData.nombres}
              />
              {invalidFirstname && <p className="text-xs text-red-700 font-medium">El nombre no puede contener números</p>}
            </div>
            <div className="flex flex-col justify-start items-start">
              <DefaultInput
                type='text'
                onChangeCustom={(e: any)=>{
                  if(VALIDATE_STRING(e) && e !== ""){
                    setInvalidSecondname(true)
                  }else{
                    setInvalidSecondname(false)
                    setUserData({...userData, primerApellido: e})
                  }
                }}
                placeholder={"Apellido"}
                value={userData.primerApellido}
              />
              {invalidSecondname && <p className="text-xs text-red-700 font-medium">El apellido no puede contener números</p>}
            </div>
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
            onChangeCustom={(e: any)=>{
              if(!VALIDATE_EMAIL(e) && e !== ""){
                setInvalidEmail(true)
              }else{ 
                setInvalidEmail(false)
                setUserData({...userData, email: e})
              }
            }}
            placeholder={"..."}
            value={userData.email}
          />
          {invalidEmail && <p className="text-xs text-red-700 font-medium">El email no es correcto</p>}
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
          <input 
            type="date" 
            value={userData.fechaNacimiento}
            onChange={(e)=>{ setUserData({...userData, fechaNacimiento: e.target.value}) }} 
            max={moment().format("YYYY-MM-DD")} 
            className={twMerge([
              "w-full relative block",
              "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
              "focus:outline-none focus:border-slate-400",
              "placeholder-slate-800"
            ])}
          />
        </div>
      </div>
      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <button 
        disabled={
          loading ||
          invalidEmail ||
          invalidFirstname ||
          invalidSecondname ||
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