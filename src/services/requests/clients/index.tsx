import axios from 'axios'
import {
  FetchCityInterface,
  FetchClientsInterface,
  FetchUfListInterface,
} from './interface'
import { toast } from 'react-hot-toast'

export const fetchUF = ({ setUfList }: FetchUfListInterface) => {
  axios
    .get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    )
    .then((response) => {
      setUfList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos estados')
    })
}

export const fetchCity = ({ ufOption, setCityList }: FetchCityInterface) => {
  axios
    .get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufOption}/municipios?orderBy=nome`,
    )
    .then((response) => {
      setCityList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento das cidades')
    })
}

export const fetchClients = ({ setClientList }: FetchClientsInterface) => {
  axios
    .get('https://api-deslocamento.herokuapp.com/api/v1/cliente')
    .then((response) => {
      setClientList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos clientes')
    })
}
