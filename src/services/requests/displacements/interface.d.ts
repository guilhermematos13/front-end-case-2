import { Dispatch, SetStateAction } from 'react'

export interface displacementInterface {
  id: number
  kmInicial: number
  kmFinal: number
  inicioDeslocamento: Date
  fimDeslocamento: Date
  checkList: string
  motivo: string
  observacao: string
  idCondutor: number
  idVeiculo: number
  idCliente: number
}

export interface createDisplacementFormInterface {
  id: number
  currentKm: number
  startDisplacement: Date
  checkList: string
  reason: string
  observation: string
  idDriver: number
  idVehicle: number
  idClient: number
}

export interface finishDisplacementFormInterface {
  id: number
  finalKm: number
  endDisplacement: Date
  observation: string
}

export interface fetchDisplacementInterface {
  setDisplacementsList: Dispatch<SetStateAction<displacementInterface[]>>
  setIsLoading: Dispatch<SetStateAction<boolean>>
}
