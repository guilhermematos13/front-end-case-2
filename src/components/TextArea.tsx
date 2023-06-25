import { TextareaAutosize } from '@mui/material'
import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string
  name: string
}

export const TextArea = forwardRef(
  (
    { placeholder, name, ...props }: TextAreaProps,
    ref: ForwardedRef<never>,
  ) => {
    return (
      <TextareaAutosize
        {...props}
        ref={ref}
        className="rounded-md border border-transparent p-4 text-gray-950 outline-none placeholder:text-gray-600 hover:border hover:border-gray-950 focus:border focus:border-blue-primary"
        placeholder={placeholder}
        name={name}
      />
    )
  },
)

TextArea.displayName = 'TextArea'
