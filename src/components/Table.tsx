import { ReactNode } from 'react'
import { EmptyTable } from './EmptyTable'
import { LoadingTable } from './LoadingTable'

interface TableProps {
  tHeadChildren: ReactNode
  tBodyChildren: ReactNode
  isEmpty?: boolean
  isLoading?: boolean
}

export function Table({
  tHeadChildren,
  tBodyChildren,
  isEmpty,
  isLoading,
}: TableProps) {
  return (
    <div className="flex flex-1 flex-col xs:p-1 md:p-8 lg:p-14">
      <div className="mt-5 flex-1 overflow-auto rounded-md">
        <table className="w-full">
          <thead>
            <tr>{tHeadChildren}</tr>
          </thead>
          <tbody>{tBodyChildren}</tbody>
        </table>
        {isLoading && <LoadingTable />}
        {isEmpty && !isLoading && <EmptyTable />}
      </div>
    </div>
  )
}
