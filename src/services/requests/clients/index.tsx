import axios from 'axios'
import {
  FetchCityInterface,
  FetchClientsInterface,
  FetchUfListInterface,
} from './interface'
import { Alert } from '@mui/material'

export const fetchUF = ({ setUfList }: FetchUfListInterface) => {
  axios
    .get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    )
    .then((response) => {
      setUfList(response.data)
    })
    .catch(() => <Alert severity="error">Algo deu Errado!</Alert>)
}

export const fetchCity = ({ ufOption, setCityList }: FetchCityInterface) => {
  axios
    .get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufOption}/municipios?orderBy=nome`,
    )
    .then((response) => {
      setCityList(response.data)
    })
    .catch(() => <Alert severity="error">Algo deu Errado!</Alert>)
}

export const fetchClients = ({ setClientList }: FetchClientsInterface) => {
  axios
    .get('https://api-deslocamento.herokuapp.com/api/v1/cliente')
    .then((response) => {
      setClientList(response.data)
    })
    .catch(() => <Alert severity="error">Algo deu Errado!</Alert>)
}
