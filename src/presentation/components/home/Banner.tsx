import Link from 'next/link'
import React from 'react'

const Banner = () => {
    return (
        <div className="w-full h-fit 
        p-[6%_10%]
        ">
            <div className="bg-white relative w-full h-[35vh] lg:h-[45vh] rounded-[1rem] overflow-hidden">
                
                <div className="flex justify-between items-center w-full h-full px-[5%] bg-gradient-to-r from-primary to-[#7D56F5]/50 absolute top-0 left-0">
    
                    <div className="flex flex-col justify-center items-start w-full lg:w-1/2 h-full relative gap-7">
                        <div className="flex flex-col w-full gap-4">
                            <p className='lg:header-title title text-white lg:text-white'>Hay más que ofrecerte</p>
                            <p className='text-white paragraph'>Si eres médico te ofrecemos una plataforma online para el manejo de tus citas, pacientes y mucho más.</p>
                        </div>
                        <div className="flex justify-between items-center w-fit gap-3">
                            <Link href={process.env.NEXT_PUBLIC_WEBSITE_PROVIDERS_URL + "login"} className="w-fit text-center p-[10px_40px] block relative border border-white bg-transparent font-semibold text-[13px] text-white rounded-md cursor-pointer">Empezar</Link>
                        </div>
                    </div>
    
                </div>
        
                <img className="w-full h-full object-cover" src="https://educaloi.qc.ca/wp-content/uploads/10069454_1200x563.jpg" alt="doctor-image" />
            </div>
        </div>
    )
}

export default Banner