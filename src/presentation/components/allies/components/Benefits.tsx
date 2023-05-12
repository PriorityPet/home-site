import { twMerge } from "tailwind-merge"

const BenefitInList = ({title, description, image}:{
    title: string;
    description: string;
    image: string;
}) => {
    return(
        <div className='w-full h-fit relative flex justify-start items-start gap-6'>
            <img className='w-[35px] h-[35px] object-contain block' src={image}/>
            <div className="w-11/12 flex flex-col justify-start items-start gap-2 text-left">
                <p className='font-bold text-base text-secondary'>{title}</p>
                <p className='allies-description'>{description}</p>
            </div>
        </div>
    )
}

export const Benefits = () => {
    return (
        <div className={twMerge([
            'w-full flex flex-col justify-start items-center gap-[4rem] h-fit px-[12%] my-[4rem] text-center',
            'lg:px-[8rem]',
        ])}>
            <div className='w-full flex flex-col justify-center items-cente text-center gap-5'>
                <p className='allies-title'>Beneficios que podrás disfrutar</p>
                <p className='allies-description'>Estos son solo algunos de los beneficios que podrías esperar al rentar un local en MedHaus. Cada centro médico puede ofrecer distintos beneficios únicos que podrían ser de interés para ti</p>
            </div>
            <div className="w-full flex justify-between items-center gap-[3rem]">
                <div className={twMerge([
                    'w-full h-full relative flex flex-col justify-start items-start gap-4',
                    'lg:w-1/2',
                ])}>
                    <BenefitInList
                        title="Centro médico multidisciplinario" 
                        description="Amplia variedad de servicios médicos, por lo que somos una excelente opción para aquellos que buscan una atención médica completa y de alta calidad en un solo lugar." 
                        image="../img/icons/icon-4.png" 
                    />
                    <BenefitInList 
                        title="Comodidad en un entorno sanitario" 
                        description="Te ofrecemos la tranquilidad de saber que las instalaciones están diseñadas para cumplir con los estándares más altos de limpieza e higiene." 
                        image="../img/icons/icon-5.png" 
                    />
                    <BenefitInList 
                        title="Oportunidades de colaboración" 
                        description="Al compartir espacio en MedHaus, tendrás muchas oportunidades para colaborar con otros profesionales de la salud. " 
                        image="../img/icons/icon-6.png" 
                    />
                    <BenefitInList 
                        title="Marketing integrado" 
                        description="Estarás presente en un mercado focalizado en la salud, por lo que esto puede simplificarte el marketing y permitirte llegar a más personas interesadas en la salud y el bienestar." 
                        image="../img/icons/icon-7.png" 
                    />
                </div>
                <div className={twMerge([
                    'w-1/2 h-full hidden relative',
                    'lg:block',
                ])}>
                    <img className='w-full h-full object-cover' src='../img/benefits.png' alt='Plataforma médica para médicos'/>
                </div>
            </div>
        </div>
    )
}