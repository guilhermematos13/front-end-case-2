export interface ModalVehiclesProps {
  handleCloseModal: () => void
  openModal: boolean
  fetchVehicles: () => void
  idVehicle: number | undefined
}

export interface VehiclesFormInterface {
  licensePlate: string
  brandModel: string
  year: number
  currentKm: number
}
