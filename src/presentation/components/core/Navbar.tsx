import React from 'react'

const Navbar = () => {

  return (
    <div className='sticky top-0 left-0 z-20 box-border w-full bg-white p-[0.5%_10%] max-h-[10vh] h-[9vh] lg:h-[10vh] border-b flex justify-center items-center'>
      <div className='w-[40%] md:w-[15%] lg:w-[15%] h-full'>
        <img src='/logo.png' className='w-full h-full object-center object-contain'/>
      </div>
    </div>
  )
}

export default Navbar