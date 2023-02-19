import { useContext, useEffect, useMemo, useState } from "react";
import { LoginContext, ILoginContext } from "../context/LoginContext";
import { AuthFailure, authFailuresEnum } from "../../../../lib/domain/core/failures/auth/authFailure";
import { DefaultInput } from "../../core/Inputs";
import Link from "next/link";
import {FiAlertCircle} from "react-icons/fi";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<ILoginContext>(LoginContext);
  const { signInUser } = actions;
  const { data, loading, error, successful } = state.signInUser;

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    global: "",
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

    if (errors.password.length !== 0 || errors.email.length !== 0) {
      return;
    } 

    signInUser({ email: values.email, password: values.password })(dispatch);
  }

  const handleErrors = () => {
    switch (error?.code) {
      case authFailuresEnum.wrongPassword:
        setErrors({ ...errors, global: "Las credenciales son invalidas" })
        break;
      case authFailuresEnum.userNotFound:
        setErrors({ ...errors, global: "Cuenta no existente" })
        break;
      case authFailuresEnum.tooManyRequest:
        setErrors({ ...errors, global: "Se ha excedido el limite de intentos de inicio de sesión" })
        break;
      case authFailuresEnum.serverError:
        setErrors({ ...errors, global: "Algo no ha salido como se esperaba. Vuelve a intentarlo." })
        break;
    
      default:
        break;
    }
  }

  useMemo(() => {
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
            <p className="font-light text-sm text-slate-900">Email</p>
            <DefaultInput
                onChangeCustom={(e: any) => handleEmail(e)}
                placeholder={"usuario@mail.com"}
                value={values.email}
            />
        </div>
        <div className="w-full flex flex-col gap-2 justify-between items-start relative">
            <p className="font-light text-sm text-slate-900">Contraseña</p>
            <DefaultInput
                onChangeCustom={(e: any) => handlePassword(e)}
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
        <div onClick={()=>{ !loading && onSubmit() }} className="btn btn-primary w-full">
            {loading ? <p>Cargando...</p> : <p>Entrar</p>}
        </div>
        <p className="font-light text-base text-slate-700 text-center mx-auto">Aun no tengo una cuenta, <Link href={"/register"} className="font-semibold text-base text-slate-900">Crear cuenta</Link></p>
    </div>
  );
}
