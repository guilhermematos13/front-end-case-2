import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  id?: string
  name?: string
}

export const Input = forwardRef(
  (
    { placeholder, id, name, ...props }: InputProps,
    ref: ForwardedRef<never>,
  ) => {
    return (
      <input
        ref={ref}
        {...props}
        id={id}
        name={name}
        placeholder={placeholder}
        className="mt-1 h-14 w-full rounded-lg border border-transparent bg-slate-100 p-4 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary disabled:border disabled:border-gray-400 disabled:text-gray-400"
      />
    )
  },
)

Input.displayName = 'Input'
