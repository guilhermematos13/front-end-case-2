export interface ModalDriverProps {
  handleCloseModal: () => void
  openModal: boolean
  fetchDriver: () => void
  idDriver: number | undefined
}

export interface DriverFormInterface {
  name: string
  driverDocument: string[]
  documentNumber: string
  licenseExpirationDate: string
}
