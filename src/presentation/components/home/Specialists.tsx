import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { SpecialistCard } from '../core/Cards/SpecialistCard'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'

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

    return (
        <div className="w-full px-[10%] pb-7">
            <div className="flex justify-between items-center mb-5">
                <p className='text-2xl font-semibold text-slate-900'>Especialistas</p>
                <p className="cursor-pointer font-semibold text-sm text-slate-900 w-fit text-center">Mostrar todos</p>
            </div>
            <div className={twMerge([
                "grid gap-4 w-full relative",
                "lg:grid-cols-4",
                "md:grid-cols-4",
                "sm:grid-cols-2",
                "xs:grid-cols-1",
            ])}>
                {listOfSpecialists.map((prop, i)=> <SpecialistCard {...prop}/> )}
            </div>
        </div>
    )
}

export default Specialists