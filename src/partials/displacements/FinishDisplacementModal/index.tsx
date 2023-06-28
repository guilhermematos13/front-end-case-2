import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'

import { Modal } from '../../../components/Modal'
import { FinishDisplacementModalInterface } from './interface'
import { Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'
import { TextArea } from '../../../components/TextArea'
import { finishDisplacementFormInterface } from '../../../services/requests/displacements/interface'
import { InputDateTime } from '../../../components/InputDateTime'
import { useEffect } from 'react'

export function FinishDisplacementModal({
  handleCloseModal,
  openFinishModal,
  fetchDisplacement,
  displacementId,
}: FinishDisplacementModalInterface) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      finalKm: null,
      endDisplacement: null,
      observation: '',
    },
  })

  const handleSubmitData = (data: finishDisplacementFormInterface) => {
    api
      .put(`deslocamento/${displacementId}/encerrardeslocamento`, {
        id: displacementId,
        kmFinal: data.finalKm,
        fimDeslocamento: data.endDisplacement,
        observacao: data.observation,
      })
      .then(() => {
        toast.success('Deslocamento encerrado!')
        reset()
        fetchDisplacement()
        handleCloseModal()
      })
      .catch((error) => {
        toast.error(error.response.data ?? 'Algo deu errado!')
      })
  }

  useEffect(() => {
    openFinishModal &&
      displacementId &&
      api.get(`deslocamento/${displacementId}`).then((response) => {
        setValue('observation', response.data.observacao)
      })
  }, [setValue, displacementId, openFinishModal])

  return (
    <Modal closeModal={handleCloseModal} openModal={openFinishModal}>
      <div className="flex items-start justify-between">
        <Typography className="font-bold text-blue-primary xs:text-xl md:text-2xl">
          Finalizar deslocamento?
        </Typography>
        <button
          onClick={handleCloseModal}
          className="border-0 text-gray-950 outline-none hover:text-gray-600"
        >
          <X size={24} />
        </button>
      </div>
      <div className="my-6 border border-blue-primary"></div>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <div className="flex w-full items-start gap-2 xs:flex-col lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <Label title="KM Final" />
            <Input
              {...register('finalKm', { required: true, valueAsNumber: true })}
              placeholder="Digite o KM Final"
              type="number"
            />
            {errors.finalKm && (
              <span className="text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className=" flex w-full flex-col gap-2">
            <Label title="Final do Deslocamento" htmlFor="endDisplacement" />
            <InputDateTime
              {...register('endDisplacement', { required: true })}
              control={control}
              value={watch('endDisplacement')}
              name="endDisplacement"
              label="Data"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label title="Observações" htmlFor="observation" />
          <TextArea
            {...register('observation', { required: true })}
            placeholder="Digite as observações do deslocamento"
            name="observation"
            id="observation"
            onChange={(event) => {
              setValue('observation', event.target.value)
            }}
          />
          {errors.observation && (
            <span className=" text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
        </div>
        <div className="mt-8 flex w-full justify-center">
          <Button
            className="xs:w-full lg:w-1/3"
            title="Finalizar deslocamento"
            type="submit"
            icon={<PaperPlaneRight />}
          />
        </div>
      </form>
    </Modal>
  )
}
