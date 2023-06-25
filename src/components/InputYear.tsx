import { LocalizationProvider, YearCalendar } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

interface InputDateProps {
  name: string
  control: Control<any>
  label: string
  value: number
  onChange: (value) => void
}

export const InputYear = forwardRef<HTMLDivElement, InputDateProps>(
  ({ name, control, value, onChange }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Controller
          name={name as never}
          control={control}
          render={({ field }) => (
            <YearCalendar
              ref={ref}
              disableFuture
              onChange={onChange}
              value={value}
              {...field}
              className="-mt-1 mb-4 w-full rounded-lg border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary"
            />
          )}
        />
      </LocalizationProvider>
    )
  },
)

InputYear.displayName = 'InputYear'
