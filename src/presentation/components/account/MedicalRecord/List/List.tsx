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
      <div className="w-full h-[16vh] rounded-lg border bg-white p-3 flex flex-col justify-between items-start">
        
        <div className="w-full flex justify-between items-start">
          <div className="w-1/2 flex justify-start items-center gap-2">
            <div className='w-3 h-3 rounded-full bg-green-600'></div>
            <p className="text-sm text-slate-700 font-normal">Activo</p>
          </div>
          <div className="flex flex-col justify-start items-start w-1/2">
            <p className='font-light text-[0.8rem] text-slate-400'>Tratamiento</p>
            <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "Acetaminofen" }</p>
          </div>
        </div>


        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col justify-start items-start w-1/2">
            <p className='font-light text-[0.8rem] text-slate-400'>Cantidad</p>
            <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "300mg" }</p>
          </div>
          <div className="flex flex-col justify-start items-start w-1/2">
            <p className='font-light text-[0.8rem] text-slate-400'>Durante</p>
            <p className='font-semibold text-[0.9rem] text-slate-900'>{data["date"] ?? "2 sem." }</p>
          </div>

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