import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps{
    onChangeCustom: (str: string | number ) => void
    placeholder: string | undefined
    type: string | undefined
    value?: string | number
    disabled?: boolean
}

interface SelectProps{
    onChangeCustom: (str: string | number) => void
    placeholder: string | undefined
    value?: string | number
    list: any[]
}

export function DefaultInput({ onChangeCustom, placeholder, value = "", type, disabled }: InputProps) {
  return (
    <input
      disabled={disabled}
      type={type}
      className={twMerge([
        "min-w-[4rem] w-full max-w-full",
        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
        "focus:outline-none focus:border-slate-400",
        "placeholder-slate-800"
      ])}
      onChange={event => onChangeCustom(event.target.value)}
      placeholder={placeholder}
      defaultValue={value}
    />
  )
}

export function InputSelect({ onChangeCustom, placeholder, value = "", list = [] }: SelectProps) {
  return (
    <select
      className={twMerge([
        "min-w-[4rem] w-full max-w-full",
        "transition bg-white border border-slate-300 rounded-md font-normal text-slate-900 text-sm p-[0.5rem_0.6rem]",
        "focus:outline-none focus:border-slate-400",
        "placeholder-slate-800"
      ])}
      onChange={event => onChangeCustom(event.target.value)}
      defaultValue={value}
    >
      <option value="">{placeholder}</option>
      {list.map((value, i)=> <option key={i} value={value["value"]}>{value["title"]}</option> )}
    </select>
  )
}