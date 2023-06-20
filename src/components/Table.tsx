import { ReactNode } from 'react'

interface TableProps {
  tHeadChildren: ReactNode
  tBodyChildren: ReactNode
}

export function Table({ tHeadChildren, tBodyChildren }: TableProps) {
  return (
    <div className="flex flex-1 flex-col xs:p-1 md:p-8 lg:p-14">
      <div className="mt-5 flex-1 overflow-auto rounded-md">
        <table className="w-full">
          <thead>
            <tr>{tHeadChildren}</tr>
          </thead>
          <tbody>{tBodyChildren}</tbody>
        </table>
      </div>
    </div>
  )
}
