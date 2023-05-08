import React from 'react'
import { DefaultInput } from '../../core/Inputs'
import { FiDollarSign, FiHome } from 'react-icons/fi'
import ReservationCard from '../../core/Reservation/ReservationCard'

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

  const HeaderComponent = () => {
    return(
      <div className="w-full h-[25vh] rounded-lg overflow-hidden relative">
        <div className="w-full h-full bg-gradient-to-r from-dark-primary/50 to-dark-primary/15 absolute top-0 left-0 flex flex-col justify-center items-start p-8">
          <p className="text-white font-normal text-2xl">{service["name"]}</p>
          <p className="text-white font-light text-base">{service["categorie"]}</p>
        </div>
        <img className='w-full h-full object-cover object-center' src={service["image"]} alt={service["name"]} />
      </div>
    )
  }

  const HeaderInformationComponent = () => {
    return(
      <div className="w-full h-fit relative flex flex-col gap-4">
      </div>
    )
  }

  const InformationComponent = () => {
    return(
      <div className="w-full lg:w-[58%] relative h-fit flex flex-col justify-start items-start gap-5">
        <p className='title'>Información de este servicio</p>
        <div className="w-full flex justify-start items-start gap-3">
          <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
            <FiHome/>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <p className='subtitle'>Tlalnepantla</p>
            <p className='paragraph'>Av. Tlalnepantla-Tenayuca 25, San Bartolo Tenayuca, 54150 Tlalnepantla de Baz, México</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 h-px block relative"></div>
        <p className='paragraph'>Hacemos la limpieza dental usando ultrasonido, que funciona a base de vibración y agua a presión. Este procedimiento se realiza en tan sólo 1 sesión.</p>
        <div className="w-full flex justify-start items-start gap-3">
          <div className="flex justify-center items-center w-12 h-12 text-lg text-slate-900 text-center rounded-md bg-white border">
            <FiDollarSign/>
          </div>
          <div className="flex flex-col justify-center items-start gap-1">
            <p className='subtitle'>Precio</p>
            <p className='paragraph'>$30.00</p>
          </div>
        </div>
        <div className="w-full bg-slate-300 h-px block relative"></div>
        <p className='paragraph'>
          Ortodoncia: Corrección de la alineación dental y de la mandíbula.<br/>
          Endodoncia: Tratamiento de los conductos radiculares y la pulpa dental.<br/>
          Periodoncia: Me enfoco en el tratamiento y prevención de enfermedades de las encías y estructuras de soporte dental.
          Odontopediatría: Me especializo en el cuidado dental de los niños.<br/>
          Odontología estética: Mejoro la apariencia dental a través de técnicas como blanqueamiento, carillas, entre otros.<br/>
          Cirugía oral y maxilofacial: Trato enfermedades, lesiones y defectos en la boca, la cabeza, el cuello, la cara, la mandíbula y los tejidos duros y blandos de la región maxilofacial.<br/>
          Odontología restaurativa: Restauro la función y la estética dental mediante técnicas como las prótesis dentales.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative flex flex-col justify-center items-start gap-5 px-[7%] lg:px-[13%]">
      <HeaderComponent/>
      <HeaderInformationComponent/>
      <div className="w-full flex flex-wrap flex-col lg:flex-row lg:flex-nowrap justify-between items-start gap-6">
        <InformationComponent/>
        <ReservationCard/>
      </div>
    </div>
  )
}

export default Main