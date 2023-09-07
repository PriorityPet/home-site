import { DefaultInput } from "@/presentation/components/core/Inputs";
import { useContext, useState, useMemo } from "react";
import { FiCheck, FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";
import { AiOutlinePhone } from "react-icons/ai";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { VALIDATE_EMAIL, VALIDATE_NUMBERS, VALIDATE_STRING } from "@/lib/utils/errors-validation";
import IntlPhoneNumberInput from "@/presentation/components/core/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import "react-intl-tel-input/dist/main.css";
import Link from "next/link";

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
  const {data: step} = state.changeStep

  const [userData, setUserData] = useState({
    nombres: "",
    primerApellido: "",
    email: "",
    fechaNacimiento: "",
    telefono: ""
  })

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState("")
  const [invalidFirstname, setInvalidFirstname] = useState(false)
  const [invalidSecondname, setInvalidSecondname] = useState(false)
  const [termsContidions, setTermsContidions] = useState(false);
  const [activePolicy, setActivePolicy] = useState(false);

  function usetSetterAfterCreation(){
    changeUserId(data)(dispatch)
    changeStep(2)(dispatch)
  }

  const handlephone = (value: string, isValid: boolean) => {
    setUserData({ ...userData, telefono: value });
    if (!VALIDATE_NUMBERS(value) && value.length > 0) {
      setInvalidPhoneNumber("El teléfono del paciente solo lleva números");
      return true;
    }
    if (!isValid && value.length > 0) {
      setInvalidPhoneNumber("El teléfono del paciente no es correcto");
      return true;
    }
    setInvalidPhoneNumber("");
    return false;
  };

  const CheckboxComponent = ({
    active,
    customClick,
  }: {
    active: boolean;
    customClick: Function;
  }) => {
    return (
      <div
        onClick={() => {
          customClick();
        }}
        className={twMerge([
          "w-[16px] h-[16px] rounded-md border border-slate-300  cursor-pointer hover:bg-slate-300 transition text-white",
          active ? "bg-secondary" : "bg-white",
        ])}
      >
        {active && <FiCheck />}
      </div>
    );
  };

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
            <AiOutlinePhone/>
          </span>
        </div>
        <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
          <div className=''>
            <p className='font-medium text-slate-900 text-base'>Teléfono</p>
            <p className='font-light text-slate-500 text-sm'>Indica tu teléfono de contacto</p>
          </div>
          <div className="w-full">
          <IntlPhoneNumberInput
            preferredCountries={["mx"]}
            defaultCountry={"mx"}
            containerClassName="intl-tel-input w-full"
            onPhoneNumberChange={(isValid, value, countryData, fullNumber) =>
              handlephone(fullNumber, isValid) 
            }
            inputClassName={twMerge([
              "min-w-[4rem] w-full max-w-full",
              "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
              "focus:outline-none focus:border-slate-400",
              "placeholder-slate-500"
            ])}
            placeholder="33 1234 5678"
          />
          </div>
          {invalidPhoneNumber && <p className="text-xs text-red-700 font-medium">{invalidPhoneNumber}</p>}
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
      <div className="w-full relative flex flex-col justify-start gap-3 items-start">
        <div className="w-full flex justify-start items-center gap-3">
          <div className="w-[10%]" />
          <CheckboxComponent
            active={termsContidions}
            customClick={() => {
              setTermsContidions(!termsContidions);
            }}
          />
          <p className="font-light text-sm text-slate-900">
            Acepto los  terminos y condiciones de la plataforma
          </p>
        </div>
        <div className="w-full flex justify-start items-center gap-3">
          <div className="w-[10%]" />
          <CheckboxComponent
            active={activePolicy}
            customClick={() => {
              setActivePolicy(!activePolicy);
            }}
          />
          <p className="font-light text-sm text-slate-900">
            Acepto la politica de privacidad de la plataforma
          </p>
        </div>
      </div>
      <div className="w-full border-t border-slate-300 pt-6 mt-3">
        <div className="w-full text-center mb-4 cursor-pointer text-gray-500 text-sm" onClick={()=>{ changeStep(0)(dispatch) }}>
          Volver
        </div>
        <button 
        disabled={
          loading ||
          invalidEmail ||
          invalidFirstname ||
          invalidSecondname ||
          userData.nombres === "" ||
          userData.primerApellido === "" ||
          userData.email === "" ||
          userData.fechaNacimiento === "" ||
          userData.telefono === "" ||
          !termsContidions || 
          !activePolicy
        } 
        onClick={()=>{ createUser(userData)(dispatch) }}
        className="btn btn-primary w-full">{loading ? "Creando cuenta..." : "Crear cuenta" }</button>
      </div>
    </div>
  )
}