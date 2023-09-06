import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { useContext, useMemo } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { twMerge } from "tailwind-merge";
import { BsCheckLg } from 'react-icons/bs'
import { usePathname } from "next/navigation";

function LocalitiesComponent ({specialist}:{specialist:Specialist}) {

    const { state, actions, dispatch } = useContext<ISpecialistsContext>(SpecialistsContext);
    const { changeLocality, changeService, getSpecialistServices } = actions

    const { 
        data: localities, 
        loading: loadingLocalities, 
        successful: loadedLocalities, 
        error: errorLocalities
      } = state.getSpecialistLocalities;
    const { 
        data: services,
        loading: loadedServices,
    } = state.getSpecialistServices;

    const { data: service, successful: changedServiceId } = state.changeService;
    const { data: locality, successful: changedLocalityId } = state.changeLocality;

    const pathname = usePathname();
    
    useMemo(()=>{
        if(changedLocalityId){
            const url = pathname?.split("/")
            if(url){
                let id = url![url!.length - 1]
                getSpecialistServices(parseInt(id), locality.id)(dispatch)
            }
        }
    },[locality])

    const localityComponent = ({elem}:{elem:any}) => {
        let isActive = locality?.id === elem.id ? true : false;


        const change = () => {
            if(locality?.id === elem.id) {
                changeLocality(null)(dispatch)
            } else {
                changeLocality(elem)(dispatch)
            }
        }

        return (
            <>
                <div onClick={() => change()} className={twMerge([
                    "w-full flex justify-start items-center gap-3 bg-primary bg-opacity-30 rounded-md p-3 cursor-pointer",
                    isActive && "border-l-8 border-secondary transition-all",
                ])}>
                    <div className="w-[8%] h-full relative flex flex-col justify-center items-center">
                        <span className={twMerge([
                            'w-7 h-7 border-[3px] border-secondary text-white text-[12px] rounded-full flex flex-col justify-center items-center',
                            isActive && "bg-secondary transition-all"
                        ])}>
                            {isActive && <BsCheckLg /> }
                        </span>
                    </div>
                    <div className='w-[92%] flex flex-col justify-center items-start gap-2'>
                        <p className='paragraph text-slate-900'><b>{elem["name"]}</b></p>
                        <p className='paragraph'>{elem.postal_code.length > 0 ? elem.postal_code : "Ubicacion no especificada"}</p>
                    </div>
                </div>
                <div className={twMerge([
                    "w-full px-10 h-fit rounded-md shadow-md drop-shadow-xl",
                    !isActive && "hidden"
                ])}>
                {loadedServices ? 
                    <div className='w-full h-fit py-3 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Cargando...</p>
                        <p className='text-slate-500 text-sm font-light'>Obteniendo los servicios de este consultorio</p>    
                    </div>
                : services?.length > 0 ? services.map((p:any)=> 
                    serviceComponent({p})
                ) : 
                    <div className='w-full h-fit py-3 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Nada por aquí</p>
                        <p className='text-slate-500 text-sm font-light'>Tal parece que este consultorio no tiene servicios aún</p>    
                    </div>
                }
                </div>
            </>
        )
    }

    const serviceComponent = ({p}:{p:any}) => {
        let isActiveService = service?.id === p.id ? true : false;

        const change = () => {
            if(service?.id === p.id) {
                changeService(null)(dispatch)
            } else {
                changeService(p)(dispatch)
            }
        }

        return (
            <div onClick={() => change()} className="flex w-full justify-between cursor-pointer">
                <div className="flex gap-5 mb-3">
                    <span className={twMerge([
                        'w-7 h-7 border-[3px] border-secondary text-white text-[12px] rounded-full flex flex-col justify-center items-center',
                        isActiveService && "bg-secondary transition-all"
                    ])}>
                        {isActiveService && <BsCheckLg /> }
                    </span>
                    <p className="font-light">{p.nombre}</p>
                </div>
                <div className="font-light text-md">
                    ${p.precioBase}
                </div>
            </div>
        )
    }

    return(
        <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
            <div className='w-full flex flex-col justify-center items-start gap-2'>
                <p className='text-lg text-slate-900 font-semibold'>Consultorios</p>
                <div className="w-full bg-slate-300 h-px block relative"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                {loadingLocalities ? 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Cargando...</p>
                        <p className='text-slate-500 text-sm font-light'>Obteniendo los consultorios del especialista</p>    
                    </div>
                : localities.length > 0 ? localities.map((elem:any)=> 
                    localityComponent({elem})
                ) : 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Nada por aquí</p>
                        <p className='text-slate-500 text-sm font-light'>Tal parece que este especialista no tiene consultorios aún</p>    
                    </div>
                }
            </div>
        </div>
    )
}

export default LocalitiesComponent;