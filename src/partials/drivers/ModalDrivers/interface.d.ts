export interface ModalDriverProps {
  handleCloseModal: () => void
  openModal: boolean
  fetchDriver: () => void
}

export interface DriverFormInterface {
  name: string
  driverDocument: string[]
  documentNumber: string
  licenseExpirationDate: string
}
