import React, { useEffect, useState, useContext } from 'react'
import { IOrdersContext, OrdersContext } from '../context/OrdersContext';
import { twMerge } from 'tailwind-merge';

function List() {
  
  const { state, actions, dispatch } = useContext<IOrdersContext>(OrdersContext);
  const { getOrders } = actions;
  const { data, loading, error, successful } = state.getOrders;
  const [loadedOrders, setLoadedOrders] = useState(false)

  const OrderComponent = (data:any) => {
    return(
      <div className="w-full h-[20vh] rounded-lg border bg-white p-3 flex flex-col justify-between items-start">
        
        <div className="w-full flex justify-between items-center">
          <div className="w-full flex justify-start items-center gap-2">
            <div className='w-3 h-3 rounded-full bg-green-600'></div>
            <p className="text-sm text-slate-700 font-normal">Por confirmar</p>
          </div>

          <p className="text-sm text-slate-700 font-semibold">#1</p>
        </div>


        <p className="text-lg text-slate-900 font-bold">Consulta general</p>
        <p className="text-sm text-slate-700 font-light">Salud</p>
        
        <div className="w-full flex justify-between items-center">
          
          <div className="w-1/3 flex flex-col justify-start items-start">
            <p className="text-sm text-slate-400 font-light">Costo</p>
            <p className="text-sm text-slate-700 font-normal">5$</p>
          </div>
          <div className="w-1/3 flex flex-col justify-start items-start">
            <p className="text-sm text-slate-400 font-light">Fecha</p>
            <p className="text-sm text-slate-700 font-normal">12/12/2022</p>
          </div>
          <div className="w-1/3 flex flex-col justify-start items-start">
            <p className="text-sm text-slate-400 font-light">Hora</p>
            <p className="text-sm text-slate-700 font-normal">12:00AM</p>
          </div>

        </div>

      </div>
    )
  }

  useEffect(() => {
    getOrders()(dispatch)
    return setLoadedOrders(true)
  }, [loadedOrders])

  return (
    <div className={twMerge([
      "grid gap-4 w-full relative",
      "lg:grid-cols-2",
      "md:grid-cols-2",
      "sm:grid-cols-1",
      "xs:grid-cols-1",
    ])}>
      {data?.map((order)=> <OrderComponent data={order}/> )}
    </div>
  )
}

export default List