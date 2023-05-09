import { useState } from "react";
import { twMerge } from "tailwind-merge";

const InstallationComponent = ({src, active, customClick}:{
    src:string;
    active:boolean;
    customClick:Function;
}) => {
    return(
        <div onClick={()=>{ customClick() }} className={twMerge([
            "overflow-hidden h-[15vh] rounded-md cursor-pointer border",
            active ? "opacity-100 border-primary" : "opacity-50 border-transparent"
        ])}>
            <img src={src} className='w-full h-full object-cover'/>
        </div>
    )
}

export const Installations = ({list}:{list:Array<any>}) => {

    const [active, setActive] = useState(0)

    return (
        <div className={twMerge([
            'w-full flex flex-col justify-start items-center gap-[4rem] px-[12%] h-fit my-[4rem] text-center',
            'lg:px-[8rem]',
        ])}>
            <div className='w-full flex flex-col justify-center items-center text-center gap-5'>
                <p className='allies-title'>Nuestras instalaciones</p>
                <p className='allies-description'>Contamos con cómodas y amplias instalaciones con áreas comunes, recepción, farmacia, laboratorio médico, cafetería y amenidades para nuestros médicos y usuarios</p>
            </div>
            <div className={twMerge([
                "w-full mx-auto h-[50vh] overflow-hidden rounded-lg",
                "lg:w-[80%]",
            ])}>
                <img src={list[active]} className='w-full h-full object-cover' />
            </div>
            <div className={twMerge([
                "w-full grid grid-cols-4 justify-center items-center gap-[2rem]",
                "lg:w-[50%]",
            ])}>
                {list.map((elem, i) => <InstallationComponent key={i} customClick={()=>{ setActive(i) }} active={active === i} src={elem} />)}
            </div>
        </div>
    )
}