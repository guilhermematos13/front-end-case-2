import { Box, Modal as ModalMaterial } from '@mui/material'
import { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  openModal: boolean
  closeModal: () => void
}

export function Modal({ children, openModal, closeModal }: ModalProps) {
  return (
    <ModalMaterial open={openModal} onClose={closeModal}>
      <Box className="fixed left-1/2 top-1/2 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-blue-primary bg-slate-300 px-10 py-8 text-gray-950 shadow-lg shadow-black/25 outline-none">
        {children}
      </Box>
    </ModalMaterial>
  )
}
