'use client'
import { PencilLine, SteeringWheel, Trash } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableColumn } from '../../components/TableColumn'

import { fetchDrivers } from '../../services/requests/drivers'
import { DriverInterface } from '../../services/requests/drivers/interface'
import { TableDriversData } from '../../data/TableDriversData'
import { ModalDrivers } from '../../partials/drivers/ModalDrivers'
import { toast } from 'react-hot-toast'
import { api } from '../../services/api'
import { getFormatDate } from '../../utils/getFormatDate'

export default function DriversPage() {
  const [openModal, setOpenModal] = useState(false)
  const [driverList, setDriverList] = useState<DriverInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleDeleteClient(id: number) {
    api
      .delete(`/condutor/${id}`, { data: { id } })
      .then(() => {
        fetchDrivers({ setDriverList, setIsLoading })
        toast.success('Cliente deletado com sucesso')
      })
      .catch(() => toast.error('Algo deu errado'))
  }

  useEffect(() => {
    fetchDrivers({ setDriverList, setIsLoading })
  }, [])

  return (
    <div className="mt-20 flex h-screen flex-col items-center px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Condutores
        </h1>
        <div>
          <Button
            icon={<SteeringWheel size={20} weight="fill" />}
            title="Criar um novo condutor"
            onClick={handleChangeModal}
          />
        </div>
      </div>
      <div className="w-full border border-blue-primary/50" />
      <ModalDrivers
        fetchDriver={() => fetchDrivers({ setDriverList, setIsLoading })}
        handleCloseModal={handleChangeModal}
        openModal={openModal}
      />
      <div className="w-full">
        <Table
          isEmpty={driverList.length === 0}
          isLoading={isLoading}
          tHeadChildren={TableDriversData.map((data, index) => (
            <TableHeader
              key={index}
              title={data.label}
              className="text-center"
            />
          ))}
          tBodyChildren={driverList.map((driver, index) => (
            <tr
              key={index}
              className="border-b border-b-gray-600 last-of-type:border-0"
            >
              <TableColumn title={driver.nome} className="text-center" />
              <TableColumn
                title={driver.numeroHabilitacao}
                className="text-center"
              />
              <TableColumn
                title={driver.catergoriaHabilitacao}
                className="text-center"
              />
              <TableColumn
                title={getFormatDate(
                  driver.vencimentoHabilitacao,
                  'dd/MM/yyyy',
                )}
                className="text-center"
              />
              <TableColumn
                title={
                  <div className="flex w-full justify-center gap-2">
                    <button className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900">
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(driver.id)}
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
