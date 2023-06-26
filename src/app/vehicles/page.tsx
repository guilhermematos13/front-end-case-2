'use client'
import { Car, PencilLine, Trash } from '@phosphor-icons/react'
import { Button } from '../../components/Button'
import React, { useEffect, useState } from 'react'
import { Table } from '../../components/Table'
import { TableHeader } from '../../components/TableHeader'
import { TableColumn } from '../../components/TableColumn'
import { api } from '../../services/api'
import { VehicleInterface } from '../../services/requests/vehicles/interface'
import { fetchVehicles } from '../../services/requests/vehicles'
import { TableVehiclesData } from '../../data/TableVehiclesData'
import { ModalVehicles } from '../../partials/vehicles/ModalVehicles'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

export default function DriversPage() {
  const [openModal, setOpenModal] = useState(false)
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([])
  const [isLoading, setIsLoading] = useState(true)

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  function handleDeleteClient(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton:
          'bg-green-400 ml-4 rounded-md p-4 border border-green-600 hover:bg-green-600',
        cancelButton:
          'bg-red-400 rounded-md p-4 border border-red-600 hover:bg-red-600',
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons
      .fire({
        title: 'Voce tem certeza que deseja deletar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, quero deletar!',
        cancelButtonText: 'Não',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`veiculo/${id}`, { data: { id } })
            .then(() => {
              fetchVehicles({ setVehiclesList, setIsLoading })
              swalWithBootstrapButtons.fire(
                'Deletado!',
                'O Veículo foi deletado!',
                'success',
              )
            })
            .catch(() =>
              swalWithBootstrapButtons.fire(
                'Algo deu errado',
                'O Veículo não foi deletado!',
                'error',
              ),
            )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'O Veículo não foi deletado!',
            'error',
          )
        }
      })
  }

  useEffect(() => {
    fetchVehicles({ setVehiclesList, setIsLoading })
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
        fetchVehicles={() => fetchVehicles({ setVehiclesList, setIsLoading })}
        handleCloseModal={handleChangeModal}
        openModal={openModal}
      />
      <div className="w-full">
        <Table
          isEmpty={vehiclesList.length === 0}
          isLoading={isLoading}
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
              className="border-b border-b-gray-600 last-of-type:border-0"
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
