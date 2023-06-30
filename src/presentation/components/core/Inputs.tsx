import { Variants, motion } from 'framer-motion';
import React, {useMemo, useState, useEffect, useRef} from 'react'
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

interface SpecialSearchProps {
  selectedItem: Function;
  customClick: Function;
  customClickEmpty?: any;
  list: SearchValue[];
  placeholder?: string | any;
}

interface SearchValue {
  id: number;
  title: string;
  description: string;
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

export function SpecialSelect({...props}:SpecialSearchProps) {
  
  const [active, setActive] = useState(false)
  const [activeValue, setActiveValue] = useState({} as SearchValue)

  const searchbox: Variants = {
    active: { translateY: 0, opacity: 1, visibility: "visible"},
    disabled: { translateY: 10, opacity: 0, visibility: "hidden"}
  };

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref:React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event:MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActive(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]); 
  }

  useOutsideAlerter(wrapperRef);

  const EmptyList = () => {
    return(
      <div className='w-full text-center h-full flex flex-col justify-center items-center gap-2 p-4'>
          <p className='font-semibold text-lg text-slate-950 w-[50%]'>Sin resultados</p>
          <p className='font-light text-sm text-slate-500 w-[70%]'>Tal parece que no hay resultados en tu busqueda, lo sentimos</p>
      </div>
    )
  } 

  const ValueOnList = ({props, customClick}:{props: SearchValue; customClick: Function;}) => {

    return(
      <div onClick={()=>{ customClick(props) }} className={twMerge([
        "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white hover:bg-slate-200 p-2"
      ])}>
        <p className='block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-full overflow-hidden text-ellipsis'>{props.title}</p>
        <p className='block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full max-w-[90%] overflow-hidden text-ellipsis'>{props.description}</p>
      </div>
    )
  }

  return (
    <div
      className={twMerge([
        "min-w-[4rem] w-full relative block",
      ])}
    >
      <div onClick={()=>{ setActive(true) }} className={twMerge([
        "transition relative w-full h-fit cursor-pointer justify-center items-start bg-white border border-slate-300 rounded-md p-2"
      ])}>
        <p className='block whitespace-nowrap font-medium text-gray-950 text-[0.9rem] w-full overflow-hidden text-ellipsis'>
          {
            activeValue.title ? 
              activeValue.title 
            : 
              "Nada aún"
          }
        </p>
        <p className='block whitespace-nowrap font-light text-gray-500 text-[0.8rem] w-full overflow-hidden text-ellipsis'>
          {
            activeValue.description ? 
              activeValue.description 
            : 
              "Selecciona un valor de la lista"
          }
        </p>
      </div>
      <motion.div
        ref={wrapperRef}
        variants={searchbox}
        animate={active ? "active" : "disabled"}
        className={twMerge([
            "absolute top-full right-0 w-full block bg-white border rounded-md border-slate-100 shadow-md z-[20]"
        ])}>
        <div className="max-h-[30vh] w-full relative overflow-hidden min-h-[10vh] h-fit overflow-y-auto">
          {props.list.length === 0 ? 
            <EmptyList/> 
          : 
            props.list.map((elem:SearchValue, i) => 
              <ValueOnList
                key={i}
                customClick={(value:any)=>{ 
                  setActiveValue(value);
                  props.customClick(value);
                  props.selectedItem(value); 
                  console.log(value);
                  setActive(false)
                }}
                props={elem}
              />
            )
          }
        </div>
      </motion.div>
    </div>
  )
}