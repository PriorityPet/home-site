import React from 'react'
import SearchCol from './SearchCol'
import Centers from './Centers'

function Main() {
  return (
    <div className="w-full h-full flex justify-between items-start gap-5 p-[7.5%_10%] bg-slate-100 relative">
        <SearchCol/>
        <Centers/>
    </div>
  )
}

export default Main