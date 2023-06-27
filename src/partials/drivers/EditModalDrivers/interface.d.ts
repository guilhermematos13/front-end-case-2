export interface ModalDriverProps {
  handleCloseModal: () => void
  openModal: boolean
  fetchDriver: () => void
  idDriver: number
}

export interface DriverFormInterface {
  name: string
  driverDocument: string[]
  documentNumber: string
  licenseExpirationDate: string
}
