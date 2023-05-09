import { FiCheck } from "react-icons/fi"
import { twMerge } from "tailwind-merge"

const ServicePill = ({title}:{title:string}) => {
    return(
        <div className='w-fit p-3 rounded-md border border-primary flex justify-start items-center gap-2 bg-white cursor-default'>
            <div className="w-7 h-7 rounded-full bg-primary/30 text-primary flex justify-center items-center text-sm">
                <FiCheck/>
            </div>
            <p className='allies-description text-slate-900'>{title}</p>
        </div>
    )
}


export const Services = ({list}:{list:Array<any>}) => {
    return (
        <div className={twMerge([
            'w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[12%] my-[4rem] text-center',
            'lg:px-[8rem]',
        ])}>
            <div className='w-full flex flex-col justify-center items-cente text-center gap-5'>
                <p className='allies-title'>Servicios particulares en <span className='text-primary'>Interlomas</span></p>
                <p className='allies-description'>Somos el único centro médico del sur de la ciudad de México que reune las mejores especialidades médicas para consulta en un solo lugar</p>
            </div>
            <div className="w-full flex justify-center items-center gap-[1rem] flex-wrap">
                {list.map((elem, i) => <ServicePill title={elem} key={i} /> )}
            </div>
        </div>
    )
}