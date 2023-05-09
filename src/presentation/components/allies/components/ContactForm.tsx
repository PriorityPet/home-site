import { twMerge } from "tailwind-merge"

export const ContactForm = () => {
    return(
        <div className='w-full h-fit bg-white border border-slate-200 shadow-lg p-6 flex flex-col justify-start items-center gap-[2.5rem] rounded-lg'>
            <div className="w-full flex flex-col justify-center items-start gap-1">
                <p className='allies-subtitle'>Contáctanos</p>
                <p className='allies-description'>Envíanos un mensaje para que trabajemos juntos</p>
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-4">
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='allies-label'>Tu nombre</p>
                    <input 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    type='text' placeholder='Escribe tu nombre completo...' />
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='allies-label'>Correo electrónico</p>
                    <input 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    type='email' placeholder='contacto@mail.com' />
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='allies-label'>Mensaje</p>
                    <textarea 
                    className={twMerge([
                        "min-w-[4rem] w-full max-w-full",
                        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                        "focus:outline-none focus:border-slate-400",
                        "placeholder-slate-400"
                    ])}
                    placeholder='Hablanos de lo que necesites...'></textarea>
                </div>
            </div>
            <div className='bg-primary text-white w-full h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer text-center hover:bg-dark-primary transition'>Enviar</div>
        </div>
    )
}