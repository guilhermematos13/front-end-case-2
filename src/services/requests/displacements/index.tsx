import toast from 'react-hot-toast'
import { api } from '../../api'
import { fetchDisplacementInterface } from './interface'

export const fetchDisplacements = ({
  setDisplacementsList,
}: fetchDisplacementInterface) => {
  api
    .get('deslocamento')
    .then((response) => {
      setDisplacementsList(response.data)
    })
    .catch(() => {
      toast.error('Algo deu errado no carregamento dos clientes')
    })
}
