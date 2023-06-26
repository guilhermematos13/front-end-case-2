import { Typography } from '@mui/material'

export function EmptyTable() {
  return (
    <div className="flex w-full items-center justify-center rounded-md bg-gray-300 p-4">
      <Typography variant="h6">Não existem registros para exibir.</Typography>
    </div>
  )
}
