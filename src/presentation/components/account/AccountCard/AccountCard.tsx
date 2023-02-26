import { useContext, useEffect, useMemo, useState } from "react";
import {AccountContext, IAccountContext } from "../context/AccountContext";
import { AccountFailure, accountFailuresEnum } from "../../../../lib/domain/core/failures/account/accountFailure";
import { DefaultInput } from "../../core/Inputs";
import Link from "next/link";
import {FiAlertCircle} from "react-icons/fi";

export default function AccountCard() {
    const { state, actions, dispatch } = useContext<IAccountContext>(AccountContext);
    const { getAccount } = actions;
    const { data, loading, error, successful } = state.getAccount;

    const [loadedAccount, setLoadedAccount] = useState(false)
    
    const getAccountEffect = () => {
        getAccount()(dispatch)
        setLoadedAccount(true)
    }

    useEffect(() => {
        getAccountEffect()
    }, [loadedAccount])

    interface TextComponentProps {
        label: string
        value: string
    }

    const TextComponent = (props:TextComponentProps) => {

        const {label, value} = props

        return(
            <div className="w-full relative flex flex-col justify-center items-start">
                <p className="font-light text-sm text-slate-500">{label}</p>
                <p className="font-semibold text-lg text-slate-900">{value}</p>
            </div>
        )
    }

    return (
        <div className="w-full flex flex-col gap-5 justify-between items-start bg-white rounded-lg border px-4">
            <div className="w-[130px] h-[130px] mt-4 rounded-full mx-auto overflow-hidden">
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" className="w-full h-full object-cover object-center" />
            </div>
            <div className="w-full relative h-fit flex flex-col justify-start items-start gap-4">
                <TextComponent label="Nombre completo" value="Dylan González" />
                <TextComponent label="Teléfono" value="+58 414-1332445" />
                <TextComponent label="Identificación" value="29665185" />
            </div>
            <div className="w-full relative h-fit border-t flex justify-between items-center py-4 gap-3">
                <div className="w-1/2 h-1/2 flex flex-col justify-center items-center relative">
                    <p className="font-semibold text-3xl text-slate-900">20</p>
                    <p className="font-light text-sm text-slate-500">Compras</p>
                </div>
                <div className="w-px h-[70px] bg-slate-300 relative"></div>
                <div className="w-1/2 h-1/2 flex flex-col justify-center items-center relative">
                    <p  className="font-semibold text-3xl text-slate-900">4</p>
                    <p className="font-light text-sm text-slate-500">Reservaciones</p>
                </div>
            </div>
        </div>
    );
}
