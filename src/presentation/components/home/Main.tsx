import React from 'react'
import Header from './Header'
import Localities from './Localities'
import Specialists from './Specialists'

function Main() {
  return (
    <>
      <Header/>
      <Localities/>
      <div className="bg-slate-200/50 w-full h-14 flex justify-center items-center px-[10%]">
        <div className="w-full h-px relative block bg-slate-300"></div>
      </div>
      <Specialists/>
    </>
  )
}

export default Main