import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { InputMaskRG } from '../../../components/InputMaskRG'
import { InputMaskCPF } from '../../../components/InputMaskCPF'
import { Select } from '../../../components/Select'
import { Modal } from '../../../components/Modal'
import { SelectDocumentData } from '../../../data/SelectDocumentData'
import { CityStateListProps, ModalClientProps, UfListProps } from './interface'
import { MenuItem, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { InputMaskCNPJ } from '../../../components/InputMaskCNPJ'
import { fetchCityState, fetchUF } from '../../../services/requests/clients'
import { useForm } from 'react-hook-form'
import { ClientInterface } from '../../../services/requests/clients/interface'

export function ModalClient({ handleCloseModal, openModal }: ModalClientProps) {
  const [ufList, setUfList] = useState<UfListProps[]>([])
  const [cityStateList, setCityStateList] = useState<CityStateListProps[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const handleSubmitData = (data: any) => {
    console.log(data)
  }

  useEffect(() => {
    fetchUF({ setUfList })
    fetchCityState({ ufOption: watch('UF'), setCityStateList })
  }, [setUfList, watch])

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
      <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
        <div className="flex w-full flex-col">
          <Label title="Nome:" htmlFor="name" />
          <Input
            placeholder="Digite seu nome"
            id="name"
            {...register('name', { required: 'Esse campo é obrigatório' })}
            onChange={(event) => {
              setValue('name', event.target.value)
            }}
          />
          {errors.name && (
            <span className="-mt-3 mb-2 text-xs text-red-500">
              Esse campo é obrigatório
            </span>
          )}
          <div className="flex  w-full gap-4 xs:flex-col xl:flex-row">
            <div className="flex flex-1 flex-col">
              <Label title="Selecione o Documento:" />
              <Select
                {...register('documentType', {
                  required: 'Esse Campo é Obrigatório',
                })}
                value={watch('documentType')}
                onChange={(event) =>
                  setValue('documentType', event.target.value)
                }
              >
                {SelectDocumentData.map((data, index) => {
                  return (
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
            <div className="flex flex-col">
              <Label title="Número do Documento:" htmlFor="document" />
              {watch('documentType') === 'RG' ? (
                <InputMaskRG id="document" name="document" />
              ) : watch('documentType') === 'CPF' ? (
                <InputMaskCPF id="document" name="document" />
              ) : watch('documentType') === 'CNPJ' ? (
                <InputMaskCNPJ id="document" name="document" />
              ) : (
                <Input
                  id="document"
                  name="document"
                  placeholder="Digite seu Documento"
                  onChange={(event) => {
                    setValue('document', event.target.value)
                  }}
                />
              )}
            </div>
          </div>
          <div className="gap-2 xs:flex xs:flex-col md:grid md:grid-cols-3">
            <div className="flex flex-col">
              <Label title="UF:" />
              <Select
                {...register('UF', { required: 'Esse Campo é Obrigatório' })}
                value={watch('UF')}
                onChange={(event) => setValue('UF', event.target.value)}
              >
                {ufList.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.sigla}>
                      {data.sigla}
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
            <div className="flex flex-col">
              <Label title="Cidade:" />
              <Select
                {...register('cityState', {
                  required: 'Esse Campo é Obrigatório',
                })}
                value={watch('cityState')}
                onChange={(event) => setValue('cityState', event.target.value)}
              >
                {cityStateList.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.nome}>
                      {data.nome}
                    </MenuItem>
                  )
                })}
              </Select>
            </div>
            <div className="flex flex-col">
              <Label title="Bairro:" htmlFor="cityState" />
              <Input
                placeholder="Digite seu Bairro"
                id="cityState"
                {...register('neighborhood', {
                  required: 'Esse campo é obrigatório',
                })}
                onChange={(event) => {
                  setValue('neighborhood', event.target.value)
                }}
              />
            </div>
          </div>
          <div className="flex  w-full gap-4">
            <div className="flex flex-1 flex-col">
              <Label title="Rua:" htmlFor="address" />
              <Input
                placeholder="Digite sua Rua"
                id="address"
                {...register('address', {
                  required: 'Esse campo é obrigatório',
                })}
                onChange={(event) => {
                  setValue('address', event.target.value)
                }}
              />
            </div>
            <div className="flex w-1/3 flex-col">
              <Label title="Número:" htmlFor="number" />
              <Input
                placeholder="Digite o número"
                id="number"
                {...register('number', {
                  required: 'Esse campo é obrigatório',
                })}
                onChange={(event) => {
                  setValue('number', event.target.value)
                }}
              />
            </div>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <Button
              className="w-1/3"
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
