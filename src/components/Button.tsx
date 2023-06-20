import { Button as ButtonMaterial } from '@mui/material'
import { ReactNode } from 'react'

interface ButtonProps {
  title: string
  icon: ReactNode
  onClick: () => void
  className?: string
}

export function Button({ title, icon, onClick, className }: ButtonProps) {
  return (
    <ButtonMaterial
      onClick={onClick}
      className={`flex gap-2 rounded-full bg-blue-primary px-4 py-2 normal-case text-slate-100 hover:bg-blue-800 ${className}`}
    >
      {title}
      {icon}
    </ButtonMaterial>
  )
}
