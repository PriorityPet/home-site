import Link from 'next/link'
import React from 'react'

const HeaderMobile = () => {
  //p-[7rem_10rem_5rem_10rem]
  return (
    <div className="w-full h-fit lg:hidden flex flex-col justify-center items-start gap-4
    p-[5%_10%_4%_10%]
    ">

        <div className="flex flex-col justify-center items-start w-full h-full relative gap-10">
          <div className="flex flex-col w-full gap-4 text-center">
            <p className='title'>¿Necesitas encontrar un médico rápidamente?</p>
            <p className='paragraph'>MedHaus conecta a los pacientes con una amplia red de médicos y proveedores de servicios de salud.</p>
          </div>
          <div className="flex flex-col justify-between items-center w-full gap-3">
            <Link href="/login" className="btn btn-outline-primary w-full">Ya tengo una cuenta</Link>
            <Link href="/register" className="btn btn-primary w-full">Quiero registrarme</Link>
          </div>
        </div>

        <div className="bg-white w-full h-fit gap-8 rounded-lg flex flex-col justify-between items-center p-[1.5rem] border shadow-lg">

            <div className="border-b border-slate-300 text-center w-full pb-3 flex flex-col items-center justify-center gap-1">
              <p className="title">Busca y reserva citas</p>
              <p className="paragraph text-center">Encuentra el médico o centro de salud adecuado para ti.</p>
            </div>

            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex flex-col items-start justify-between gap-2">
                <p className="font-medium text-[13px] text-slate-400 w-fit">Especialista, servicio o padecimiento</p>
                <input type="text" className='w-full h-fit border border-slate-300 rounded bg-white p-[0.5rem_1.5rem] text-sm focus:outline-none' placeholder='Dr. Juan Albert Garcia' />
              </div>
            </div> 

            <div className="w-full flex flex-col items-center justify-center gap-2">
              <div className="w-full text-center p-[10px_40px] block relative bg-primary font-semibold text-[13px] text-white rounded-md cursor-pointer">Buscar</div>
              <p className="cursor-pointer font-light text-sm text-slate-900 w-fit text-center">Necesito mas maneras de filtrar</p>
            </div>

        </div>
  
    </div>
  )
}

export default HeaderMobile