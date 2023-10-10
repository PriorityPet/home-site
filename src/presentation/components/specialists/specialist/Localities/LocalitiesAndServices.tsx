import { Specialist } from "@/lib/domain/core/entities/specialists/specialist";
import { useContext, useMemo } from "react";
import { ISpecialistsContext, SpecialistsContext } from "../../context/SpecialistsContext";
import { twMerge } from "tailwind-merge";
import { BsCheckLg } from 'react-icons/bs'
import { usePathname } from "next/navigation";
import { ILocality } from "@/lib/domain/core/entities/localityEntity";
import { IService } from "@/lib/domain/core/entities/serviceEntity";

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
    const {data: step} = state.changeStep

    const pathname = usePathname();
    
    useMemo(()=>{
        if(changedLocalityId && locality){
            const url = pathname?.split("/")
            if(url){
                let id = url![url!.length - 1]
                getSpecialistServices(parseInt(id), specialist.personType, locality.id)(dispatch)
            }
        }
    },[locality])

    const LocalityComponent = ({data}:{data:ILocality}) => {
        let isActive = locality?.id === data.id ? true : false;


        const change = () => {
            if(locality?.id === data.id) {
                changeLocality(null)(dispatch)
                changeService(null)(dispatch)
            } else {
                changeLocality(data)(dispatch)
                changeService(null)(dispatch)
            }
        }

        return (
            <>
                <div onClick={() => step === 0 && change()} className={twMerge([
                    "w-full flex justify-start items-center gap-3 bg-white rounded-md p-3 border-l-8 border border-slate-200",
                    isActive && "transition-all border-l-8 border-l-green-500 border-green-500",
                    step === 0 && `cursor-pointer`,
                ])}>
                    <div className="w-[8%] h-full relative flex flex-col justify-center items-center">
                        <span className={twMerge([
                            'w-7 h-7 border-[3px] border-secondary text-white text-[12px] rounded-full flex flex-col justify-center items-center',
                            isActive && "bg-green-500 border-green-500 transition-all"
                        ])}>
                            {isActive && <BsCheckLg /> }
                        </span>
                    </div>
                    <div className='w-[92%] flex flex-col justify-center items-start gap-2'>
                        <p className='paragraph text-slate-900'><b>{data["name"]}</b></p>
                        <p className='paragraph'>{data.address.postal_code.length > 0 ? data.address.postal_code : "Ubicacion no especificada"}</p>
                    </div>
                </div>
                <div className={twMerge([
                    "w-full px-10 h-fit rounded-md shadow-md drop-shadow-xl",
                    !isActive && "hidden"
                ])}>
                    {loadedServices ? 
                        <div className='w-full h-fit py-3 flex flex-col justify-center items-center gap-2 text-center'>
                            <p className='text-slate-900 text-base font-medium'>Cargando...</p>
                            <p className='text-slate-500 text-sm font-light'>Obteniendo los servicios de esta localidad</p>    
                        </div>
                    : services?.length > 0 ? services.map((p:IService)=> 
                        <ServiceComponent data={p} />
                    ) : 
                        <div className='w-full h-fit py-3 flex flex-col justify-center items-center gap-2 text-center'>
                            <p className='text-slate-900 text-base font-medium'>Nada por aquí</p>
                            <p className='text-slate-500 text-sm font-light'>Tal parece que esta localidad no tiene servicios aún</p>    
                        </div>
                    }
                </div>
            </>
        )
    }

    const ServiceComponent = ({data}:{data:IService}) => {
        let isActiveService = service?.id === data.id ? true : false;

        const change = () => {
            if(service?.id === data.id) {
                changeService(null)(dispatch)
            } else {
                changeService(data)(dispatch)
            }
        }

        return (
            <div onClick={() => step === 0 && change()} className={`flex w-full justify-between ${step === 0 && `cursor-pointer`}`}>
                <div className="flex gap-5 mb-3">
                    <span className={twMerge([
                        'w-7 h-7 border-[3px] border-secondary text-white text-[12px] rounded-full flex flex-col justify-center items-center',
                        isActiveService && "bg-secondary transition-all"
                    ])}>
                        {isActiveService && <BsCheckLg /> }
                    </span>
                    <p className="font-light">{data.name}</p>
                </div>
                <div className="font-light text-md">
                    ${data.base_price}
                </div>
            </div>
        )
    }

    return(
        <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
            <div className='w-full flex flex-col justify-center items-start gap-2'>
                <p className='text-lg text-slate-900 font-semibold'>Localidades</p>
                <div className="w-full bg-slate-300 h-px block relative"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
                {loadingLocalities ? 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Cargando...</p>
                        <p className='text-slate-500 text-sm font-light'>Obteniendo las localidades del especialista</p>    
                    </div>
                : localities.length > 0 ? localities.map((elem:ILocality)=> 
                    <LocalityComponent data={elem} />
                ) : 
                    <div className='w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center'>
                        <p className='text-slate-900 text-base font-medium'>Nada por aquí</p>
                        <p className='text-slate-500 text-sm font-light'>Tal parece que este especialista no tiene localidades aún</p>    
                    </div>
                }
            </div>
        </div>
    )
}

export default LocalitiesComponent;