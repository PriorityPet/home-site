import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { MdOutlineMedicalServices } from "react-icons/md";

interface Category{
    title: string
    id: number | string
    icon?: string | undefined
}

const Categories = () => {

    const [listOfCategories, setListOfCategories] = useState<Array<Category>>([
        {
            id: 0,
            title: "Categoria 1",
            icon: "https://cdn-icons-png.flaticon.com/512/7031/7031039.png"
        },
        {
            id: 1,
            title: "Categoria 2",
        },
        {
            id: 2,
            title: "Categoria 3",
            icon: "https://cdn-icons-png.flaticon.com/512/7031/7031039.png"
        },
        {
            id: 3,
            title: "Categoria 4",
        },
        {
            id: 4,
            title: "Categoria 5",
            icon: "https://cdn-icons-png.flaticon.com/512/7031/7031039.png"
        },
        {
            id: 5,
            title: "Categoria 6",
        },
    ])

    const CategoryCard = (prop:Category) => {
        let {id, title, icon} = prop
        return(
            <div className={twMerge('cursor-pointer bg-white border border-slate-300 rounded-lg p-[1.25%_0%] h-fit flex flex-col justify-center items-center text-center gap-3', 
            'lg:w-[15%]',
            'md:w-1/2',
            'sm:w-full',
            'xs:w-full',
            )} key={id}>
                {icon !== undefined ? 
                    <img className='w-full h-[50px] object-contain' src={icon}/> 
                : 
                    <MdOutlineMedicalServices color='#3D85EC' size={50}/>
                }
                <p className="text-primary font-semibold text-[15px]">{title}</p>
            </div>
        )
    }

    return (
        <div className="flex flex-wrap justify-between items-center w-full h-fit px-[10%] mb-5">
            {listOfCategories.map((value, i)=> 
                <CategoryCard 
                title={value.title} 
                id={value.id}
                icon={value.icon}
                /> 
            )}
        </div>
    )
}

export default Categories