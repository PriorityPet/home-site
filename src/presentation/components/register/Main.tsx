import React from 'react'
import { DefaultInput } from '../core/Inputs'
import Formulary from './formulary/Main'
import RegisterProvider from './context/RegisterContext'

function Main() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-[10%_35%_5%_35%] bg-slate-100 relative">

        <p className="font-semibold text-4xl text-slate-900 text-center">Crea tu cuenta</p>
        <p className="font-light text-base text-slate-700 text-center">Crea tu cuenta en Medhouse para reservar servicios, explorar centros entre otros beneficios</p>
        <RegisterProvider>
            <Formulary/>
        </RegisterProvider>
    </div>
  )
}

export default Main