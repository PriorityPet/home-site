import React from 'react'
import { DefaultInput, InputSelect } from '../Inputs'

const SearchCol = () => {

    let listOfSelect = [
        "Populares",
        "Nuevos",
        "Todos",
    ]

    return (
        <div className="flex flex-col justify-start items-start gap-5 h-[60vh] w-1/4 bg-white border border-slate-200 p-[2%_2%]">
            <div className="w-full border-b pb-5 flex justify-between items-center">
                <p className='text-xl font-semibold text-primary'>Busqueda</p>
                <p className='text-sm font-medium text-primary w-fit p-[1.5%_4%] bg-primary/20 rounded-md'>Centros: 7</p>
            </div>
            <DefaultInput
                onChange={()=>{}}
                placeholder={"Nombre del centro..."}
                value={""}
            />
            <InputSelect
                list={listOfSelect}
                onChange={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
            <InputSelect
                list={listOfSelect}
                onChange={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
            <InputSelect
                list={listOfSelect}
                onChange={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
        </div>
    )
}

export default SearchCol