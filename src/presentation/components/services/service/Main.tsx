import React from 'react'

const service = {
  id: 0,
  name: "Servicio 1",
  categorie: "Salud general",
  description: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
  image: "https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.jpg?s=612x612&w=0&k=20&c=DWZGM8lBb5Bun7cbxhKT1ruVxRC_itvFzA9jxgoA0N8=",
  status: 0,
  price: "4.5"
}

const Header = () => {
  return(
    <div className='w-full h-[40vh] relative overflow-hidden'>
      <div className="w-full h-full p-[0%_20%] absolute left-0 top-0 bg-primary/80 bg-blend-color flex justify-start items-center gap-8">
        
        <div className="w-[12rem] h-[12rem] rounded-full overflow-hidden border border-white">
          <img src={service["image"]} className='w-full h-full object-cover object-center'/>
        </div>
        <div className="relative flex flex-col justify-center items-start text-left">
          <p className="text-white font-semibold text-3xl">{service["name"]}</p>
          <p className="text-white font-light text-base">{service["categorie"]}</p>

        </div>

      </div>
      <img src={service["image"]} className='w-full h-full object-cover object-center'/>
    </div>
  )
}

function Main() {
  return (
    <div className="w-full h-full bg-slate-100 relative py-[5%]">
      <Header/>
      <div className="p-[7.5%_20%]">

      </div>

    </div>
  )
}

export default Main