'use client'

import { useEffect, useState } from 'react'
import { TabsDisplacements } from './components/TabsDisplacements'
import { DisplacementModal } from '../../partials/displacements/DisplacementModal'
import { fetchDisplacements } from '../../services/requests/displacements'
import { displacementInterface } from '../../services/requests/displacements/interface'
import { Button } from '../../components/Button'
import { RoadHorizon } from '@phosphor-icons/react'

export default function DisplacementsPage() {
  const [displacementsList, setDisplacementsList] = useState<
    displacementInterface[]
  >([])
  const [openModal, setOpenModal] = useState(false)

  function handleChangeModal() {
    setOpenModal((prev) => !prev)
  }

  useEffect(() => {
    fetchDisplacements({ setDisplacementsList })
  }, [])

  return (
    <div className="mt-20 flex h-screen flex-col px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Deslocamentos
        </h1>
        <Button
          icon={<RoadHorizon size={20} weight="fill" />}
          title="Criar um novo Deslocamento"
          onClick={handleChangeModal}
        />
      </div>
      <div className="w-full border border-blue-primary/50" />

      <TabsDisplacements
        handleChangeModal={handleChangeModal}
        displacementsList={displacementsList}
        setDisplacementsList={setDisplacementsList}
      />
      <DisplacementModal
        openModal={openModal}
        handleCloseModal={handleChangeModal}
        fetchDisplacement={() => {
          fetchDisplacements({ setDisplacementsList })
        }}
      />
    </div>
  )
}
