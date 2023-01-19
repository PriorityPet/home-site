import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'

interface Center{
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

const Centers = () => {

    const [listOfCenters, setListOfCenters] = useState<Array<Center>>([
        {
            id: 0,
            name: "Categoria 1",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 0,
            rating: "4.5"
        },
        {
            id: 1,
            name: "Main Caracas Medical Center.",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 1,
            rating: "4.5"
        },
        {
            id: 2,
            name: "Categoria 1",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 0,
            rating: "4.5"
        },
        {
            id: 3,
            name: "Main Caracas Medical Center.",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 1,
            rating: "4.5"
        },
    ])

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

    const CenterCard = (prop:Center) => {
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
            <div className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-300 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center', 
            'lg:w-1/4',
            'md:w-1/2',
            'sm:w-full',
            'xs:w-full',
            )} key={id}>
                <div className="h-[20vh] w-full overflow-hidden relative">
                    <StatusTag id={status}/>
                    <img src={image} className='w-full h-full object-cover' alt={name}/>
                </div>
                <div className="h-[25vh] w-full px-5 py-4 flex flex-col justify-between">
                    <p className='font-semibold text-lg text-primary w-full text-ellipsis overflow-hidden whitespace-nowrap'>{name}</p>
                    <p className='font-normal text-sm text-slate-500 overflow-hidden max-h-[5vh]'>{direction}</p>
                    <p className='font-normal text-sm text-primary'><b>Telefono:</b> {phone}</p>
                    <div className="flex items-center justify-between w-full border-t pt-2">
                        <p className='flex items-center justify-start text-warning text-base font-normal gap-1'>
                            <FiStar/>
                            {rating}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full px-[10%] bg-slate-200/50 py-7">
            <div className="flex justify-between items-center mb-5">
                <p className='text-2xl font-semibold text-primary'>Centros medicos</p>
                <p className="cursor-pointer font-semibold text-sm text-primary w-fit text-center">Mostrar todos</p>
            </div>
            <div className="flex flex-wrap justify-start items-center w-full h-fit gap-4 mb-5">
                {listOfCenters.map((prop, i)=> <CenterCard {...prop}/> )}
            </div>
        </div>
    )
}

export default Centers