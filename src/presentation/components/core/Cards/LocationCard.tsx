import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { ILocality } from '@/lib/domain/core/entities/localityEntity'

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

export const LocationCard = ({data}:{data:ILocality}) => {
    return(
        <div className={twMerge([
            'cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[25vh] h-[25vh] flex flex-col justify-center items-center relative'
        ])} key={data?.id}>
            <img src={data?.image_url} className='w-full h-full object-cover' alt={data?.name}/>
            <div className="h-full w-full p-4 flex flex-col justify-end gap-1 absolute top-0 left-0 bg-gradient-to-t from-slate-900 to-slate-900/20">
                <p className='font-medium text-lg text-white w-full text-ellipsis overflow-hidden whitespace-nowrap'>{data?.name}</p>
                <p className='font-normal text-xs text-slate-300 overflow-hidden max-h-[30%]'>{data?.address}</p>
                <p className='font-normal text-xs text-white'><span className='font-medium'>Telefono:</span> {data?.state.name}</p>
            </div>
        </div>
    )
}