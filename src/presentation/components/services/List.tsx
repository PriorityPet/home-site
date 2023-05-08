import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { ServicesRoutesEnum } from '@/lib/routes/servicesRoutes'
import { ServiceCard } from '../core/Cards/ServiceCard'
import { Service } from '@/lib/domain/core/entities/services/service'

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {

    const [listOfServices, setListOfServices] = useState<Array<Service>>([
        {
            id: 0,
            name: "Servicio 1",
            categorie: "Salud general",
            description: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            image: "https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.jpg?s=612x612&w=0&k=20&c=DWZGM8lBb5Bun7cbxhKT1ruVxRC_itvFzA9jxgoA0N8=",
            status: 0,
            price: "4.5"
        },
        {
            id: 1,
            name: "Servicio 2",
            categorie: "Odontología",
            description: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            image: "https://media.istockphoto.com/id/1301555107/photo/offering-patient-centred-care-that-proves-effective-and-efficient.jpg?s=612x612&w=0&k=20&c=ZQ-XMynZeFaYYLHfEhDpiBnjGd8DODsCb57r2ZmZkjw=",
            status: 1,
            price: "4.5"
        }
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
                {listOfServices.map((prop, _i)=> <ServiceCard {...prop}/> )}
            </div>
        </div>
    )
}

export default List