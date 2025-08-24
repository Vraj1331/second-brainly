import type { HTMLInputTypeAttribute } from 'react'

interface InputTypes {
   type: string
   placeholder: string
   value?: string
   reference?: any
}
export const Input = ({ type, placeholder, value, reference }: InputTypes) => {
   return (
      <input
         type={type}
         placeholder={placeholder}
         value={value}
         className="bg-gray-200 px-5 py-2 rounded w-72 outline-none text-xl"
         ref={reference}
      />
   )
}
