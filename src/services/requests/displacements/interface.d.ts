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

export interface displacementFormInterface {
  id: number
  currentKm: number
  finalKm: number
  startDisplacement: Date
  endDisplacement: Date
  checkList: string
  reason: string
  observation: string
  idDriver: number
  idVehicle: number
  idClient: number
}

export interface fetchDisplacementInterface {
  setDisplacementsList: Dispatch<SetStateAction<displacementInterface[]>>
}
