import React, {useContext, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'
import { LocationCard } from '../core/Cards/LocationCard'
import { ILocalitiesContext, LocalitiesContext } from './context/LocalitiesContext'
import { ILocality } from '@/lib/domain/core/entities/localityEntity'

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {

    const { state, actions, dispatch } = useContext<ILocalitiesContext>(LocalitiesContext);
    const { getMedicalCenters } = actions

    const { 
        data: medicalCenters, 
        loading: medicalCentersLoading, 
        successful: medicalCentersSuccess, 
        error: medicalCentersError
    } = state.getMedicalCenters;

    const [loadedMedicalCenters, setLoadedMedicalCenters] = useState(false)

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
        getMedicalCenters()(dispatch)
        setLoadedMedicalCenters(true)
    }

    useEffect(() => {
        loadAPI()
    }, [loadedMedicalCenters])

    return (
        <div className="flex flex-wrap justify-start items-stretch gap-4 w-full lg:w-3/4 h-fit">
            <div className="w-full h-fit flex justify-between items-center pb-2">
                <p className='text-2xl font-semibold text-slate-900'>Centros disponibles en Prosit</p>
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
                {medicalCentersLoading &&
                    <div className="w-full flex flex-col justify-center items-center">
                        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
                        <p className="font-light text-slate-500 text-base">Cargando los centros médicos.</p>
                    </div>
                }
                {(medicalCentersSuccess && [...medicalCenters as Array<ILocality>].length > 0) &&
                    <div className={twMerge([
                        "grid gap-4 w-full relative",
                        "lg:grid-cols-2",
                        "md:grid-cols-2",
                        "sm:grid-cols-2",
                        "xs:grid-cols-1",
                    ])}>
                        {[...medicalCenters as Array<ILocality>].map((prop, i)=> <LocationCard key={i} data={prop} />)}
                    </div>
                }
                {(medicalCentersSuccess && [...medicalCenters as Array<ILocality>].length === 0) &&
                    <div className="w-full flex flex-col justify-center items-center">
                        <p className="font-bold text-slate-900 text-lg">Vaya, no hay centros aún</p>
                        <p className="font-light text-slate-500 text-base">Lo sentimos, pero en la plataforma no hay centros médicos todavia.</p>
                    </div>
                }
        </div>
    )
}

export default List