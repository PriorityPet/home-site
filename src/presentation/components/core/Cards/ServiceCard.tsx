import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { Service } from '@/lib/domain/core/entities/services/service'
import Link from 'next/link'

interface Status{
    id: number | string
}

const StatusTag = (status:Status) => {
    let {id} = status
    return(
        <div className={twMerge('w-fit h-fit p-[0.15rem_1rem] rounded font-medium text-sm text-white absolute top-3 right-3',
            id.toString() === "0" && "bg-success",
            id.toString() === "1" && "bg-warning",
        )}>
            {id.toString() === "0" && "Abierto"}
            {id.toString() === "1" && "Cerrado"}
        </div>
    )
}

export const ServiceCard = (prop:Service) => {
    let {
        id, 
        name, 
        categorie,
        description,
        image, 
        status, 
        price
    } = prop
    return(
        <Link className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center', 
        //'lg:w-1/4',
        //'md:w-1/2',
        //'sm:w-full',
        //'xs:w-full',
        )} 
        href={`/discover/services/${id}`}
        key={id}>
            <div className="h-[20vh] w-full overflow-hidden relative">
                <img src={image} className='w-full h-full object-cover' alt={name}/>
            </div>
            <div className="h-[25vh] w-full px-5 py-4 flex flex-col gap-1 justify-start">
                <p className='font-semibold text-lg text-primary w-full text-ellipsis overflow-hidden whitespace-nowrap'>{name}</p>
                <p className='font-semibold text-sm text-slate-500'>{categorie}</p>
                <div className="w-full h-px bg-slate-200"></div>
                <p className='font-normal text-sm text-slate-500 overflow-hidden max-h-[29%]'>{description}</p>
                <div className="w-fit flex justify-start items-center gap-2">
                    <p className='font-normal text-sm text-slate-500'>Costo:</p>
                    <p className='w-fit font-semibold rounded-md p-[1%_10.5%] text-sm text-green-800 bg-green-300'>${price}</p>
                </div>
                
            </div>
        </Link>
    )
}