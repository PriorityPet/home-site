import React from 'react'
import { DefaultInput } from '../core/Inputs'
import Link from 'next/link'
import Formulary from './formulary/Main'
import LoginProvider from './context/LoginContext'

function Main() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-[10%_35%_5%_35%] bg-slate-100 relative">

        <p className="font-semibold text-4xl text-slate-900 text-center">Iniciar sesion</p>
        <p className="font-light text-base text-slate-700 text-center">Entra a tu cuenta en Medhouse y empieza a explorar todos los beneficios</p>
        <LoginProvider>
            <Formulary/>
        </LoginProvider>
    </div>
  )
}

export default Main