import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'

interface LocationProp{
    id: number | string
    name: string
    direction: string
    phone: string
    image: string | undefined
    status: number | string
    rating: string | undefined
}

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

export const LocationCard = (prop:LocationProp) => {
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
        <div className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center')} key={id}>
            <div className="h-[20vh] w-full overflow-hidden relative">
                <StatusTag id={status}/>
                <img src={image} className='w-full h-full object-cover' alt={name}/>
            </div>
            <div className="h-[25vh] w-full px-5 py-4 flex flex-col justify-between">
                <p className='font-semibold text-lg text-primary w-full text-ellipsis overflow-hidden whitespace-nowrap'>{name}</p>
                <p className='font-normal text-sm text-slate-500 overflow-hidden max-h-[30%]'>{direction}</p>
                <p className='font-normal text-sm text-primary'><b>Telefono:</b> {phone}</p>
                <div className="flex items-center justify-end w-full border-t pt-2">
                    <p className='flex items-center justify-start text-warning text-base font-normal gap-1'>
                        <FiStar/>
                        {rating}
                    </p>
                </div>
            </div>
        </div>
    )
}