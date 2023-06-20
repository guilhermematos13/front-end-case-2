import { ReactNode } from 'react'

interface TableDataProps {
  title: string | ReactNode
  className?: string
}

export function TableColumn({ title, className }: TableDataProps) {
  return (
    <td className={`bg-gray-300 p-4 text-gray-950 ${className}`}>{title}</td>
  )
}
