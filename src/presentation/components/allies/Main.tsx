import React from 'react'

const Header = () => {
    return (
        <div className='w-full flex justify-center items-center gap-[4.5rem] h-[90vh] px-[8rem]'>
            <div className='w-1/2 h-full relative flex flex-col justify-center items-start gap-5'>
                <p className="text-secondary font-bold text-[3rem] leading-[50px]">Únete a la red de <span className='text-primary'>profesionales y médicos</span> de MedHaus</p>
                <p className='text-[#798493] font-light text-base'>Contamos con una base de 300 médicos, más de 200 consultorios de alta especialidad, 4 clínicas, laboratorios clínicos, Rayos x y farmacia dentro de nuestras instalaciones.</p>
                <div className='bg-primary text-white w-fit h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer hover:bg-dark-primary transition'>Regístrate</div>
            </div>
            <div className='w-1/2 h-full block relative'>
                <img className='w-full h-full object-cover' src='../img/header-top.png' alt='Plataforma médica para médicos'/>
            </div>
        </div>
    )
}

const Partners = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center gap-[2rem] h-fit px-[8rem] my-[5rem] text-center'>
            <div className='w-full h-full relative flex flex-col justify-center items-start gap-5 px-[17rem]'>
                <p className="text-secondary font-bold text-[3rem] leading-[50px]">Clientes que forman parte de <span className='text-primary'>nuestra comunidad</span></p>
            </div>
            <div className='w-full h-full block relative px-[8rem]'>
                <img className='w-full h-full object-contain' src='../img/partners.png' alt='Plataforma médica para médicos'/>
            </div>
        </div>
    )
}

const BenefitInList = ({title, description, image}:{
    title: string;
    description: string;
    image: string;
}) => {
    return(
        <div className='w-full h-fit relative flex justify-start items-start gap-6'>
            <img className='w-[35px] h-[35px] object-contain block' src={image}/>
            <div className="w-11/12 flex flex-col justify-start items-start gap-2 text-left">
                <p className='font-bold text-base text-secondary'>{title}</p>
                <p className='font-light text-base text-[#798493]'>{description}</p>
            </div>
        </div>
    )
}

const TilesInList = ({title}:{
    title: string;
}) => {
    return(
        <div className='w-full h-fit relative flex justify-start items-center gap-3'>
            <img className='w-[25px] h-[25px] object-contain block' src={"../img/icons/check-white.png"}/>
            <div className="w-11/12 flex flex-col justify-start items-start text-left">
                <p className='font-light text-base text-[#798493]'>{title}</p>
            </div>
        </div>
    )
}

const DoctorsFirst = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[8rem] my-[3rem] text-center'>
            <div className='w-full flex flex-col justify-center items-cente text-center gap-5'>
                <p className='text-secondary font-bold text-[3rem] leading-[50px]'>Conecta con tus pacientes</p>
                <p className='text-[#798493] font-light text-base'>Tus pacientes tendrán una app que será su asistente virtual para acompañarlos en la prevención y autocuidado de su salud y bienestar</p>
            </div>
            <div className="w-full flex justify-between items-center gap-[3rem]">
                <div className='w-1/2 h-full relative flex flex-col justify-start items-start gap-4'>
                    <BenefitInList 
                        title="Educación, prevención y autocuidado" 
                        description="Podrás compartir con tus pacientes: contenidos, recomendaciones y programas de prevención, control, nutrición y bienestar que generarán tareas que deberán realizar tus pacientes." 
                        image="../img/icons/icon-1.png" 
                    />
                    <BenefitInList 
                        title="Control de tratamientos" 
                        description="Tus pacientes tendrán el acompañamiento desde un nuevo tratamiento, cada una de las tomas de medicamentos u órdenes médicas hasta su evolución (recordatorios y sintomatología) y su finalización." 
                        image="../img/icons/icon-2.png" 
                    />
                    <BenefitInList 
                        title="Registros de salud" 
                        description="Tus pacientes tendrán su registro médico (órdenes médicas y resultados, tratamientos y valores y signos vitales) y podrán interactuar contigo para realizar citas, pagos, solicitudes, entre otras." 
                        image="../img/icons/icon-3.png" 
                    />
                    <BenefitInList 
                        title="Comunidad Medhaus" 
                        description="Podrás publicar contenidos en una comunidad muy grande de pacientes y podrás interactuar con el resto de los médicos y proveedores de la comunidad Medhaus." 
                        image="../img/icons/icon-4.png" 
                    />
                </div>
                <div className='w-1/2 h-full block relative'>
                    <img className='w-full h-full object-cover' src='../img/doctors-first.png' alt='Plataforma médica para médicos'/>
                </div>
            </div>
        </div>
    )
}

const DoctorsSecond = () => {
    return (
        <div className='w-full flex flex-col justify-start items-center gap-[0.2rem] h-fit px-[8rem] my-[3rem] text-center'>
            <div className='w-full flex flex-col justify-center items-center text-center px-[25%]'>
                <p className='text-secondary font-bold text-[3rem] leading-[50px]'>Administra tu día a día como médico</p>
            </div>
            <div className="w-full flex justify-between items-center gap-[3rem]">
                <div className='w-1/2 h-full block relative'>
                    <img className='w-full h-full object-cover' src='../img/doctors-second.png' alt='Plataforma médica para médicos'/>
                </div>
                <div className='w-1/2 h-full relative flex flex-col justify-start items-start gap-8 pr-[10%]'>
                    <TilesInList 
                        title="Ficha clínica electrónica"
                    />
                    <TilesInList 
                        title="Administración de servicios y productos" 
                    />
                    <TilesInList 
                        title="Programas de prevención y autocuidado para tus pacientes" 
                    />
                    <TilesInList 
                        title="Control y seguimiento de tratamientos" 
                    />
                    <TilesInList 
                        title="Agendas y atención" 
                    />
                    <TilesInList 
                        title="Administra tus órdenes"
                    />
                    <TilesInList 
                        title="Crea campañas o publicaciones en la comunidad" 
                    />
                    <div className='bg-primary text-white w-fit h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer hover:bg-dark-primary transition'>Regístrate</div>
                </div>
            </div>
        </div>
    )
}

function Main() {
  return (
    <div>
        <Header/>
        <Partners/>
        <DoctorsFirst/>
        <DoctorsSecond/>
    </div>
  )
}

export default Main