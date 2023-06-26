import toast from 'react-hot-toast'
import { api } from '../../api'
import { FetchVehiclesInterface } from './interface'

export const fetchVehicles = ({
  setVehiclesList,
  setIsLoading,
}: FetchVehiclesInterface) => {
  setIsLoading && setIsLoading(true)
  api
    .get('veiculo')
    .then((response) => {
      setVehiclesList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos clientes')
    })
    .finally(() => {
      setIsLoading && setIsLoading(false)
    })
}
