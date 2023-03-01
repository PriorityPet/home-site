import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'

interface Status{
    id: number | string
}

interface Specialist{
    id: number | string
    name: string
    direction: string
    phone: string
    image: string | undefined
    status: number | string
    rating: string | undefined
}

function Main() {

    const [activeTab, setActiveTab] = useState(0)
    let listOfTabs = [
        {
            id: 0,
            label: "Especialistas"
        },
        {
            id: 1,
            label: "Servicios"
        },
    ]

    const center = {
        id: 7,
        name: "Caracas Medical Center.",
        direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
        phone: "0212-7636696",
        image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
        status: 1,
        rating: "4.5"
    }

    const [listOfSpecialists, setListOfSpecialists] = useState<Array<Specialist>>([
        {
            id: 0,
            name: "Dr. Juan Alberto Garcia",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://image.sciencenorway.no/1852530.webp?imageId=1852530&x=0&y=0&cropw=100&croph=100&width=482&height=322",
            status: 0,
            rating: "4.5"
        },
        {
            id: 1,
            name: "Dra. Maria Perez Alvarez",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://t4.ftcdn.net/jpg/03/17/85/49/360_F_317854905_2idSdvi2ds3yejmk8mhvxYr1OpdVTrSM.jpg",
            status: 1,
            rating: "4.5"
        },
        {
            id: 0,
            name: "Dr. Juan Alberto Garcia",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://image.sciencenorway.no/1852530.webp?imageId=1852530&x=0&y=0&cropw=100&croph=100&width=482&height=322",
            status: 0,
            rating: "4.5"
        },
        {
            id: 1,
            name: "Dra. Maria Perez Alvarez",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://t4.ftcdn.net/jpg/03/17/85/49/360_F_317854905_2idSdvi2ds3yejmk8mhvxYr1OpdVTrSM.jpg",
            status: 1,
            rating: "4.5"
        },
    ])

    const SpecialistCard = (prop:Specialist) => {
        let {
            id, 
            name, 
            direction, 
            phone,
            image, 
            status, 
            rating
        } = prop
        return(
            <div className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center', 
            'lg:w-[31.5%]',
            'md:w-1/2',
            'sm:w-full',
            'xs:w-full',
            )} key={id}>
                <div className="h-full w-full px-5 py-4 flex flex-col justify-between items-center">
                    <img src={image} className='w-[100px] h-[100px] rounded-full  overflow-hidden object-cover mx-auto' alt={name}/>
                    <div className="w-full h-fit flex flex-col items-start justify-between gap-1">
                        <p className='font-semibold text-lg text-slate-900 w-full text-ellipsis overflow-hidden whitespace-nowrap text-center'>{name}</p>
                        <p className='font-normal text-xs text-slate-500 overflow-hidden max-h-[40vh]'>{direction}</p>
                        <p className='font-normal text-sm text-slate-900'>{phone}</p>
                    </div>
                    <div className="flex items-center justify-between w-full border-t pt-2">
                        <div className={twMerge('w-fit h-fit p-[0.15rem_1rem] rounded font-medium text-[12px] text-white',
                            status.toString() === "0" && "bg-success",
                            status.toString() === "1" && "bg-warning",
                        )}>
                            {status.toString() === "0" && "Disponible"}
                            {status.toString() === "1" && "Ocupado"}
                        </div>
                        <p className='flex items-center justify-start text-warning text-base font-normal gap-1'>
                            <FiStar/>
                            {rating}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    
    const StatusTag = (status:Status) => {
        let {id} = status
        return(
            <div className={twMerge('w-fit h-fit p-[0.15rem_1rem] rounded font-medium text-sm text-white relative',
                id.toString() === "0" && "bg-success",
                id.toString() === "1" && "bg-warning",
            )}>
                {id.toString() === "0" && "Abierto"}
                {id.toString() === "1" && "Cerrado"}
            </div>
        )
    }

    const Header = () => {
        return(
            <div className="w-full h-[50vh] bg-primary rounded-xl overflow-hidden relative">
                <div className='w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-t from-slate-900 to-slate-900/20'>
                    <div className="w-full flex justify-between items-end h-full p-[2.5%]">
                        <div className="w-1/2 h-fit flex flex-col justify-end items-start gap-3">
                            <p className="text-white font-semibold text-4xl">{center["name"]}</p>
                        </div>
                        <div className="w-1/2 h-fit flex flex-col justify-end items-end text-right gap-3">
                        </div>
                    </div>
                </div>
                <img className="w-full h-full object-cover" src={center["image"]}/>
            </div>
        )
    }

    const Specialists = () => {
        return(
            <div className="flex flex-wrap justify-start items-start w-full h-fit gap-5 mb-5">
                {listOfSpecialists.map((prop, i)=> <SpecialistCard {...prop}/> )}
            </div>
        )
    }

    const Services = () => {
        return(
            <div></div>
        )
    }

    return (
        <div className="w-full h-fit px-[10%] py-[7%] bg-slate-100">
            <Header/>
            <div className="w-full flex justify-between items-start gap-5 mt-[2.5%]">
                <div className="w-1/4 flex flex-col justify-start items-start gap-4 h-fit p-[1%]">
                    <div className="w-full border-b border-b-slate-300 pb-[2.5%]">
                        <p className="font-bold text-slate-900">Adicional</p>
                    </div>
                    <p className="text-slate-900 font-light text-base">{center["direction"]}</p>
                    <p className="text-slate-900 font-semibold text-base">{center["phone"]}</p>
                    <div className="w-full flex justify-between items-center">
                        <StatusTag id={center["status"]}/>
                        <p className='flex items-center justify-center text-warning text-base font-normal gap-1'>
                            <FiStar/>
                            {center["rating"]}
                        </p>
                    </div>
                </div>
                <div className="w-3/4">
                    <div className="w-full border-b border-b-slate-300 flex justify-start items-start mb-[2.5%]">
                        {listOfTabs.map((tab)=>
                            <p 
                            className={twMerge([
                                "w-fit p-[1%_2.5%] cursor-pointer",
                                "border-b-4 border-b-transparent bg-transparent font-normal text-slate-900",
                                activeTab === tab["id"] && "border-b-primary font-bold"
                            ])}
                            onClick={()=>{ setActiveTab(tab["id"]) }}>{tab["label"]}</p>
                        )}
                    </div>
                    {activeTab === 0 && <Specialists/> }
                    {activeTab === 1 && <Services/> }
                </div>
            </div>
        </div>
    )
}

export default Main