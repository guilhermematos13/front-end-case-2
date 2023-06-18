import { Button as ButtonMaterial } from '@mui/material'
import { ReactNode } from 'react'

interface ButtonProps {
  title: string
  icon: ReactNode
}

export function Button({ title, icon }: ButtonProps) {
  return (
    <ButtonMaterial className="flex gap-2 rounded-lg bg-blue-primary px-4 py-2 normal-case text-slate-100 hover:bg-blue-800">
      {icon}
      {title}
    </ButtonMaterial>
  )
}
