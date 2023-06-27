import Swal from 'sweetalert2'
import { api } from '../services/api'

interface SwalAlertProps {
  id: number
  url: string
  deleted: 'condutor' | 'cliente' | 'deslocamento' | 'veículo'
  fetchDelete: () => Promise<void>
}

export const SwalAlert = ({
  id,
  url,
  deleted,
  fetchDelete,
}: SwalAlertProps) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton:
        'bg-green-400 ml-4 rounded-md p-4 border border-green-600 hover:bg-green-600',
      cancelButton:
        'bg-red-400 rounded-md p-4 border border-red-600 hover:bg-red-600',
    },
    buttonsStyling: false,
  })

  swalWithBootstrapButtons
    .fire({
      title: 'Voce tem certeza que deseja deletar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, quero deletar!',
      cancelButtonText: 'Não',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`${url}/${id}`, { data: { id } })
          .then(() => {
            fetchDelete().then(() => {
              swalWithBootstrapButtons.fire(
                'Deletado!',
                `O ${deleted} foi deletado!`,
                'success',
              )
            })
          })
          .catch(() =>
            swalWithBootstrapButtons.fire(
              'Algo deu errado',
              `O ${deleted} não foi deletado!`,
              'error',
            ),
          )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          `O ${deleted} não foi deletado!`,
          'error',
        )
      }
    })
}
