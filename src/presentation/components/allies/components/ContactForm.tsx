import { useState } from "react";
import { twMerge } from "tailwind-merge"
import { VALIDATE_EMAIL, VALIDATE_STRING } from "@/lib/utils/errors-validation"
import { FiAlertCircle, FiCheckCircle, FiPlusCircle, FiX } from "react-icons/fi";

export const ContactForm = ({email_to}:{email_to:string}) => {
    
    const [sended, setSended] = useState(false)
    const [sending, setSending] = useState(false)

    const [errorInEmail, setErrorInEmail] = useState(false)
    const [errorInName, setErrorInName] = useState(false)

    const [successful, setSuccessful] = useState(false)
    const [error, setError] = useState(false)

    const [values, setValues] = useState({
        fullname: "",
        email: "",
        message: "",
    })
    function validateSend(){
        
        let validEmail = VALIDATE_EMAIL(values.email)
        let validName = VALIDATE_STRING(values.fullname) === null

        if(validEmail && validName){
            setErrorInName(false)
            setErrorInEmail(false)
            sendForm()
        }else{
            validEmail === false && setErrorInEmail(true)
            validName === false && setErrorInName(true)
        }
    }

    async function sendForm(){
        setSending(true)
        try{
            await fetch("/api/sendgrid", {
                body: JSON.stringify({...values, email_to}),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
            });
            setError(false)
            setSuccessful(true)
        }catch(e){
            setSuccessful(false)
            setError(true)
        }
        setSending(false)
        setSended(true)
    }

    const Alert = ({type, customClick}:{type:string; customClick:Function}) => {
        return(
            <div className={
                twMerge([
                    "w-[90%] bg-white py-2 flex justify-between items-center border shadow-md rounded-md",
                    "lg:w-[22rem]",
                    "fixed top-[13%] right:[0%] lg:right-[2%]",
                    type === "SUCCESS" ? 
                    "border-green-300" : 
                    "border-red-300"
                ])
            }>
                <div className={
                    twMerge([
                        "w-14 h-14 bg-white flex justify-center items-center",
                        type === "SUCCESS" ? 
                        "text-green-500" : 
                        "text-red-500"
                    ])
                }>
                    {
                        type === "SUCCESS" ? 
                        <FiCheckCircle/> : 
                        <FiAlertCircle/>
                    }
                </div>
                <div className="w-[98%] h-full flex flex-col justify-center items-start">
                    <p className="text-base text-slate-900 font-medium">{type === "SUCCESS" ? "Exitos" : "Error"}</p>
                    <p className="text-sm text-slate-500 font-light">{type === "SUCCESS" ? "El email se ha enviado exitosamente" : "Ha ocurrido un error enviando el correo"}</p>
                </div>
                <div onClick={()=>{ customClick() }} className="w-10 h-10 flex justify-center items-center cursor-pointer">
                    <FiX/>
                </div>
            </div>
        )
    }

    const Button = () => {
        return(
            <button disabled={
                sending || 
                values.email.length < 5 ||
                values.message.length < 5 ||
                values.fullname.length < 5
            } onClick={()=>{ (!sending || !sended) && validateSend() }} className={twMerge([
                "text-white bg-primary w-full h-fit px-20 py-3 font-light text-sm rounded-md cursor-pointer text-center hover:bg-dark-primary transition",
                "disabled:bg-slate-400 disabled:cursor-not-allowed disabled:hover:bg-slate-400"
            ])}>{sending ? "Enviando..." : "Enviar"}</button>
        )
    }

    return(
        <>
            {error && <Alert customClick={()=>{ setError(false) }} type="ERROR"/>}
            {successful && <Alert customClick={()=>{ setSuccessful(false) }} type="SUCCESS"/>}
            <div className='w-full h-fit bg-white border border-slate-200 shadow-lg p-6 flex flex-col justify-start items-center gap-[2.5rem] rounded-lg'>
                <div className="w-full flex flex-col justify-center items-start gap-1">
                    <p className='allies-subtitle'>Contáctanos</p>
                    <p className='allies-description'>Envíanos un mensaje para que trabajemos juntos</p>
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-4">
                    <div className="w-full flex flex-col justify-center items-start gap-1">
                        <p className='allies-label'>Tu nombre <span className="text-red-800">*</span></p>
                        {errorInName && <p className="text-sm text-red-500 font-medium">El nombre no debe contener números</p>}
                        <input 
                        className={twMerge([
                            "min-w-[4rem] w-full max-w-full",
                            "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                            "focus:outline-none focus:border-slate-400",
                            "placeholder-slate-400"
                        ])}
                        type='text' 
                        onChange={(e)=>{ setValues({...values, fullname: e.target.value}) }}
                        placeholder='Escribe tu nombre completo...' />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-1">
                        <p className='allies-label'>Correo electrónico <span className="text-red-800">*</span></p>
                        {errorInEmail && <p className="text-sm text-red-500 font-medium">El email debe ser correcto</p>}
                        <input 
                        className={twMerge([
                            "min-w-[4rem] w-full max-w-full",
                            "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                            "focus:outline-none focus:border-slate-400",
                            "placeholder-slate-400"
                        ])}
                        onChange={(e)=>{ setValues({...values, email: e.target.value}) }}
                        type='email' placeholder='contacto@mail.com' />
                    </div>
                    <div className="w-full flex flex-col justify-center items-start gap-1">
                        <p className='allies-label'>Mensaje <span className="text-red-800">*</span></p>
                        <textarea 
                        className={twMerge([
                            "min-w-[4rem] w-full max-w-full",
                            "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
                            "focus:outline-none focus:border-slate-400",
                            "placeholder-slate-400"
                        ])}
                        onChange={(e)=>{ setValues({...values, message: e.target.value}) }}
                        placeholder='Hablanos de lo que necesites...'></textarea>
                    </div>
                </div>
                <Button/>
            </div>
        </>
    )
}