import {
  MenuItem,
  SelectChangeEvent,
  Select as SelectMaterial,
} from '@mui/material'
import { ReactNode } from 'react'

interface SelectProps {
  value: string
  onChange: (event: SelectChangeEvent) => void
  children: ReactNode
}

export function Select({ value, onChange, children }: SelectProps) {
  return (
    <div>
      <SelectMaterial
        className="mb-4 mt-1 w-full rounded-lg border border-none border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 focus:border focus:border-blue-primary"
        value={value}
        onChange={onChange}
      >
        <MenuItem>
          <em>Nenhuma das Opções</em>
        </MenuItem>
        {children}
      </SelectMaterial>
    </div>
  )
}
