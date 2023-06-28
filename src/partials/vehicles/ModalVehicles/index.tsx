import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { Modal } from '../../../components/Modal'
import { ModalVehiclesProps, VehiclesFormInterface } from './interface'
import { Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'

import { useForm } from 'react-hook-form'

import { Button } from '../../../components/Button'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'

export function ModalVehicles({
  handleCloseModal,
  openModal,
  fetchVehicles,
}: ModalVehiclesProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      licensePlate: '',
      brandModel: '',
      year: null,
      currentKm: null,
    },
  })

  const handleSubmitData = (data: VehiclesFormInterface) => {
    api
      .post('veiculo', {
        placa: data.licensePlate,
        marcaModelo: data.brandModel,
        anoFabricacao: data.year,
        kmAtual: data.currentKm,
      })
      .then(() => {
        handleCloseModal()
        fetchVehicles()
        reset()
        toast.success('Veículo criado com sucesso!')
      })
      .catch((error) => {
        toast.error(error.response.data ?? 'Algo deu errado!')
      })
  }

  return (
    <Modal closeModal={handleCloseModal} openModal={openModal}>
      <div className="flex items-start justify-between">
        <Typography className="font-bold text-blue-primary xs:text-xl md:text-2xl">
          Inserir novo veículo
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
        <div className="flex flex-col">
          <div className="flex flex-col">
            <Label title="Placa do Veículo" htmlFor="name" />
            <Input
              {...register('licensePlate', { required: true })}
              name="name"
              id="name"
              placeholder="Digite a placa do veículo"
              onChange={(event) => {
                setValue('licensePlate', event.target.value)
              }}
            />
            {errors.licensePlate && (
              <span className="mb-2 mt-1 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label title="Modelo/Marca do Veículo" htmlFor="brandModel" />
            <Input
              {...register('brandModel', { required: true })}
              name="brandModel"
              id="brandModel"
              placeholder="Digite a marca e modelo do veículo"
              onChange={(event) => {
                setValue('brandModel', event.target.value)
              }}
            />
            {errors.brandModel && (
              <span className="mb-2 mt-1 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="w-full gap-4 xs:flex xs:flex-col lg:grid lg:grid-cols-2">
            <div className="flex w-full flex-col">
              <Label title="KM Atual do Veículo" htmlFor="currentKm" />
              <Input
                {...register('currentKm', {
                  required: true,
                  valueAsNumber: true,
                })}
                id="currentKm"
                name="currentKm"
                type="number"
                onChange={(event) => {
                  setValue('currentKm', Number(event.target.value))
                }}
                placeholder="Digite o KM atual do veículo"
              />
              {errors.currentKm && (
                <span className="mt-1 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col ">
                <Label title="Ano do Veículo" htmlFor="year" />
                <Input
                  {...register('year', { required: true, valueAsNumber: true })}
                  placeholder="Qual o ano do veículo"
                  min="1900"
                  max="2024"
                  type="number"
                />
              </div>
              {errors.year && (
                <span className="mb-2 mt-1 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <Button
              className="xs:w-full lg:w-1/3"
              title="Adicionar novo veículo"
              type="submit"
              icon={<PaperPlaneRight />}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
