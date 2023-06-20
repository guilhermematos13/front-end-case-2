'use client'
import {
  DotsThreeOutlineVertical,
  PencilLine,
  Trash,
  User,
} from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { ModalClient } from '../../partials/client/ModalClient'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableColumn } from '../../components/TableColumn'
import { Popover } from '@mui/material'
import { TableClientsData } from '../../data/TableClientsData'
import { fetchClients } from '../../services/requests/clients'
import { ClientInterface } from '../../services/requests/clients/interface'

export default function ClientsPage() {
  const [openModal, setOpenModal] = useState(false)
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null)
  const [clientList, setClientList] = useState<ClientInterface[]>([])

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleClickOpenPopover(event: React.MouseEvent<HTMLButtonElement>) {
    setOpenPopover(event.currentTarget)
  }

  function handleClickClosePopover() {
    setOpenPopover(null)
  }

  const open = Boolean(openPopover)
  const id = open ? 'simples-popover' : undefined

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
      <ModalClient handleCloseModal={handleChangeModal} openModal={openModal} />
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
                  <div>
                    <button
                      className="w-full pl-3"
                      onClick={handleClickOpenPopover}
                    >
                      <DotsThreeOutlineVertical size={20} />
                    </button>
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={openPopover}
                      onClose={handleClickClosePopover}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                    >
                      <div className="flex flex-col p-3">
                        <button className="mb-2 flex items-center gap-4 rounded-md p-1 font-bold text-blue-primary hover:bg-slate-400/60">
                          <Trash size={20} weight="bold" /> Apagar
                        </button>
                        <div className="w-full border border-gray-400/50 "></div>
                        <button className="mt-2 flex items-center gap-4 rounded-md p-1 font-bold text-blue-primary hover:bg-slate-400/60">
                          <PencilLine size={20} weight="bold" /> Editar
                        </button>
                      </div>
                    </Popover>
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
