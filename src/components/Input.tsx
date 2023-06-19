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
      className="mb-4 mt-1 w-full rounded-lg bg-slate-100 px-4 py-2 text-gray-950 outline-none placeholder:text-gray-600 focus:border focus:border-blue-primary"
    />
  )
}
