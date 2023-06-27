import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react'
import InputMask from 'react-input-mask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string
}

export const InputMaskCNPJ = forwardRef(
  ({ onChange, value, ...props }: InputProps, ref: ForwardedRef<never>) => {
    return (
      <InputMask
        ref={ref}
        className="mb-4 mt-1 w-full rounded-lg bg-slate-100 p-4 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary disabled:border disabled:border-gray-400 disabled:text-gray-400"
        {...props}
        mask="99.999.999/9999-99"
        onChange={onChange}
        value={value}
      />
    )
  },
)

InputMaskCNPJ.displayName = 'InputMaskCNPJ'
