import { CircularProgress } from '@mui/material'

export function LoadingTable() {
  return (
    <div className="flex w-full items-center justify-center rounded-md bg-gray-300 p-4">
      <CircularProgress />
    </div>
  )
}
