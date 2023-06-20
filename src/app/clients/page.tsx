'use client'
import { User } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import { useState } from 'react'
import { ModalClient } from '../../partials/client/ModalClient'

export default function ClientsPage() {
  const [openModal, setOpenModal] = useState(false)

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  return (
    <div className="mt-20 flex h-screen flex-col items-center px-48 xs:px-4">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Clientes
        </h1>
        <div>
          <Button
            icon={<User size={20} weight="fill" />}
            title="Criar um novo Cliente"
            onClick={handleChangeModal}
          />
        </div>
      </div>
      <div className="w-full border border-blue-primary/50" />

      <ModalClient handleCloseModal={handleChangeModal} openModal={openModal} />
    </div>
  )
}
