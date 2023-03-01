import React, { useEffect, useState, useContext } from 'react'
import { IMedicalRecordContext, MedicalRecordContext } from '../context/MedicalRecordContext';
import { twMerge } from 'tailwind-merge';

function List() {
  
  const { state, actions, dispatch } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getTreatments } = actions;
  const { data, loading, error, successful } = state.getTreatments;
  const [loadedTreatments, setLoadedTreatments] = useState(false)

  const TreatmentComponent = (data:any) => {
    return(
      <div className="w-full h-[20vh] cursor-pointer bg-white border-b border-slate-200 flex justify-start items-center gap-3 rounded-md p-[2%_0%] overflow-hidden">
          
        <div className="flex flex-col justify-start items-start w-[15%]">
          <p className='font-light text-[0.8rem] text-slate-400'>Estado</p>
          <p className='font-semibold p-[3%_3%] text-center text-[0.7rem] rounded text-green-900 bg-green-400 w-full'>Activo</p>
        </div>
        <div className="flex flex-col justify-start items-start w-[40%]">
          <p className='font-light text-[0.8rem] text-slate-400'>Tratamiento</p>
          <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "Acetaminofen" }</p>
        </div>
        <div className="flex flex-col justify-start items-start w-[30%]">
          <p className='font-light text-[0.8rem] text-slate-400'>Cantidad</p>
          <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "300mg" }</p>
        </div>
        <div className="flex flex-col justify-start items-start w-[15%]">
          <p className='font-light text-[0.8rem] text-slate-400'>Durante</p>
          <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "2 sem." }</p>
        </div>

      </div>
    )
  }

  useEffect(() => {
    getTreatments()(dispatch)
    return setLoadedTreatments(true)
  }, [loadedTreatments])

  return (
    <div className={twMerge([
      "grid gap-4 w-full relative",
      "lg:grid-cols-2",
      "md:grid-cols-2",
      "sm:grid-cols-1",
      "xs:grid-cols-1",
    ])}>
      {data?.map((treatment)=> <TreatmentComponent data={treatment}/> )}
    </div>
  )
}

export default List