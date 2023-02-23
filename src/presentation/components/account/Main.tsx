import React, { ReactElement, ReactNode } from 'react'
import AccountProvider from './context/AccountContext'
import Formulary from './Formulary/Formulary'
import { FiAirplay } from 'react-icons/fi'
import Link from 'next/link'
import { AccountRoutesEnum } from '@/lib/routes/accountRoutes'

interface CardProps {
  title: string, 
  description: string, 
  children: ReactElement | ReactNode
}

function Main() {

  const CardLinkComponent = ({title, description, children}:CardProps) => {
    return(
      <Link href={
        AccountRoutesEnum.AccountOrders
      } className='cursor-pointer w-full h-[28vh] rounded-xl border bg-white p-5 flex flex-col justify-between items-start'>
        <p className='text-secondary text-3xl'>
          {children}
        </p>
        <p className='font-bold text-primary text-xl'>{title}</p>
        <p className='font-light text-slate-700 text-base'>{description}</p>
      </Link>
    )
  }

  return (
    <div className="w-full h-full bg-slate-100 relative py-[5%]">
      <div className="p-[4%_16%]">

        <p className="font-semibold text-4xl text-slate-900 mb-3">Mi cuenta</p>
        <p className="font-light text-base text-slate-700">Actualiza los datos de tu cuenta si lo crees necesario</p>
        <div className="w-full flex justify-between items-start mt-5">
          <div className="w-[60%] relative">
            <AccountProvider>
              <Formulary/>
            </AccountProvider>
          </div>
          <div className="w-[30%] relative flex flex-col justify-center items-start gap-5">
            <CardLinkComponent title="Mis órdenes" description="Ocultamos algunos datos de la cuenta para proteger tu identidad.">
              <FiAirplay/>
            </CardLinkComponent>
            <CardLinkComponent title="Mi expediente" description="No se pueden modificar los datos que Airbnb utiliza para verificar tu identidad. ">
              <FiAirplay/>
            </CardLinkComponent>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Main