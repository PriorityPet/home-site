import React from 'react'
import { DefaultInput } from '../../core/Inputs'

const service = {
  id: 0,
  name: "Servicio 1",
  categorie: "Salud general",
  description: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
  image: "https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.jpg?s=612x612&w=0&k=20&c=DWZGM8lBb5Bun7cbxhKT1ruVxRC_itvFzA9jxgoA0N8=",
  status: 0,
  price: "4.5"
}

function Main() {
  return (
    <div className="w-full h-full relative flex justify-center items-start gap-10 px-[15%]">
    
      <div className="w-[60%] block relative h-fit">
        
        <div className="w-full h-[25vh] rounded-lg overflow-hidden relative">
          <div className="w-full h-full bg-gradient-to-r from-dark-primary to-dark-primary/40 absolute top-0 left-0 flex flex-col justify-center items-start p-8">
            <p className="text-white font-bold text-2xl">{service["name"]}</p>
            <p className="text-white font-light text-base">{service["categorie"]}</p>
          </div>
          <img className='w-full h-full object-cover object-center' src={service["image"]} alt={service["name"]} />
        </div>

        <div className="w-full relative flex justify-start items-start mt-5">
          <p className="w-1/3 text-slate-900 font-semibold text-base">Reserva</p>
          <p className="w-2/3 text-slate-900 font-light text-base">Selecciona el día y hora que mejor te convenga para tu reserva</p>
        </div>

        <div className="w-full relative flex justify-start items-start mt-5 gap-5">
          <div className="w-1/2 flex justify-start items-center">
            <p className='w-1/3 font-light text-sm text-slate-900'>Fecha</p>
            <div className="w-2/3">
              <DefaultInput onChangeCustom={()=>{}} placeholder='20/10/2022'/>
            </div>
          </div>
          <div className="w-1/2 flex justify-start items-center">
            <p className='w-1/3 font-light text-sm text-slate-900'>Hora</p>
            <div className="w-2/3">
              <DefaultInput onChangeCustom={()=>{}} placeholder='20/10/2022'/>
            </div>
          </div>
        </div>

        <div className="w-full relative flex justify-start items-start mt-5 border-t pt-5">
          <p className="w-full text-slate-900 font-light text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
        </div>

        <div className="w-full relative flex justify-start items-start mt-5 border-t pt-5">
          <p className="w-1/3 text-slate-900 font-semibold text-base">Precio</p>
          <p className="w-2/3 text-slate-900 font-light text-base">${service["price"]}</p>
        </div>

        <div className="w-full relative flex justify-start items-start mt-5 border-t pt-5">
          <p className="w-1/3 text-slate-900 font-semibold text-base">Condiciones</p>
          <p className="w-2/3 text-slate-900 font-light text-base">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.</p>
        </div>

      </div>
      <div className="w-[30%] max-h-[50vh] bg-white border rounded-lg p-4">
        <div className="w-full h-[100%] flex flex-col justify-between items-center gap-6">

          <p className="w-full text-slate-900 font-semibold text-base border-b mb-2 pb-2">Tu reserva</p>
          <p className="w-full text-slate-900 font-light text-sm">Recuerda ser puntual con tu asistencia en el dia y hora de tu reserva</p>

          <div className="w-full relative flex justify-between items-center">
            <p className="w-1/5 text-slate-900 font-semibold text-base">Fecha</p>
            <p className="w-fit text-slate-900 font-light text-base">10/10/2022</p>
          </div>
          <div className="w-full relative flex justify-between items-center">
            <p className="w-1/5 text-slate-900 font-semibold text-base">Hora</p>
            <p className="w-fit text-slate-900 font-light text-base">20:00AM</p>
          </div>
          <div className="w-full relative flex justify-between items-center">
            <p className="w-1/5 text-slate-900 font-semibold text-base">Monto</p>
            <p className="w-fit text-slate-900 font-light text-base">${service["price"]}</p>
          </div>

          <div className="btn btn-primary w-full">Continuar</div>
        </div>
      </div>

    </div>
  )
}

export default Main