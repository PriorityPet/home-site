import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { SpecialistCard } from '../core/Cards/SpecialistCard'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {

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

    const FilterTag = (prop:FilterTagProp) => {
        let {label, key} = prop
        return(
            <div key={key} className={twMerge([
                'w-fit h-fit p-[0.5rem_1rem] border border-slate-200 rounded-md font-medium text-sm text-slate-900 bg-white relative',
                "flex justify-between items-center"
            ])}>
                {label}
                <div className='w-[30px] font-sm flex flex-col justify-center items-center text-slate-900'>
                    <FiX/>
                </div>
            </div>
        )
    }

    let listOfSelect = [
        "Populares",
        "Nuevos",
        "Todos",
    ]

    let listOfFilterTags: any[] = []

    return (
        <div className="flex flex-col flex-wrap justify-start items-stretch gap-4 w-3/4 h-fit">
            <div className="w-full h-fit flex justify-between items-center pb-2">
                <p className='text-2xl font-semibold text-slate-900'>Servicios disponibles en Medhaus</p>
                <div className="w-[20%]">
                    <InputSelect
                        list={listOfSelect}
                        onChangeCustom={()=>{}}
                        placeholder={listOfSelect[0]}
                        value={listOfSelect[0]}
                    />
                </div>
            </div>
            {listOfFilterTags.length > 0 && <div className="w-full h-fit flex flex-wrap justify-start gap-2 items-center pb-2">
                {listOfFilterTags.map((prop, i)=> <FilterTag {...prop}/> )}
                <p className="font-medium text-sm text-slate-900 underline ml-5">Limpiar</p>
            </div>}
            <div className={twMerge([
                "grid gap-4 w-full relative",
                "lg:grid-cols-3",
                "md:grid-cols-3",
                "sm:grid-cols-2",
                "xs:grid-cols-1",
            ])}>
                {listOfSpecialists.map((prop, i)=> <SpecialistCard {...prop}/> )}
            </div>
        </div>
    )
}

export default List