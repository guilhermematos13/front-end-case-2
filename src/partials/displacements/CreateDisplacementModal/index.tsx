import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { Select } from '../../../components/Select'
import { Modal } from '../../../components/Modal'
import { DisplacementModalInterface } from './interface'
import { MenuItem, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'
import { createDisplacementFormInterface } from '../../../services/requests/displacements/interface'
import { TextArea } from '../../../components/TextArea'
import { fetchClients } from '../../../services/requests/clients'
import { fetchDrivers } from '../../../services/requests/drivers'
import { fetchVehicles } from '../../../services/requests/vehicles'
import { ClientInterface } from '../../../services/requests/clients/interface'
import { DriverInterface } from '../../../services/requests/drivers/interface'
import { VehicleInterface } from '../../../services/requests/vehicles/interface'
import { InputDateTime } from '../../../components/InputDateTime'

export function CreateDisplacementModal({
  handleCloseModal,
  openModal,
  fetchDisplacement,
}: DisplacementModalInterface) {
  const [clientList, setClientList] = useState<ClientInterface[]>([])
  const [driverList, setDriverList] = useState<DriverInterface[]>([])
  const [vehiclesList, setVehiclesList] = useState<VehicleInterface[]>([])

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
      currentKm: null,
      startDisplacement: null,
      checkList: '',
      reason: '',
      observation: '',
      idDriver: '',
      idVehicle: '',
      idClient: '',
    },
  })

  useEffect(() => {
    fetchClients({ setClientList })
    fetchDrivers({ setDriverList })
    fetchVehicles({ setVehiclesList })
  }, [])

  const handleSubmitData = (data: createDisplacementFormInterface) => {
    console.log(data.startDisplacement)
    api
      .post('/deslocamento/iniciardeslocamento', {
        kmInicial: data.currentKm,
        inicioDeslocamento: data.startDisplacement,
        checkList: data.checkList,
        motivo: data.reason,
        observacao: data.observation,
        idCondutor: data.idDriver,
        idVeiculo: data.idVehicle,
        idCliente: data.idClient,
      })
      .then(() => {
        toast.success('Novo deslocamento criado!')
        reset()
        fetchDisplacement()
        handleCloseModal()
      })
  }

  return (
    <Modal closeModal={handleCloseModal} openModal={openModal}>
      <div className="flex items-start justify-between">
        <Typography className="font-bold text-blue-primary xs:text-xl md:text-2xl">
          Criar um novo deslocamento
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
            <Label title="KM Inicial" />
            <Input
              {...register('currentKm', { required: true })}
              placeholder="Digite o KM Inicial"
              type="number"
            />
            {errors.currentKm && (
              <span className="text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className=" flex w-full flex-col gap-2">
            <Label title="Inicio do Deslocamento" htmlFor="currentKm" />
            <InputDateTime
              {...register('startDisplacement', { required: true })}
              control={control}
              value={watch('startDisplacement')}
              name="startDisplacement"
              label="Data"
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-2 xs:flex-col lg:flex-row">
          <div className="flex w-full flex-col gap-2">
            <Label title="Motivos" htmlFor="reason" />
            <TextArea
              {...register('reason', { required: true })}
              placeholder="Digite o motivo do deslocamento"
              name="reason"
              id="reason"
              onChange={(event) => {
                setValue('reason', event.target.value)
              }}
            />
            {errors.reason && (
              <span className=" text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
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
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label title="Checklist" htmlFor="reason" />
          <TextArea
            {...register('reason', { required: true })}
            placeholder="Digite o checklist"
            name="checkList"
            id="checkList"
            onChange={(event) => {
              setValue('checkList', event.target.value)
            }}
          />
          {errors.checkList && (
            <span className=" text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
        </div>
        <div className="mt-2">
          <Label title="Selecione o Cliente" />
          <Select
            {...register('idClient', {
              required: true,
            })}
            value={watch('idClient')}
            onChange={(event) => {
              setValue('idClient', event.target.value)
            }}
          >
            {clientList &&
              clientList.map((data) => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.nome}
                  </MenuItem>
                )
              })}
          </Select>
          {errors.idClient && (
            <span className=" text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
        </div>
        <div className="mt-2">
          <Label title="Selecione o Veículo" />
          <Select
            {...register('idVehicle', {
              required: true,
            })}
            value={watch('idVehicle')}
            onChange={(event) => {
              setValue('idVehicle', event.target.value)
            }}
          >
            {vehiclesList &&
              vehiclesList.map((data) => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.placa}
                  </MenuItem>
                )
              })}
          </Select>
          {errors.idVehicle && (
            <span className="-mt-3 mb-2 text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
        </div>
        <div className="mt-2">
          <Label title="Selecione o Condutor" />
          <Select
            {...register('idDriver', {
              required: true,
            })}
            value={watch('idDriver')}
            onChange={(event) => {
              setValue('idDriver', event.target.value)
            }}
          >
            {driverList &&
              driverList.map((data) => {
                return (
                  <MenuItem key={data.id} value={data.id}>
                    {data.nome}
                  </MenuItem>
                )
              })}
          </Select>
          {errors.idDriver && (
            <span className=" text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
        </div>
        <div className="mt-8 flex w-full justify-center">
          <Button
            className="xs:w-full lg:w-1/3"
            title="Criar deslocamento"
            type="submit"
            icon={<PaperPlaneRight />}
          />
        </div>
      </form>
    </Modal>
  )
}
