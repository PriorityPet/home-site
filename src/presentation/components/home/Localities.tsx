import React, {useContext, useEffect, useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { LocationCard } from '../core/Cards/LocationCard'
import { HomeContext, IHomeContext } from './context/HomeContext'
import { ILocality } from '@/lib/domain/core/entities/localityEntity'

const Localities = () => {

    const { state, actions, dispatch } = useContext<IHomeContext>(HomeContext);
    const { getMedicalCenters } = actions

    const { 
        data: medicalCenters, 
        loading: medicalCentersLoading, 
        successful: medicalCentersSuccess, 
        error: medicalCentersError
    } = state.getMedicalCenters;

    const [loadedMedicalCenters, setLoadedMedicalCenters] = useState(false)

    const loadAPI = () => {
        getMedicalCenters()(dispatch)
        setLoadedMedicalCenters(true)
    }

    useEffect(() => {
        loadAPI()
    }, [loadedMedicalCenters])

    return (
        <div className="w-full px-[10%] pt-7">
            <div className="flex flex-col justify-center items-center mb-5 gap-1">
                <p className='text-3xl font-bold text-slate-900'>Cerca de ti</p>
                <p className="font-light text-base text-slate-900 text-center">Encuentra el centro de salud adecuado para ti y tu familia</p>
            </div>
            <div className="flex justify-between items-center mb-5">
                <p className='text-2xl font-semibold text-slate-900'>Centros medicos</p>
                <p className="cursor-pointer font-semibold text-sm text-slate-900 w-fit text-center">Mostrar todos</p>
            </div>
            <div className={twMerge([
                "grid gap-4 w-full relative",
                "lg:grid-cols-3",
                "md:grid-cols-3",
                "sm:grid-cols-2",
                "xs:grid-cols-1",
            ])}>
                {medicalCentersLoading &&
                    <div className="w-full flex flex-col justify-center items-center">
                        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
                        <p className="font-light text-slate-500 text-base">Cargando los centros médicos.</p>
                    </div>
                }
                {(medicalCentersSuccess && [...medicalCenters as Array<ILocality>].length > 0) &&
                    [...medicalCenters as Array<ILocality>].map((prop, i)=> <LocationCard key={i} data={prop} />)
                }
                {(medicalCentersSuccess && [...medicalCenters as Array<ILocality>].length === 0) &&
                    <div className="w-full flex flex-col justify-center items-center">
                        <p className="font-bold text-slate-900 text-lg">Vaya, no hay centros aún</p>
                        <p className="font-light text-slate-500 text-base">Lo sentimos, pero en la plataforma no hay centros médicos todavia.</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Localities