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
      <Box className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border-2 border-blue-primary bg-slate-300 text-gray-950 shadow-lg shadow-black/25 outline-none xs:h-full xs:w-full xs:p-4 md:w-1/2 md:px-8 md:py-4 lg:h-auto lg:px-10 lg:py-8">
        {children}
      </Box>
    </ModalMaterial>
  )
}
