import React, {useContext, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { SpecialistCard } from '../core/Cards/SpecialistCard'
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist'
import Link from 'next/link'
import { HomeContext, IHomeContext } from './context/HomeContext'

const Specialists = () => {
    const { state, actions, dispatch } = useContext<IHomeContext>(HomeContext);
    const { getSpecialists } = actions

    const { 
        data: specialists, 
        loading: specialistsLoading, 
        successful: specialistsSuccess, 
        error: specialistsError
    } = state.getSpecialists;

    const [loadedList, setLoadedList] = useState(false)

    const loadAPI = () => {
        getSpecialists()(dispatch)
        setLoadedList(true)
    }

    useEffect(() => {
        loadAPI()
    }, [loadedList])

    return (
        <div className="w-full px-[10%] pb-7">
            <div className="flex justify-between items-center mb-5">
                <p className='lg:header-title title'>Especialistas</p>
                <Link href={"/discover/specialists"} className="paragraph">Mostrar todos</Link>
            </div>
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
                    {[...specialists as Array<Specialist>][0] && <SpecialistCard {...[...specialists as Array<Specialist>][0]}/>}
                    {[...specialists as Array<Specialist>][1] && <SpecialistCard {...[...specialists as Array<Specialist>][1]}/>}
                    {[...specialists as Array<Specialist>][2] && <SpecialistCard {...[...specialists as Array<Specialist>][2]}/>}
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

export default Specialists