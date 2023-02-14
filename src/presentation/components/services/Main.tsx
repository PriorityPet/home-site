import React from 'react'
import SearchCol from './SearchCol'
import List from './List'

function Main() {
  return (
    <div className="w-full h-full flex justify-between items-start gap-5 p-[7.5%_10%] bg-slate-100 relative">
      <SearchCol/>
      <List/>
    </div>
  )
}

export default Main