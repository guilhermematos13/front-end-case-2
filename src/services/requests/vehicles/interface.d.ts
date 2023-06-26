import { Dispatch, SetStateAction } from 'react'

export interface VehicleInterface {
  id: number
  placa: string
  marcaModelo: string
  anoFabricacao: number
  kmAtual: number
}

export interface FetchVehiclesInterface {
  setVehiclesList: Dispatch<SetStateAction<VehicleInterface[]>>
  setIsLoading?: Dispatch<SetStateAction<boolean>>
}
