import type { ReactElement } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'
interface ButtonProps {
   variant: Variant
   text: string
   startIcon?: ReactElement
   onClick?: (e: any) => any
}
const variantType: Record<Variant, string> = {
   primary:
      'bg-purple-600 text-white font-normal text-lg px-4 py-2 rounded-xl text-center  rounded-xl-sm flex items-center cursor-pointer',
   secondary:
      'bg-purple-500 text-purple-600 font-normal text-lg px-4 py-2 rounded-xl text-center  rounded-xl-sm flex items-center cursor-pointer',
   danger:
      'bg-red-500 text-white font-normal text-lg px-4 py-2 rounded-xl text-center  rounded-xl-sm flex items-center cursor-pointer',
}
export const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
   return (
      <button className={variantType[variant]} onClick={onClick}>
         {startIcon && <div className="pr-2">{startIcon}</div>}
         <span>{text}</span>
      </button>
   )
}
