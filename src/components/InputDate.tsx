import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { ptBR } from 'date-fns/locale'
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

interface InputDateProps {
  name: string
  control: Control<any>
  label: string
  value: Date
}

export const InputDate = forwardRef<HTMLDivElement, InputDateProps>(
  ({ name, control, value }, ref) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Controller
          name={name as never}
          control={control}
          render={({ field }) => (
            <DatePicker
              value={value}
              disablePast
              {...field}
              ref={ref}
              className="mb-2 mt-1 w-full rounded-lg border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary"
            />
          )}
        />
      </LocalizationProvider>
    )
  },
)

InputDate.displayName = 'InputDate'
