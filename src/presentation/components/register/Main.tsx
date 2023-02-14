import React from 'react'
import { DefaultInput } from '../core/Inputs'
import Link from 'next/link'

function Main() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-[10%_35%_5%_35%] bg-slate-100 relative">

        <p className="font-semibold text-4xl text-slate-900 text-center">Crea tu cuenta</p>
        <p className="font-light text-base text-slate-700 text-center">Crea tu cuenta en Medhouse para reservar servicios, explorar centros entre otros beneficios</p>
        <div className="w-full flex flex-col gap-5 justify-between items-center bg-white rounded-lg border p-7">
            
            <div className="w-full flex flex-col gap-2 justify-between items-start relative">
                <p className="font-light text-sm text-slate-900">Nombre completo</p>
                <DefaultInput
                    onChangeCustom={()=>{}}
                    placeholder={"Escribe tu nombre completo"}
                    value={""}
                />
            </div>
            <div className="w-full flex flex-col gap-2 justify-between items-start relative">
                <p className="font-light text-sm text-slate-900">Email</p>
                <DefaultInput
                    onChangeCustom={()=>{}}
                    placeholder={"usuario@mail.com"}
                    value={""}
                />
            </div>
            <div className="w-full flex flex-col gap-2 justify-between items-start relative">
                <p className="font-light text-sm text-slate-900">Contrasenia</p>
                <DefaultInput
                    onChangeCustom={()=>{}}
                    placeholder={"Mayor a 6 caracteres"}
                    value={""}
                />
            </div>
            <div className="btn btn-primary w-full">Crear</div>
            <p className="font-light text-base text-slate-700 text-center">Ya tengo una cuenta, <Link href={"/login"} className="font-semibold text-base text-slate-900">iniciar sesion</Link></p>

        </div>
    </div>
  )
}

export default Main