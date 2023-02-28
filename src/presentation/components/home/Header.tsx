import React from 'react'

const Header = () => {
  //p-[7rem_10rem_5rem_10rem]
  return (
    <div className="w-full h-fit bg-white 
    p-[0%_10%_4%_10%]
    ">
      <div className="bg-primary relative w-full h-fit rounded-[2rem] overflow-hidden">
        
        <div className="w-full h-full bg-gradient-to-r from-slate-900 to-slate-900/50 absolute top-0 left-0">
          <div className="flex justify-between items-center w-full h-full relative px-[5%]">

            <div className="flex flex-col justify-center items-start w-1/2 h-full relative gap-10">
              <div className="flex flex-col w-full gap-4">
                <p className='text-white font-bold text-4xl w-full'>Aqui encontraras a tu especialista ideal</p>
                <p className='text-white font-light text-base w-[80%] text-left'>lorem impsum dolor sit amet, latin doklor desko rulen dast en impsum dolor sit amet otri.</p>
              </div>
              <div className="flex justify-between items-center w-fit gap-3">
                <p className="cursor-pointer font-light text-sm text-white">Ya tengo una cuenta en Medhaus</p>
                <div className="w-fit text-center p-[10px_40px] block relative bg-white font-semibold text-[13px] text-primary rounded-md cursor-pointer">No tengo una cuenta</div>
              </div>
            </div>

            <div className="flex justify-end items-center w-1/2 h-full relative p-[5%_0%_5%_0%]">
              <div className="bg-white w-[65%] h-fit gap-8 rounded-lg flex flex-col justify-between items-center p-[1.5rem]">

                <div className="border-b border-slate-300 text-center w-full pb-3 flex flex-col items-center justify-center gap-1">
                  <p className="font-bold text-primary text-lg">Que buscas</p>
                  <p className="cursor-pointer font-light text-sm text-primary w-fit text-center">lorem impsum dolor sit amet, latin doklor.</p>
                </div>

                <div className="w-full flex flex-col gap-5">
                  
                  <div className="w-full flex flex-col items-start justify-between gap-2">
                    <p className="font-medium text-[13px] text-slate-400 w-fit">Especialista</p>
                    <input type="text" className='w-full h-fit border border-slate-300 rounded bg-white p-[0.5rem_1.5rem] text-sm focus:outline-none' placeholder='Dr. Juan Albert Garcia' />
                  </div>
                  <div className="w-full flex flex-col items-start justify-between gap-2">
                    <p className="font-medium text-[13px] text-slate-400 w-fit">Especialista</p>
                    <input type="text" className='w-full h-fit border border-slate-300 rounded bg-white p-[0.5rem_1.5rem] text-sm focus:outline-none' placeholder='Dr. Juan Albert Garcia' />
                  </div>

                </div> 

                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="w-full text-center p-[10px_40px] block relative bg-primary font-semibold text-[13px] text-white rounded-md cursor-pointer">Buscar</div>
                  <p className="cursor-pointer font-light text-sm text-primary w-fit text-center">Necesito mas maneras de filtrar</p>
                </div> 


              </div>
            </div>

          </div>
        </div>

        <img className="w-full h-full object-cover" src="https://educaloi.qc.ca/wp-content/uploads/10069454_1200x563.jpg" alt="doctor-image" />
      </div>
    </div>
  )
}

export default Header