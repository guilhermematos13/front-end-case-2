import {
  MenuItem,
  SelectChangeEvent,
  Select as SelectMaterial,
} from '@mui/material'
import { ForwardedRef, ReactNode } from 'react'

interface SelectProps {
  value: string
  onChange: (event: SelectChangeEvent) => void
  children: ReactNode
  isMultiple?: true
}

export function Select(
  { value, onChange, children, isMultiple }: SelectProps,
  ref: ForwardedRef<never>,
) {
  return (
    <div>
      <SelectMaterial
        multiple={isMultiple}
        className="mb-4 mt-1 w-full rounded-lg border border-none border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 focus:border focus:border-blue-primary"
        value={value}
        onChange={onChange}
      >
        <MenuItem disabled value="">
          <em></em>
        </MenuItem>
        {children}
      </SelectMaterial>
    </div>
  )
}
