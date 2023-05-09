import { twMerge } from "tailwind-merge";

export const Contact = () => {
    return (
        <div className={twMerge([
            'w-full flex flex-col justify-center items-center gap-[3rem] h-fit px-[2rem] my-[7rem] text-center',
            'lg:px-[8rem]',
            'md:px-[8rem]'
        ])}>
            <p className='allies-title'>¿Quieres tener más información?</p>
            <div onClick={()=>{
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }} className='bg-primary text-white w-full lg:w-fit md:w-fit h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer hover:bg-dark-primary transition'>Envíanos un mensaje</div>
        </div>
    )
}