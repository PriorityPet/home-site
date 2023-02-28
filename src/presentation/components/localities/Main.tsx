import React from 'react'
import SearchCol from './SearchCol'
import List from './List'

function Main() {
  return (
    <div className="w-full h-full flex justify-between items-start gap-5 p-[0%_10%] relative">
      <SearchCol/>
      <List/>
    </div>
  )
}

export default Main