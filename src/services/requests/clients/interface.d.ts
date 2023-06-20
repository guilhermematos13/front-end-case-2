import { Dispatch, SetStateAction } from 'react'
import {
  CityStateListProps,
  UfListProps,
} from '../../../partials/client/ModalClient/interface'

export interface FetchUfListInterface {
  setUfList: Dispatch<SetStateAction<UfListProps[]>>
}

export interface FetchCityStateInterface {
  ufOption: string
  setCityStateList: Dispatch<SetStateAction<CityStateListProps[]>>
}

export interface ClientInterface {
  numeroDocumento: 'string'
  tipoDocumento: 'string'
  nome: 'string'
  logradouro: 'string'
  numero: 'string'
  bairro: 'string'
  cidade: 'string'
  uf: 'string'
}

export interface FetchClientsInterface {
  setClientList: Dispatch<SetStateAction<ClientInterface[]>>
}
