import React, {useContext, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { ServicesRoutesEnum } from '@/lib/routes/servicesRoutes'
import { ServiceCard } from '../core/Cards/ServiceCard'
import { Service } from '@/lib/domain/core/entities/services/service'
import { IServicesContext, ServicesContext } from './context/ServicesContext'

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {

    const { state, actions, dispatch } = useContext<IServicesContext>(ServicesContext);
    const { getServices } = actions

    const { 
        data: services, 
        loading: servicesLoading, 
        successful: servicesSuccess, 
        error: servicesError
    } = state.getServices;

    const [loadedList, setLoadedList] = useState(false)

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

    const loadAPI = () => {
        getServices()(dispatch)
        setLoadedList(true)
    }

    useEffect(() => {
        loadAPI()
    }, [loadedList])

    return (
        <div className="flex flex-col flex-wrap justify-start items-stretch gap-4 w-full lg:w-3/4 h-fit">
            <div className="w-full h-fit flex justify-between items-center pb-2">
                <p className='text-2xl font-semibold text-slate-900'>Servicios disponibles en Prosit</p>
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
            {servicesLoading &&
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-bold text-slate-900 text-lg">Un momento...</p>
                    <p className="font-light text-slate-500 text-base">Cargando los servicios.</p>
                </div>
            }
            {(servicesSuccess && [...services as Array<Service>].length > 0) &&
                <div className={twMerge([
                    "grid gap-4 w-full relative",
                    "lg:grid-cols-3",
                    "md:grid-cols-3",
                    "sm:grid-cols-2",
                    "xs:grid-cols-1",
                ])}>
                    {[...services as Array<Service>].map((prop, _i)=> <ServiceCard {...prop}/> )}
                </div>
            }
            {(servicesSuccess && [...services as Array<Service>].length === 0) &&
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-bold text-slate-900 text-lg">Vaya, no hay servicios aún</p>
                    <p className="font-light text-slate-500 text-base">Lo sentimos, pero en la plataforma no hay servicios todavia.</p>
                </div>
            }
        </div>
    )
}

export default List