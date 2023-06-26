'use client'
import { PencilLine, Trash, User } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { ModalClient } from '../../partials/client/ModalClient'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableColumn } from '../../components/TableColumn'

import { TableClientsData } from '../../data/TableClientsData'
import { fetchClients } from '../../services/requests/clients'
import { ClientInterface } from '../../services/requests/clients/interface'
import { api } from '../../services/api'
import { toast } from 'react-hot-toast'
import { EditModalClient } from '../../partials/client/EditModalClient'
export default function ClientsPage() {
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [clientId, setClientId] = useState<number>()
  const [clientList, setClientList] = useState<ClientInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleChangeEditModal(id?: number) {
    if (id) {
      setClientId(id)
    }
    setOpenEditModal((prev) => !prev)
  }

  function handleDeleteClient(id: number) {
    api
      .delete(`/cliente/${id}`, { data: { id } })
      .then(() => {
        fetchClients({ setClientList, setIsLoading })
        toast.success('Cliente deletado com sucesso')
      })
      .catch(() => toast.error('Algo deu errado'))
  }

  useEffect(() => {
    fetchClients({ setClientList, setIsLoading })
  }, [])

  return (
    <div className="mt-20 flex h-screen flex-col items-center px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Clientes
        </h1>
        <div>
          <Button
            icon={<User size={20} weight="fill" />}
            title="Criar um novo cliente"
            onClick={handleChangeModal}
          />
        </div>
      </div>
      <div className="w-full border border-blue-primary/50" />
      <ModalClient
        fetchClients={() => fetchClients({ setClientList, setIsLoading })}
        handleCloseModal={handleChangeModal}
        openModal={openModal}
      />
      <EditModalClient
        idClient={clientId}
        fetchClients={() => fetchClients({ setClientList, setIsLoading })}
        handleCloseModal={handleChangeEditModal}
        openEditModal={openEditModal}
      />
      <div className="w-full">
        <Table
          isEmpty={clientList.length === 0}
          isLoading={isLoading}
          tHeadChildren={TableClientsData.map((data, index) => (
            <TableHeader
              key={index}
              title={data.label}
              className="text-center"
            />
          ))}
          tBodyChildren={clientList.map((client, index) => (
            <tr
              key={index}
              className="border-b border-b-gray-600 last-of-type:border-0"
            >
              <TableColumn
                className="text-center"
                title={client.tipoDocumento}
              />
              <TableColumn
                className="text-center"
                title={client.numeroDocumento}
              />
              <TableColumn className="text-center" title={client.nome} />
              <TableColumn className="text-center" title={client.logradouro} />
              <TableColumn className="text-center" title={client.numero} />
              <TableColumn className="text-center" title={client.uf} />
              <TableColumn className="text-center" title={client.cidade} />
              <TableColumn className="text-center" title={client.bairro} />
              <TableColumn
                title={
                  <div className="flex w-full items-center justify-center gap-2">
                    <button
                      onClick={() => {
                        handleChangeEditModal(client.id)
                      }}
                      className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900"
                    >
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                }
              />
            </tr>
          ))}
        />
      </div>
    </div>
  )
}
