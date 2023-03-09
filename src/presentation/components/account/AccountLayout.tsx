import React from 'react'
import AccountProvider from './context/AccountContext'
import AccountCard from './AccountCard/AccountCard'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
    title: string
    description: string
    children: JSX.Element | JSX.Element[]
}

interface TabProps {
    label: string
    href: string
}

let list = [
    {
        label: "Mi cuenta",
        href: "/account"
    },
    {
        label: "Mi agenda",
        href: "/account/agenda"
    },
    {
        label: "Mis reservaciones",
        href: "/account/orders"
    },
    {
        label: "Expediente médico",
        href: "/account/medical-record"
    },
]

const TabComponent = (prop:TabProps) => {

    const router = useRouter()
    const path = router.pathname
    
    const { label, href } = prop
    return(
        <Link href={href} className={twMerge([
            "font-light text-sm text-slate-500 bg-transparent rounded py-2 px-3",
            path === href && "font-semibold text-white bg-primary"
        ])}>
            {label}
        </Link>
    )
}

const TabsComponent = () => {
    return(
        <div className='w-full h-fit p-3 flex justify-start items-center bg-white rounded-md border gap-2'>
            {list.map( data => <TabComponent label={data["label"]} href={data["href"]}/> )}
        </div>
    )
}

const AccountLayout = (props:Props) => {

    const {title, description, children} = props
    return (
        <AccountProvider>
            <div className="w-full h-full bg-slate-100 relative">
                <div className="p-[0%_20%]">

                    <div className="w-full flex justify-between items-start gap-10">
                        <div className="w-[35%] relative flex flex-col justify-center items-start">
                            <AccountCard/>
                        </div>
                        <div className="w-[65%] relative">
                            <TabsComponent/>
                            <div className="my-[4%]">
                                <p className="font-semibold text-4xl text-slate-900 mb-3">{title}</p>
                                <p className="font-light text-base text-slate-700">{description}</p>
                            </div>
                            <div className="overflow-y-auto">
                                {children}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </AccountProvider>
    )

}

export default AccountLayout