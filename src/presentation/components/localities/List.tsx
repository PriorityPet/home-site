import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar, FiX } from 'react-icons/fi'
import { InputSelect } from '../core/Inputs'
import Link from 'next/link'
import { LocalitiesRoutesEnum } from '@/lib/routes/localitiesRoutes'

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

interface FilterTagProp{
    key: number | string
    label: number | string
}

const List = () => {

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
        {
            id: 4,
            name: "Categoria 1",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 0,
            rating: "4.5"
        },
        {
            id: 5,
            name: "Main Caracas Medical Center.",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 1,
            rating: "4.5"
        },
        {
            id: 6,
            name: "Categoria 1",
            direction: "F4VG+F49, Centro Comercial Galerias, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 0,
            rating: "4.5"
        },
        {
            id: 7,
            name: "Main Caracas Medical Center.",
            direction: "F4VCG+F49, Centro Comercial Galerias Minas, El Recreo, Distrito Capital",
            phone: "0212-7636696",
            image: "https://valleywisehealth.org/wp-content/webpc-passthru.php?src=https://valleywisehealth.org/wp-content/uploads/2020/09/Valleywise-Health-Medical-Center.jpg&nocache=1",
            status: 1,
            rating: "4.5"
        },
    ])

    const FilterTag = (prop:FilterTagProp) => {
        let {label, key} = prop
        return(
            <div key={key} className={twMerge([
                'w-fit h-fit p-[0.5rem_1rem] border border-slate-200 rounded-md font-medium text-sm text-primary bg-white relative',
                "flex justify-between items-center"
            ])}>
                {label}
                <div className='w-[30px] font-sm flex flex-col justify-center items-center text-primary'>
                    <FiX/>
                </div>
            </div>
        )
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
            <Link href={`${LocalitiesRoutesEnum.Location}${id}`} className={twMerge('cursor-pointer overflow-hidden bg-white border border-slate-200 rounded-xl max-h-[45vh] h-[45vh] flex flex-col justify-center items-center', 
            'lg:w-[31.8%]',
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
                    <p className='font-normal text-sm text-slate-500 overflow-hidden max-h-[30%]'>{direction}</p>
                    <p className='font-normal text-sm text-primary'><b>Telefono:</b> {phone}</p>
                    <div className="flex items-center justify-end w-full border-t pt-2">
                        <p className='flex items-center justify-start text-warning text-base font-normal gap-1'>
                            <FiStar/>
                            {rating}
                        </p>
                    </div>
                </div>
            </Link>
        )
    }

    let listOfSelect = [
        "Populares",
        "Nuevos",
        "Todos",
    ]

    let listOfFilterTags = [
        {label: "Populares", key: 1},
        {label: "Abiertos", key: 2},
        {label: "Odontología", key: 3},
    ]

    return (
        <div className="flex flex-wrap justify-start items-stretch gap-4 w-3/4 h-fit">
            <div className="w-full h-fit flex justify-between items-center pb-2">
                <p className='text-2xl font-semibold text-primary'>Centros disponibles en Medhouse</p>
                <div className="w-[20%]">
                    <InputSelect
                        list={listOfSelect}
                        onChangeCustom={()=>{}}
                        placeholder={listOfSelect[0]}
                        value={listOfSelect[0]}
                    />
                </div>
            </div>
            <div className="w-full h-fit flex flex-wrap justify-start gap-2 items-center pb-2">
                {listOfFilterTags.map((prop, i)=> <FilterTag {...prop}/> )}
                <p className="font-medium text-sm text-primary underline ml-5">Limpiar</p>
            </div>
            {listOfCenters.map((prop, i)=> <CenterCard {...prop}/> )}
        </div>
    )
}

export default List