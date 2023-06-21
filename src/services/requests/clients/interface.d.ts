import { Dispatch, SetStateAction } from 'react'
import {
  CityListProps,
  UfListProps,
} from '../../../partials/client/ModalClient/interface'

export interface FetchUfListInterface {
  setUfList: Dispatch<SetStateAction<UfListProps[]>>
}

export interface FetchCityInterface {
  ufOption: string
  setCityList: Dispatch<SetStateAction<CityListProps[]>>
}

export interface ClientInterface {
  id: number
  numeroDocumento: 'string'
  tipoDocumento: 'string'
  nome: 'string'
  logradouro: 'string'
  numero: 'string'
  bairro: 'string'
  cidade: 'string'
  uf: 'string'
}

export interface ClientFormInterface {
  document: string
  uf: string
  name: string
  documentType: string
  city: string
  neighborhood: string
  address: string
  number: string
}

export interface FetchClientsInterface {
  setClientList: Dispatch<SetStateAction<ClientInterface[]>>
}
