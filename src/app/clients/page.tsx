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

export default function ClientsPage() {
  const [openModal, setOpenModal] = useState(false)
  const [clientList, setClientList] = useState<ClientInterface[]>([])

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleDeleteClient(id: number) {
    api
      .delete(`/cliente/${id}`, { data: { id } })
      .then(() => {
        fetchClients({ setClientList })
        toast.success('Cliente deletado com sucesso')
      })
      .catch(() => toast.error('Algo deu errado'))
  }

  useEffect(() => {
    fetchClients({ setClientList })
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
            title="Criar um novo Cliente"
            onClick={handleChangeModal}
          />
        </div>
      </div>
      <div className="w-full border border-blue-primary/50" />
      <ModalClient
        fetchClients={() => fetchClients({ setClientList })}
        handleCloseModal={handleChangeModal}
        openModal={openModal}
      />
      <div className="w-full">
        <Table
          tHeadChildren={TableClientsData.map((data, index) => (
            <TableHeader key={index} title={data.label} />
          ))}
          tBodyChildren={clientList.map((client, index) => (
            <tr
              key={index}
              className={
                index < clientList.length - 1
                  ? 'border-b border-b-gray-600'
                  : ''
              }
            >
              <TableColumn title={client.tipoDocumento} />
              <TableColumn title={client.numeroDocumento} />
              <TableColumn title={client.nome} />
              <TableColumn title={client.logradouro} />
              <TableColumn title={client.numero} />
              <TableColumn title={client.uf} />
              <TableColumn title={client.cidade} />
              <TableColumn title={client.bairro} />
              <TableColumn
                title={
                  <div className="flex gap-2">
                    <button className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900">
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
