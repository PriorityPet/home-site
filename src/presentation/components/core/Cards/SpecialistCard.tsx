import { Specialist } from "@/lib/domain/core/entities/specialists/specialist"
import Link from "next/link"
import { FiStar } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
import Specialists from "../../home/Specialists"
import { SpecialistsRoutesEnum } from "@/lib/routes/SpecialistsRoutes"

export const SpecialistCard = (prop:Specialist) => {
    let {
        id, 
        name, 
        direction, 
        phone,
        image, 
        status, 
        rating
    } = prop
    return(
        <Link 
        href={`/discover/specialists/0`}
        className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center')} key={id}>
            <div className="h-full w-full px-5 py-4 flex flex-col justify-between items-center">
                <img src={image} className='w-[100px] h-[100px] rounded-full  overflow-hidden object-cover mx-auto' alt={name}/>
                <div className="w-full h-fit flex flex-col items-start justify-between gap-1">
                    <p className='font-semibold text-lg text-slate-900 w-full text-ellipsis overflow-hidden whitespace-nowrap text-center'>{name}</p>
                    <p className='font-normal text-xs text-slate-500 overflow-hidden max-h-[40vh]'>{direction}</p>
                    <p className='font-normal text-sm text-slate-900'>{phone}</p>
                </div>
                <div className="flex items-center justify-between w-full border-t pt-2">
                    <div className={twMerge('w-fit h-fit p-[0.15rem_1rem] rounded font-medium text-[12px] text-white',
                        status.toString() === "0" && "bg-success",
                        status.toString() === "1" && "bg-warning",
                    )}>
                        {status.toString() === "0" && "Disponible"}
                        {status.toString() === "1" && "Ocupado"}
                    </div>
                    <p className='flex items-center justify-start text-warning text-base font-normal gap-1'>
                        <FiStar/>
                        {rating}
                    </p>
                </div>
            </div>
        </Link>
    )
}