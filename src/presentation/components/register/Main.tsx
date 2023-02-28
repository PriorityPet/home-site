import React from 'react'
import { DefaultInput } from '../core/Inputs'
import Formulary from './formulary/Main'
import RegisterProvider from './context/RegisterContext'

function Main() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center p-[0%_37%] relative">

        <p className="font-semibold text-4xl text-slate-900 text-center">Crea tu cuenta</p>
        <p className="font-light text-base text-slate-700 text-center">Crea tu cuenta en Medhaus para reservar servicios, explorar centros entre otros beneficios</p>
        <RegisterProvider>
            <Formulary/>
        </RegisterProvider>
    </div>
  )
}

export default Main