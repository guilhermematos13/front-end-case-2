'use client'

import { useEffect, useState } from 'react'
import { TabsDisplacements } from './components/TabsDisplacements'
import { CreateDisplacementModal } from '../../partials/displacements/CreateDisplacementModal'
import { fetchDisplacements } from '../../services/requests/displacements'
import { displacementInterface } from '../../services/requests/displacements/interface'
import { Button } from '../../components/Button'
import { RoadHorizon } from '@phosphor-icons/react'
import { FinishDisplacementModal } from '../../partials/displacements/FinishDisplacementModal'

export default function DisplacementsPage() {
  const [displacementsList, setDisplacementsList] = useState<
    displacementInterface[]
  >([])
  const [openModal, setOpenModal] = useState(false)
  const [openFinishModal, setOpenFinishModal] = useState(false)
  const [displacementId, setDisplacementId] = useState<number>()
  const [isLoading, setIsLoading] = useState(true)

  function handleChangeCreateModal() {
    setOpenModal((prev) => !prev)
  }

  function handleChangeFinishModal(id?: number) {
    if (id) {
      setDisplacementId(id)
    }
    setOpenFinishModal((prev) => !prev)
  }

  useEffect(() => {
    fetchDisplacements({ setDisplacementsList, setIsLoading })
  }, [])

  return (
    <div className="mt-20 flex h-screen flex-col px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between xs:flex-col xs:gap-2 sm:flex-row sm:gap-0">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Deslocamentos
        </h1>
        <Button
          icon={<RoadHorizon size={20} weight="fill" />}
          title="Criar um novo deslocamento"
          onClick={handleChangeCreateModal}
        />
      </div>
      <div className="w-full border border-blue-primary/50" />

      <TabsDisplacements
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        handleChangeFinishModal={handleChangeFinishModal}
        displacementsList={displacementsList}
        setDisplacementsList={setDisplacementsList}
      />
      <CreateDisplacementModal
        openModal={openModal}
        handleCloseModal={handleChangeCreateModal}
        fetchDisplacement={() => {
          fetchDisplacements({ setDisplacementsList, setIsLoading })
        }}
      />
      <FinishDisplacementModal
        handleCloseModal={handleChangeFinishModal}
        openFinishModal={openFinishModal}
        fetchDisplacement={() => {
          fetchDisplacements({ setDisplacementsList, setIsLoading })
        }}
        displacementId={displacementId}
      />
    </div>
  )
}
