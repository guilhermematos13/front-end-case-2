import toast from 'react-hot-toast'
import { api } from '../../api'
import { FetchDriverInterface } from './interface'

export const fetchDrivers = ({ setDriverList }: FetchDriverInterface) => {
  api
    .get('condutor')
    .then((response) => {
      setDriverList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos clientes')
    })
}
