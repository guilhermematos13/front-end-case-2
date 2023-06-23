'use client'
import { Car, PencilLine, Trash } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableColumn } from '../../components/TableColumn'
import { toast } from 'react-hot-toast'
import { api } from '../../services/api'
import { VehicleInterface } from '../../services/requests/vehicles/interface'
import { fetchVehicles } from '../../services/requests/vehicles'
import { TableVehiclesData } from '../../data/TableVehiclesData'
import { ModalVehicles } from '../../partials/vehicles/ModalVehicles'

export default function DriversPage() {
  const [openModal, setOpenModal] = useState(false)
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([])

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleDeleteClient(id: number) {
    api
      .delete(`veiculo/${id}`, { data: { id } })
      .then(() => {
        fetchVehicles({ setVehiclesList })
        toast.success('Veiculo deletado com sucesso')
      })
      .catch(() => toast.error('Algo deu errado'))
  }

  useEffect(() => {
    fetchVehicles({ setVehiclesList })
  }, [])

  return (
    <div className="mt-20 flex h-screen flex-col items-center px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Veículos
        </h1>
        <div>
          <Button
            icon={<Car size={20} weight="fill" />}
            title="Inserir um novo veículo"
            onClick={handleChangeModal}
          />
        </div>
      </div>
      <div className="w-full border border-blue-primary/50" />
      <ModalVehicles
        fetchVehicles={() => fetchVehicles({ setVehiclesList })}
        handleCloseModal={handleChangeModal}
        openModal={openModal}
      />
      <div className="w-full">
        <Table
          tHeadChildren={TableVehiclesData.map((data, index) => (
            <TableHeader
              key={index}
              title={data.label}
              className="text-center"
            />
          ))}
          tBodyChildren={vehiclesList.map((vehicle, index) => (
            <tr
              key={index}
              className={
                index < vehiclesList.length - 1
                  ? 'border-b border-b-gray-600'
                  : ''
              }
            >
              <TableColumn title={vehicle.placa} className="text-center" />
              <TableColumn
                title={vehicle.marcaModelo}
                className="text-center"
              />
              <TableColumn
                title={vehicle.anoFabricacao}
                className="text-center"
              />
              <TableColumn title={vehicle.kmAtual} className="text-center" />
              <TableColumn
                title={
                  <div className="flex w-full justify-center gap-2">
                    <button className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900">
                      <PencilLine size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(vehicle.id)}
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
