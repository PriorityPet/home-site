import React, {useState} from 'react'
import { twMerge } from 'tailwind-merge'
import { FiStar } from 'react-icons/fi'
import { LocationCard } from '../core/Cards/LocationCard'

const Localities = () => {

    const [listOfLocalities, setListOfLocalities] = useState([
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

    return (
        <div className="w-full px-[10%] bg-slate-200/50 pt-7">
            <div className="flex flex-col justify-center items-center mb-5 gap-1">
                <p className='text-3xl font-bold text-primary'>Todo lo que necesitas</p>
                <p className="font-light text-base text-primary w-[50%] text-center">lorem impsum dolor sit amet, latin doklor desko rulen dast en dolor sit amet, latin doklor.</p>
            </div>
            <div className="flex justify-between items-center mb-5">
                <p className='text-2xl font-semibold text-primary'>Centros medicos</p>
                <p className="cursor-pointer font-semibold text-sm text-primary w-fit text-center">Mostrar todos</p>
            </div>
            <div className="flex flex-nowrap sm:flex-wrap justify-between items-center w-full h-fit">
                {listOfLocalities.map((prop, i)=> <LocationCard {...prop}/> )}
            </div>
        </div>
    )
}

export default Localities