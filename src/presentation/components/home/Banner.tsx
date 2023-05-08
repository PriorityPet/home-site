import Link from 'next/link'
import React from 'react'

const Banner = () => {
    return (
        <div className="w-full h-fit 
        p-[6%_10%]
        ">
            <div className="bg-white relative w-full h-[45vh] rounded-[1rem] overflow-hidden">
                
                <div className="flex justify-between items-center w-full h-full px-[5%] bg-gradient-to-r from-dark-primary to-dark-primary/50 absolute top-0 left-0">
    
                    <div className="flex flex-col justify-center items-start w-1/2 h-full relative gap-7">
                        <div className="flex flex-col w-full gap-4">
                            <p className='text-white font-bold text-4xl w-full'>Hay más que ofrecerte</p>
                            <p className='text-white font-light text-base w-full text-left'>Tenemos servicios cómo la renta de locales y una plataforma para gestionar tu día a día.</p>
                        </div>
                        <div className="flex justify-between items-center w-fit gap-3">
                            <Link href="/" className="w-fit text-center p-[10px_40px] block relative border border-white bg-transparent font-semibold text-[13px] text-white rounded-md cursor-pointer">Saber más</Link>
                        </div>
                    </div>
    
                </div>
        
                <img className="w-full h-full object-cover" src="https://educaloi.qc.ca/wp-content/uploads/10069454_1200x563.jpg" alt="doctor-image" />
            </div>
        </div>
    )
}

export default Banner