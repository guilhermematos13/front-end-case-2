export interface UfListProps {
  id: number
  sigla: string
}

export interface CityStateListProps {
  nome: string
  id: number
}

export interface ModalClientProps {
  handleCloseModal: () => void
  openModal: boolean
}
