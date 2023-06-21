import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { Modal } from '../../../components/Modal'
import { DriverFormInterface, ModalDriverProps } from './interface'
import { MenuItem, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateField } from '@mui/x-date-pickers/DateField'
import { ptBR } from 'date-fns/locale'

import { Controller, useForm } from 'react-hook-form'
import { Select } from '../../../components/Select'
import { SelectDriverDocumentData } from '../../../data/SelectDriverDocumentData'
import { Button } from '../../../components/Button'

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
    formState: { errors },
  } = useForm({
    defaultValues: {
      driverDocument: '',
      name: '',
      documentNumber: '',
      licenseExpirationDate: '',
    },
  })

  const handleSubmitData = (data: DriverFormInterface) => {
    console.log(data)
  }

  return (
    <Modal closeModal={handleCloseModal} openModal={openModal}>
      <div className="flex items-start justify-between">
        <Typography className="font-bold text-blue-primary xs:text-xl md:text-2xl">
          Criar novo Cliente
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
              <span className="-mt-3 mb-2 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label title="Categoria da Habilitação" htmlFor="" />
            <Select
              {...register('driverDocument', {
                required: 'Esse Campo é Obrigatório',
              })}
              value={watch('driverDocument')}
              onChange={(event) =>
                setValue('driverDocument', event.target.value)
              }
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
              <span className="-mt-3 mb-2 text-xs text-red-500">
                Esse campo é obrigatório
              </span>
            )}
          </div>
          <div className="w-full items-center justify-center gap-4 xs:flex xs:flex-col lg:grid lg:grid-cols-2">
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
                <span className="-mt-3 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Label title="Vencimento da Habilitação" htmlFor="date" />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <Controller
                  name="licenseExpirationDate"
                  control={control}
                  render={({ field }) => (
                    <DemoContainer
                      {...field}
                      components={['DateField', 'DateField']}
                    >
                      <DateField
                        {...register('licenseExpirationDate', {
                          required: true,
                        })}
                        id="date"
                        className="-mt-1 mb-4 w-full rounded-lg border-transparent bg-slate-100 text-gray-950 outline-none placeholder:text-gray-600 hover:border-gray-950 focus:border focus:border-blue-primary"
                      />
                    </DemoContainer>
                  )}
                />
              </LocalizationProvider>
              {errors.licenseExpirationDate && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <Button
              className="xs:w-full lg:w-1/3"
              title="Enviar"
              type="submit"
              icon={<PaperPlaneRight />}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
