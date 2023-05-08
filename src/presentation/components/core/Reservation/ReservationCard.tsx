import React from 'react'

const ReservationCard = () => {
    return(
        <div className="w-full lg:w-[33%] max-h-[50vh] bg-white border rounded-lg p-4">
            <div className="w-full h-[100%] flex flex-col justify-between items-center gap-6">
    
                <p className="w-full text-slate-900 font-semibold text-base border-b mb-2 pb-2">Tu reserva</p>
                <p className="paragraph">Recuerda ser puntual con tu asistencia en el dia y hora de tu reserva</p>
    
                <div className="w-full relative flex justify-between items-center">
                    <p className="w-1/5 text-slate-900 font-semibold text-base">Fecha</p>
                    <p className="w-fit text-slate-900 font-light text-base">10/10/2022</p>
                </div>
                <div className="w-full relative flex justify-between items-center">
                    <p className="w-1/5 text-slate-900 font-semibold text-base">Hora</p>
                    <p className="w-fit text-slate-900 font-light text-base">20:00AM</p>
                </div>
                <div className="w-full relative flex justify-between items-center">
                    <p className="w-1/5 text-slate-900 font-semibold text-base">Monto</p>
                    <p className="w-fit text-slate-900 font-light text-base">$25.00</p>
                </div>
    
                <div className="btn btn-primary w-full">Continuar</div>
            </div>
        </div>
    )
}

export default ReservationCard