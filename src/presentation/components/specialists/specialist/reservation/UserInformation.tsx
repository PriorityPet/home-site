import { DefaultInput } from "@/presentation/components/core/Inputs";
import { useContext, useState, useMemo } from "react";
import { FiCheck, FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";
import { AiOutlinePhone } from "react-icons/ai";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { twMerge } from "tailwind-merge";
import { VALIDATE_EMAIL, VALIDATE_NAMES, VALIDATE_NUMBERS } from "@/lib/utils/errors-validation";
import IntlPhoneNumberInput from "@/presentation/components/core/Intl/IntlPhoneNumberInput/IntlPhoneNumberInput";
import "react-intl-tel-input/dist/main.css";
import { IPet } from "@/lib/domain/core/entities/petEntity";
import { IOwner } from "@/lib/domain/core/entities/ownerEntity";
import { MdOutlinePets } from "react-icons/md";
import Species from "./Species/Species";
import Breeds from "./Breeds/Breeds";
import { ISpecie } from "@/lib/domain/core/entities/specieEntity";
import { IBreed } from "@/lib/domain/core/entities/breedEntity";
import { ownerFailuresEnum } from "@/lib/domain/core/failures/owner/ownerFailure";
import { CountriesIntlEnum } from "@/lib/enums/countries/countriesIntlEnum";

export const UserConfirmation = ({country}:{country:string;}) => {
  
  const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
  const {
    createPet,
    changeUserId,
    changeStep
  } = actions

  const {
    data,
    loading,
    successful,
    error
  } = state.createPet
  const {data: step} = state.changeStep
  const {
    data: specialist,
  } = state.getSpecialist

  const [pet, setPet] = useState({
    name: "",
    specieId: 0,
    breedId: 0,
  })

  const [owner, setOwner] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({
    namePet: "",
    nameOwner: "",
    lastnameOwner: "",
    specie: "",
    breed: "",
    phoneNumber: "",
    email: ""
  })
  const [termsContidions, setTermsContidions] = useState(false);
  const [activePolicy, setActivePolicy] = useState(false);

  function usetSetterAfterCreation(){
    changeUserId({
      id: data.data.subjectId,
      names: `${owner.firstName} ${owner.lastName}`,
      email: owner.email,
    })(dispatch)
    changeStep(2)(dispatch)
  }

  const handlename = (value: string) => {
    setPet({ ...pet, name: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          namePet: "El nombre de la mascota es obligatoria",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          namePet: "El nombre de la mascota solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, namePet: "" });
    setPet({ ...pet, name: value });
    return false;
  };

  const handlenameOwner = (value: string) => {
    setOwner({ ...owner, firstName: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          nameOwner: "Su nombre es obligatoria",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          nameOwner: "Su nombre solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, nameOwner: "" });
    setOwner({ ...owner, firstName: value });
    return false;
  };

  const handleLastNameOwner = (value: string) => {
    setOwner({ ...owner, lastName: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastnameOwner: "Su nombre es obligatoria",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastnameOwner: "Su nombre solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastnameOwner: "" });
    setOwner({ ...owner, lastName: value });
    return false;
  };

  const handleEmail = (value: string) => {
    setOwner({ ...owner, email: value });
    if (owner.email.length > 1) {
      if (!VALIDATE_EMAIL(owner.email)) {
        setErrors({ ...errors, email: "El email debe ser correcto" });
        return true;
      }
    }
    setErrors({ ...errors, email: "" });
    return false;
  };

  const handlephone = (value: string, isValid: boolean) => {
    setOwner({ ...owner, phoneNumber: value });
    if (!VALIDATE_NUMBERS(value) && value.length > 0) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          phoneNumber:"El teléfono del paciente solo lleva números"
        };
      });
      return true;
    }
    if (!isValid && value.length > 0) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          phoneNumber:"El teléfono del paciente no es correcto"
        };
      });
      return true;
    }
    setErrors((previousState: any) => {
      return {
          ...previousState,
          phoneNumber:""
        };
      });
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

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.breed.length > 0) errorsFieldsCount++;
    if (errors.email.length > 0) errorsFieldsCount++;
    if (errors.lastnameOwner.length > 0) errorsFieldsCount++;
    if (errors.namePet.length > 0) errorsFieldsCount++;
    if (errors.nameOwner.length > 0) errorsFieldsCount++;
    if (errors.phoneNumber.length > 0) errorsFieldsCount++;
    if (errors.specie.length > 0) errorsFieldsCount++;
    if(pet.name.length === 0) errorsFieldsCount++;
    if(owner.firstName.length === 0) errorsFieldsCount++;
    if(owner.lastName.length === 0) errorsFieldsCount++;
    if(owner.email.length === 0) errorsFieldsCount++;
    if(owner.phoneNumber.length === 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onSubmit = async () => {
    const ownerData: IOwner = {
      id: 0,
      subjectId: 0,
      firstName: owner.firstName,
      lastName: owner.lastName,
      phoneNumber:owner.phoneNumber,
      email: owner.email,
      birthDate: null,
      gender: 0,
      sex: 0,
      dni: "",
      createdAt: new Date(),
    }
    const petData: IPet = {
      ownerId: 0,
      createdAt: new Date(),
      id: 0,
      chip: "",
      subjectId: 0,
      name: pet.name,
      specieId: pet.specieId,
      specie: {} as ISpecie,
      breedId: pet.breedId,
      breed: {} as IBreed,
      sex: 0,
      file: null,
      owner: ownerData,
      pictureUrl: "",
      birthDate: null,
    };
      createPet({pet: petData, doctorId: null, providerId: parseInt(specialist.accountId)})(dispatch);
  }

  useMemo(() =>{
    if(successful) usetSetterAfterCreation()
  }, [successful])

  return(
    <div className="w-full h-fit flex flex-col justify-start items-start gap-3">

      <div className='w-full flex justify-start items-start gap-5'>
        <div className='w-[10%] relative flex flex-col justify-start items-center'>
          <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
            <FiHeart/>
          </span>
        </div>
        <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
          <div className=''>
            <p className='font-medium text-slate-900 text-base'>Nombre de la Mascota</p>
            <p className='font-light text-slate-500 text-sm'>Indica el nombre de tu mascota</p>
          </div>
          <DefaultInput
            type='text'
            onChangeCustom={(e) => handlename(e.toString())}
            placeholder={"Nombre de la mascota"}
            value={pet.name}
          />
          {errors.namePet && <p className="text-xs text-red-700 font-medium">{errors.namePet}</p>}
        </div>
      </div>

      <div className='w-full flex justify-start items-start gap-5'>
        <div className='w-[10%] relative flex flex-col justify-start items-center'>
          <span className='w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center'>
            <MdOutlinePets/>
          </span>
        </div>
        <div className='w-[90%] relative flex flex-col justify-start items-start gap-2'>
          <div className='mb-1'>
            <p className='font-medium text-slate-900 text-base'>Especie y Raza</p>
            <p className='font-light text-slate-500 text-sm'>Agregalos a continuación</p>
          </div>
          <div className="w-full grid grid-cols-2 justify-start items-center gap-2">
            <div className="flex flex-col justify-start items-start">
              <Species 
                values={pet}
                setValues={setPet}
              />
              {errors.specie && <p className="text-xs text-red-700 font-medium">El nombre no puede contener números</p>}
            </div>
            <div className="flex flex-col justify-start items-start">
              <Breeds
                values={pet}
                setValues={setPet}
              />
              {errors.breed && <p className="text-xs text-red-700 font-medium">El apellido no puede contener números</p>}
            </div>
          </div>
        </div>
      </div>
      
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
                onChangeCustom={(e) => handlenameOwner(e.toString())}
                placeholder={"Nombre"}
                value={owner.firstName}
              />
              {errors.nameOwner && <p className="text-xs text-red-700 font-medium">El nombre no puede contener números</p>}
            </div>
            <div className="flex flex-col justify-start items-start">
              <DefaultInput
                type='text'
                onChangeCustom={(e) => handleLastNameOwner(e.toString())}
                placeholder={"Apellido"}
                value={owner.lastName}
              />
              {errors.lastnameOwner && <p className="text-xs text-red-700 font-medium">El apellido no puede contener números</p>}
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
            type='email'
            onChangeCustom={(e) => handleEmail(e.toString())}
            placeholder={"Correo electrónico"}
            value={owner.email}
          />
          {errors.email && <p className="text-xs text-red-700 font-medium">El email no es correcto</p>}
          {error?.code === ownerFailuresEnum.alreadyExists &&
            <p className="text-xs text-red-700 font-medium">
              Este email ya esta siendo usado por otro usuario.
            </p>
          }
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
            preferredCountries={country === CountriesIntlEnum.PERU ?  ["pe"] : ["mx"]}
            defaultCountry={country === CountriesIntlEnum.PERU ? "pe" : "mx"}
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
          />
          </div>
          {errors.phoneNumber && <p className="text-xs text-red-700 font-medium">{errors.phoneNumber}</p>}
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
          !termsContidions || 
          !activePolicy ||
          validForm() > 0 
        } 
        onClick={()=>{ onSubmit() }}
        className="btn btn-primary w-full text-white">{loading ? "Creando cuenta..." : "Crear cuenta" }</button>
      </div>
    </div>
  )
}