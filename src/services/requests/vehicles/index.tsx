import toast from 'react-hot-toast'
import { api } from '../../api'
import { FetchVehiclesInterface } from './interface'

export const fetchVehicles = ({ setVehiclesList }: FetchVehiclesInterface) => {
  api
    .get('veiculo')
    .then((response) => {
      setVehiclesList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos clientes')
    })
}
