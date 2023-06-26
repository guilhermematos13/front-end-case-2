import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { Modal } from '../../../components/Modal'
import { DriverFormInterface, ModalDriverProps } from './interface'
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'

import { useForm } from 'react-hook-form'
import { Select } from '../../../components/Select'
import { SelectDriverDocumentData } from '../../../data/SelectDriverDocumentData'
import { Button } from '../../../components/Button'
import { InputDate } from '../../../components/InputDate'
import { api } from '../../../services/api'
import { toast } from 'react-hot-toast'

export function ModalDrivers({
  handleCloseModal,
  openModal,
  fetchDriver,
}: ModalDriverProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      driverDocument: [],
      name: '',
      documentNumber: '',
      licenseExpirationDate: new Date(),
    },
  })

  const handleSubmitData = (data: DriverFormInterface) => {
    api
      .post('/condutor', {
        nome: data.name,
        numeroHabilitacao: data.documentNumber,
        categoriaHabilitacao: data.driverDocument.toString(),
        vencimentoHabilitacao: data.licenseExpirationDate,
      })
      .then(() => {
        handleCloseModal()
        fetchDriver()
        reset()
        toast.success('Condutor criado com sucesso!')
      })
      .catch(() => {
        toast.error('Algo deu errado!')
      })
  }

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event
    setValue(
      'driverDocument',
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <Modal closeModal={handleCloseModal} openModal={openModal}>
      <div className="flex items-start justify-between">
        <Typography className="font-bold text-blue-primary xs:text-xl md:text-2xl">
          Criar novo Condutor
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
            <Label title="Nome" htmlFor="name" />
            <Input
              {...register('name', { required: true })}
              name="name"
              id="name"
              placeholder="Digite o nome do Condutor"
              onChange={(event) => {
                setValue('name', event.target.value)
              }}
            />
            {errors.name && (
              <span className="mb-2 mt-1 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label title="Categoria da Habilitação" htmlFor="" />
            {watch('driverDocument').length > 0 && (
              <div className="mb-1 mt-2 flex items-center gap-1 rounded-md border border-blue-primary p-2">
                <strong>Categorias Selecionadas: </strong>
                <div className="flex gap-1">
                  {watch('driverDocument').map((category) => (
                    <span
                      key={category}
                      className="rounded-md bg-blue-primary px-2 py-1 text-slate-100"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <Select
              isMultiple
              {...register('driverDocument', {
                required: 'Esse Campo é Obrigatório',
              })}
              value={watch('driverDocument')}
              onChange={handleChange}
            >
              {SelectDriverDocumentData.map((data) => {
                return (
                  <MenuItem key={data.label} value={data.value}>
                    {data.label}
                  </MenuItem>
                )
              })}
            </Select>
            {errors.driverDocument && (
              <span className="mb-2 mt-1 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="w-full items-start gap-4 xs:flex xs:flex-col lg:grid lg:grid-cols-2">
            <div className="flex w-full flex-col">
              <Label title="N° da Habilitação" htmlFor="documentNumber" />
              <Input
                {...register('documentNumber', { required: true })}
                id="documentNumber"
                name="documentNumber"
                type="number"
                onChange={(event) => {
                  setValue('documentNumber', event.target.value)
                }}
                placeholder="Digite o Número da Habilitação"
              />
              {errors.documentNumber && (
                <span className="mt-1 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex flex-col">
                <Label title="Vencimento da Habilitação" htmlFor="date" />
                <InputDate
                  value={watch('licenseExpirationDate')}
                  control={control}
                  name="licenseExpirationDate"
                  label="Data"
                />
              </div>
              {errors.licenseExpirationDate && (
                <span className="mb-2 mt-1 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <Button
              className="xs:w-full lg:w-1/3"
              title="Adicionar novo Condutor"
              type="submit"
              icon={<PaperPlaneRight />}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
