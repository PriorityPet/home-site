import { useContext, useEffect, useMemo, useState } from "react";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { AuthFailure, authFailuresEnum } from "../../../../lib/domain/core/failures/auth/authFailure";
import { DefaultInput } from "../../core/Inputs";
import Link from "next/link";
import {FiAlertCircle} from "react-icons/fi";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IRegisterContext>(RegisterContext);
  const { signUpUser } = actions;
  const { data, loading, error, successful } = state.signUpUser;

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    global: "",
    username: "",
    email: "",
    password: "",
  })

  const handleEmail = (value: string) => {
    setErrors({ ...errors, global: "" });

    if (value.length <= 2) {
      setErrors({ ...errors, email: "El correo debe contener más de 2 carácteres" })
    } else {
      setErrors({ ...errors, email: "" })
    }
    
    setValues({ ...values, email: value });
  }

  const handlePassword = (value: string) => {
    setErrors({ ...errors, global: "" });

    if (value.length <= 2) {
      setErrors({ ...errors, password: "La contraseña debe contener más de 2 carácteres" })
    } else {
      setErrors({ ...errors, password: "" })
    }
    
    setValues({ ...values, password: value });
  }

  const onSubmit = () => {

    handleEmail(values.email);
    handlePassword(values.password);

    if (values.password === "" || values.email === "" || values.username === "") {
      setErrors({...errors, global: "Todos los campos son requeridos"})
    }else{
      signUpUser({ email: values.email, password: values.password, username: values.username })(dispatch);
    }

  }

  const handleErrors = () => {
    switch (error?.code) {
      case authFailuresEnum.userNotFound:
        setErrors({ ...errors, global: "Cuenta no existente" })
        break;
      case authFailuresEnum.tooManyRequest:
        setErrors({ ...errors, global: "Se ha excedido el limite de intentos de registro" })
        break;
      case authFailuresEnum.serverError:
        setErrors({ ...errors, global: "Algo no ha salido como se esperaba. Vuelve a intentarlo." })
        break;
      case authFailuresEnum.alreadyExists:
        setErrors({ ...errors, global: "Estas credenciales ya fuerson usadas por otra cuenta" })
        break;
    
      default:
        break;
    }
  }

  useMemo(() => {
    console.log(successful)
    if (successful) setTimeout(()=>{
      window.location.href = "/";
    }, 1000)
  }, [successful])

  useMemo(() => {
    if (error) handleErrors();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className="w-full flex flex-col gap-5 justify-between items-start bg-white rounded-lg border p-7">
      <div className="w-full flex flex-col gap-2 justify-between items-start relative">
        <p className="font-light text-sm text-slate-900">Nombre completo</p>
        <DefaultInput
          onChangeCustom={(e)=>{ setValues({...values, username: e.toString()}) }}
          placeholder={"Escribe tu nombre completo"}
          value={values.username}
        />
      </div>
      <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Email</p>
          <DefaultInput
            onChangeCustom={(e)=>{ handleEmail(e.toString()) }}
            placeholder={"usuario@mail.com"}
            value={values.email}
          />
      </div>
      <div className="w-full flex flex-col gap-2 justify-between items-start relative">
          <p className="font-light text-sm text-slate-900">Contraseña</p>
          <DefaultInput
            onChangeCustom={(e)=>{ handlePassword(e.toString()) }}
            placeholder={"Mayor a 6 caracteres"}
            value={values.password}
          />
      </div>
      {errors.global !== "" && (
        <div className="text-red-600 text-base flex justify-start items-center gap-2">
          <FiAlertCircle/>
          <p className="text-slate-900 text-[14px]">{errors.global}</p>
        </div>
      )}
      {errors.email.length > 0 && (
        <div className="text-red-600 text-base flex justify-start items-center gap-2">
          <FiAlertCircle/>
          <p className="text-slate-900 text-[14px]">{errors.email}</p>
        </div>
      )}
      {errors.password.length > 0 && (
        <div className="text-red-600 text-base flex justify-start items-center gap-2">
          <FiAlertCircle/>
          <p className="text-slate-900 text-[14px]">{errors.password}</p>
        </div>
      )}
      <div onClick={()=>{ !loading && onSubmit() }} className="btn btn-primary w-full text-white">
        {loading ? <p>Cargando...</p> : <p>Crear</p>}
      </div>
      <p className="font-light text-base text-slate-700 text-center mx-auto">Ya tengo una cuenta, <Link href={"/login"} className="font-semibold text-base text-slate-900">iniciar sesion</Link></p>
    </div>
  );
}
