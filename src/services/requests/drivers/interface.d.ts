import { Dispatch, SetStateAction } from 'react'

export interface DriverInterface {
  id: number
  catergoriaHabilitacao: string
  nome: string
  numeroHabilitacao: string
  vencimentoHabilitacao: Date
}

export interface FetchDriverInterface {
  setDriverList: Dispatch<SetStateAction<DriverInterface[]>>
  setIsLoading?: Dispatch<SetStateAction<boolean>>
}
