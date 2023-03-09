import React, { useEffect, useState, useContext } from 'react'
import { IAgendaContext, AgendaContext } from '../context/AgendaContext';
import { twMerge } from 'tailwind-merge';

function List() {
  
  const { state, actions, dispatch } = useContext<IAgendaContext>(AgendaContext);
  const { getAgenda } = actions;
  const { data, loading, error, successful } = state.getAgenda;
  const [loadedAgenda, setLoadedAgenda] = useState(false)

  const ReservationComponent = (data:any) => {
    return(
      <div className="w-full max-h-[12vh] h-fti rounded-lg border bg-white p-3 flex flex-col justify-between items-start">
        
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-start items-center gap-2">
            <div className='w-3 h-3 rounded-full bg-green-600'></div>
            <p className="text-sm text-slate-700 font-normal">Por confirmar</p>
          </div>

          <p className="text-sm text-slate-700 font-semibold">#1</p>
        </div>


        <p className="text-lg text-slate-900 font-bold">Consulta general</p>
        <p className="text-sm text-slate-700 font-light">Salud</p>

      </div>
    )
  }

  useEffect(() => {
    getAgenda()(dispatch)
    return setLoadedAgenda(true)
  }, [loadedAgenda])

  return (
    <div className={twMerge([
      "grid gap-4 w-full relative",
      "lg:grid-cols-1",
      "md:grid-cols-1",
      "sm:grid-cols-1",
      "xs:grid-cols-1",
    ])}>
      {data?.map((reservation)=> <ReservationComponent data={reservation}/> )}
    </div>
  )
}

export default List