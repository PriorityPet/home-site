import React, {useContext, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { SpecialistCard } from '../core/Cards/SpecialistCard'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import { ISpecialistsContext, SpecialistsContext } from './context/SpecialistsContext'

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {


    const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
    const { getSpecialists } = actions

    const { 
        data: specialists, 
        loading: specialistsLoading, 
        successful: specialistsSuccess, 
        error: specialistsError
    } = state.getSpecialists;

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
        getSpecialists()(dispatch)
        setLoadedList(true)
    }

    useEffect(() => {
        loadAPI()
    }, [loadedList])

    return (
        <div className="flex flex-col flex-wrap justify-start items-stretch gap-4 w-full lg:w-3/4 h-fit">
            <div className="w-full h-fit flex justify-between items-center pb-2">
                <p className='text-2xl font-semibold text-slate-900'>Especialistas disponibles en Prosit</p>
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
            {specialistsLoading &&
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-bold text-slate-900 text-lg">Un momento...</p>
                    <p className="font-light text-slate-500 text-base">Cargando los especialistas.</p>
                </div>
            }
            {(specialistsSuccess && [...specialists as Array<Specialist>].length > 0) &&
                <div className={twMerge([
                    "grid gap-4 w-full relative",
                    "lg:grid-cols-3",
                    "md:grid-cols-3",
                    "sm:grid-cols-2",
                    "xs:grid-cols-1",
                ])}>
                    {[...specialists as Array<Specialist>].map((prop, _i)=> <SpecialistCard {...prop}/> )}
                </div>
            }
            {(specialistsSuccess && [...specialists as Array<Specialist>].length === 0) &&
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-bold text-slate-900 text-lg">Vaya, no hay especialistas aún</p>
                    <p className="font-light text-slate-500 text-base">Lo sentimos, pero en la plataforma no hay especialistas todavia.</p>
                </div>
            }
        </div>
    )
}

export default List