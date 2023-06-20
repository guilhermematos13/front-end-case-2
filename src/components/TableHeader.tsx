interface TableHeaderProps {
  title: string
  className?: string
}

export function TableHeader({ title, className }: TableHeaderProps) {
  return (
    <th
      className={`bg-blue-primary p-4 text-left font-bold text-slate-100 ${className}`}
    >
      {title}
    </th>
  )
}
