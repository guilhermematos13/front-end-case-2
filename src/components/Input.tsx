import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  id?: string
  name?: string
}

export function Input({ placeholder, id, name, ...props }: InputProps) {
  return (
    <input
      {...props}
      id={id}
      name={name}
      placeholder={placeholder}
      className="mb-4 mt-1 w-full rounded-lg border border-transparent bg-slate-100 p-4 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary"
    />
  )
}
