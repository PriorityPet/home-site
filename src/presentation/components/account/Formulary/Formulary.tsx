import { useContext, useEffect, useMemo, useState } from "react";
import {AccountContext, IAccountContext } from "../context/AccountContext";
import { AccountFailure, accountFailuresEnum } from "../../../../lib/domain/core/failures/account/accountFailure";
import { DefaultInput } from "../../core/Inputs";
import Link from "next/link";
import {FiAlertCircle} from "react-icons/fi";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IAccountContext>(AccountContext);
  const { updateAccount } = actions;
  const { data, loading, error, successful } = state.updateAccount;

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    identificacion: "",
    fechaNacimiento: "",
    pais: "",
    direccion: "",
    ciudad: "",
  });
  const [errors, setErrors] = useState({
    global: "",
    username: "",
  })

  const onSubmit = () => {

    if (values.nombre === "" ) {
      setErrors({...errors, global: "Todos los campos son requeridos"})
    }else{
      updateAccount({ nombre: values.nombre })(dispatch);
    }

  }

  const handleErrors = () => {
    switch (error?.code) {
      case accountFailuresEnum.errorUpdating:
        setErrors({ ...errors, global: "Ha ocurrido un error al actualizar la cuenta, lo sentimos" })
        break;
      case accountFailuresEnum.cannotUpdate:
        setErrors({ ...errors, global: "No se pudo actualizar la cuenta, intenta otra vez" })
        break;
    
      default:
        break;
    }
  }

  useMemo(() => {
    console.log(successful)
  }, [successful])

  useMemo(() => {
    if (error) handleErrors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className="w-full flex flex-col gap-5 justify-between items-start bg-white rounded-lg border p-7">

      <div className="w-full flex flex-col gap-6 justify-between items-start relative">
        
        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Nombre(s)</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, nombre: e.toString()}) }}
            placeholder={"Escribe tu nombre"}
            value={values.nombre}
          />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Apellido(s)</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, apellido: e.toString()}) }}
            placeholder={"Escribe tu apellido"}
            value={values.apellido}
            />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Identificación</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, identificacion: e.toString()}) }}
            placeholder={"Escribe tu identificación"}
            value={values.identificacion}
            />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Fecha nacimiento</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, fechaNacimiento: e.toString()}) }}
            placeholder={"Escribe tu fecha de nacimiento"}
            value={values.fechaNacimiento}
            />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">País</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, pais: e.toString()}) }}
            placeholder={"Selecciona tu pais"}
            value={values.pais}
            />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Ciudad</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, ciudad: e.toString()}) }}
            placeholder={"Selecciona tu ciudad"}
            value={values.ciudad}
            />
        </div>

        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Dirección</p>
          <DefaultInput
            onChangeCustom={(e)=>{ setValues({...values, direccion: e.toString()}) }}
            placeholder={"Escribe tu dirección"}
            value={values.direccion}
            />
        </div>
    
      </div>
    
      {errors.global !== "" && (
        <div className="text-red-600 text-base flex justify-start items-center gap-2">
          <FiAlertCircle/>
          <p className="text-slate-900 text-[14px]">{errors.global}</p>
        </div>
      )}
      <div onClick={()=>{ !loading && onSubmit() }} className="btn btn-primary w-full">
        {loading ? <p>Cargando...</p> : <p>Actualizar</p>}
      </div>
    </div>
  );
}
