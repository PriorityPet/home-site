import React from 'react'
import OrdersProvider from './context/OrdersContext'
import List from './List/List'
import Link from 'next/link'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

function Main() {
  return (
    <div className="w-full h-full bg-slate-100 relative py-[5%]">
      <div className="p-[4%_16%]">

        <div className='w-fit flex justify-between items-center gap-3 font-light text-base text-slate-900 mb-3'>
          <Link href={"/account"} className='hover:underline'>Mi cuenta</Link>
          <MdOutlineArrowForwardIos size={12}/>
          <p className=''>Mis órdenes</p>
        </div>
        <p className="font-semibold text-4xl text-slate-900 mb-3">Mis órdenes</p>
        <p className="font-light text-base text-slate-700">Todas las transacciones y compras que tengas en Medhouse</p>
        <div className="w-full flex justify-between items-start mt-5">
          <div className="w-[60%] relative">
            <OrdersProvider>
              <List/>
            </OrdersProvider>
          </div>
          <div className="w-[30%] relative flex flex-col justify-center items-start gap-5">
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default Main