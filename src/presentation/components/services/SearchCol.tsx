import React, {useState} from 'react'
import { DefaultInput, InputSelect } from '../core/Inputs'

const SearchCol = () => {

    const [name, setName] = useState<string | number>()
    const onChange = (value: string | number) => {
        setName(value);
    }
    let listOfSelect = [
        "Populares",
        "Nuevos",
        "Todos",
    ]

    return (
        <div className="flex flex-col justify-start items-start gap-5 h-[60vh] w-full lg:w-1/4 bg-white rounded-md border border-slate-200 p-[2%_2%]">
            <div className="w-full border-b pb-5 flex justify-between items-center">
                <p className='text-xl font-semibold text-slate-900'>Busqueda</p>
                <p className='text-sm font-medium text-slate-900 w-fit p-[1.5%_4%] bg-primary/20 rounded-md'>Servicios: 7</p>
            </div>
            <DefaultInput
                onChangeCustom={onChange}
                placeholder={"Nombre del servicio..."}
                value={""}
            />
            <InputSelect
                list={listOfSelect}
                onChangeCustom={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
            <InputSelect
                list={listOfSelect}
                onChangeCustom={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
            <InputSelect
                list={listOfSelect}
                onChangeCustom={()=>{}}
                placeholder={listOfSelect[0]}
                value={listOfSelect[0]}
            />
        </div>
    )
}

export default SearchCol