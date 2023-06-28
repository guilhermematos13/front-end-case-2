import { Button as ButtonMaterial } from '@mui/material'
import { ReactNode } from 'react'

interface ButtonProps {
  title: string
  icon: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'reset' | 'submit'
}

export function Button({
  title,
  icon,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  return (
    <ButtonMaterial
      type={type}
      onClick={onClick}
      className={`flex gap-2 rounded-full bg-blue-primary normal-case text-slate-100 hover:bg-blue-800 ${className} xs:p-2 sm:px-4 sm:py-2`}
    >
      {title}
      {icon}
    </ButtonMaterial>
  )
}
