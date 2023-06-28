import {
  MenuItem,
  SelectChangeEvent,
  Select as SelectMaterial,
} from '@mui/material'
import { ForwardedRef, ReactNode, forwardRef } from 'react'

interface SelectProps {
  value: string[] | string | undefined
  onChange: (event: SelectChangeEvent) => void
  children: ReactNode
  isMultiple?: true
  isDisabled?: boolean
}

export const Select = forwardRef(
  (
    { value, onChange, children, isMultiple, isDisabled = false }: SelectProps,
    ref: ForwardedRef<never>,
  ) => {
    return (
      <div>
        <SelectMaterial
          disabled={isDisabled}
          ref={ref}
          multiple={isMultiple}
          className="mt-1 w-full rounded-lg border border-none border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 focus:border focus:border-blue-primary "
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
  },
)

Select.displayName = 'Select'
