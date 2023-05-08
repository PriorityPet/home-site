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
        <div className="flex flex-col justify-start items-start gap-5 h-fit w-full lg:w-1/4 bg-white rounded-md border border-slate-200 p-[2%_2%]">
            <div className="w-full border-b pb-5 flex justify-between items-center">
                <p className='subtitle'>Busqueda</p>
            </div>
            <DefaultInput
                onChangeCustom={onChange}
                placeholder={"Nombre del médico..."}
                value={""}
            />
            <InputSelect
                list={[]}
                onChangeCustom={()=>{}}
                placeholder={"Especialidad"}
                value={""}
            />
            <InputSelect
                list={[]}
                onChangeCustom={()=>{}}
                placeholder={"Servicio"}
                value={""}
            />
        </div>
    )
}

export default SearchCol