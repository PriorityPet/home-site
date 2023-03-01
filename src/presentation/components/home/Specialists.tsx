import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'

interface Specialist{
    id: number | string
    name: string
    direction: string
    phone: string
    image: string | undefined
    status: number | string
    rating: string | undefined
}

const Specialists = () => {

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
            'lg:w-[24.5%]',
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

    return (
        <div className="w-full px-[10%] bg-slate-200/50 pb-7">
            <div className="flex justify-between items-center mb-5">
                <p className='text-2xl font-semibold text-slate-900'>Especialistas</p>
                <p className="cursor-pointer font-semibold text-sm text-slate-900 w-fit text-center">Mostrar todos</p>
            </div>
            <div className="flex flex-nowrap sm:flex-wrap justify-between items-center w-full h-fit mb-5">
                {listOfSpecialists.map((prop, i)=> <SpecialistCard {...prop}/> )}
            </div>
        </div>
    )
}

export default Specialists