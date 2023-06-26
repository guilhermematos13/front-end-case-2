export interface UfListProps {
  id: number
  sigla: string
}

export interface CityListProps {
  nome: string
  id: number
}

export interface ModalClientProps {
  handleCloseModal: () => void
  openEditModal: boolean
  fetchClients: () => void
  idClient: number
}
