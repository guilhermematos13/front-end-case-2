export interface UfListProps {
  id: number
  sigla: string
}

export interface CityListProps {
  nome: string
  id: number
}

export interface DisplacementModalInterface {
  handleCloseModal: () => void
  openModal: boolean
  fetchDisplacement: () => void
}
