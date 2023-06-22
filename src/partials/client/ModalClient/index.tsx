import { useEffect, useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { InputMaskRG } from '../../../components/InputMaskRG'
import { InputMaskCPF } from '../../../components/InputMaskCPF'
import { Select } from '../../../components/Select'
import { Modal } from '../../../components/Modal'
import { SelectDocumentData } from '../../../data/SelectDocumentData'
import { CityListProps, ModalClientProps, UfListProps } from './interface'
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { InputMaskCNPJ } from '../../../components/InputMaskCNPJ'
import { fetchCity, fetchUF } from '../../../services/requests/clients'
import { useForm } from 'react-hook-form'
import { api } from '../../../services/api'
import { ClientFormInterface } from '../../../services/requests/clients/interface'
import { toast } from 'react-hot-toast'

export function ModalClient({
  handleCloseModal,
  openModal,
  fetchClients,
}: ModalClientProps) {
  const [ufList, setUfList] = useState<UfListProps[]>([])
  const [cityList, setCityList] = useState<CityListProps[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      document: '',
      uf: '',
      name: '',
      documentType: '',
      city: '',
      neighborhood: '',
      address: '',
      number: '',
    },
  })

  const handleSubmitData = (data: ClientFormInterface) => {
    api
      .post('/cliente', {
        numeroDocumento: data.document,
        tipoDocumento: data.documentType,
        nome: data.name,
        logradouro: data.address,
        numero: data.number,
        bairro: data.neighborhood,
        cidade: data.city,
        uf: data.uf,
      })
      .then(() => {
        toast.success('Novo cliente criado!')
        reset()
        fetchClients()
        handleCloseModal()
      })
  }

  useEffect(() => {
    fetchUF({ setUfList })
  }, [setUfList])

  const getCity = (uf: string) => {
    fetchCity({ ufOption: uf, setCityList })
  }

  const saveDocument = (event: SelectChangeEvent) => {
    setValue('document', event.target.value)
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
      <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
        <div className="flex w-full flex-col">
          <Label title="Nome:" htmlFor="name" />
          <Input
            placeholder="Digite o nome do Cliente"
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
              {errors.documentType && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Label title="Número do Documento:" htmlFor="document" />
              {watch('documentType') === 'RG' ? (
                <InputMaskRG
                  id="document"
                  name="document"
                  {...register('document', {
                    required: 'Esse campo é obrigatório',
                  })}
                  onChange={saveDocument}
                />
              ) : watch('documentType') === 'CPF' ? (
                <InputMaskCPF
                  id="document"
                  name="document"
                  {...register('document', {
                    required: 'Esse campo é obrigatório',
                  })}
                  onChange={saveDocument}
                />
              ) : watch('documentType') === 'CNPJ' ? (
                <InputMaskCNPJ
                  id="document"
                  name="document"
                  {...register('document', {
                    required: 'Esse campo é obrigatório',
                  })}
                  onChange={saveDocument}
                />
              ) : (
                <Input
                  {...register('document', {
                    required: 'Esse campo é obrigatório',
                  })}
                  id="document"
                  name="document"
                  placeholder="Digite Documento do Cliente"
                  onChange={saveDocument}
                />
              )}
              {errors.document && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
          </div>
          <div className="gap-2 xs:flex xs:flex-col md:grid md:grid-cols-3">
            <div className="flex flex-col">
              <Label title="UF:" />
              <Select
                {...register('uf', { required: 'Esse Campo é Obrigatório' })}
                value={watch('uf')}
                onChange={(event) => {
                  setValue('uf', event.target.value)
                  getCity(event.target.value)
                }}
              >
                {ufList.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.sigla}>
                      {data.sigla}
                    </MenuItem>
                  )
                })}
              </Select>
              {errors.uf && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Label title="Cidade:" />
              <Select
                {...register('city', {
                  required: 'Esse Campo é Obrigatório',
                })}
                value={watch('city')}
                onChange={(event) => setValue('city', event.target.value)}
              >
                {cityList.map((data) => {
                  return (
                    <MenuItem key={data.id} value={data.nome}>
                      {data.nome}
                    </MenuItem>
                  )
                })}
              </Select>
              {errors.city && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <Label title="Bairro:" htmlFor="city" />
              <Input
                placeholder="Digite o Bairro do Cliente"
                id="city"
                {...register('neighborhood', {
                  required: 'Esse campo é obrigatório',
                })}
                onChange={(event) => {
                  setValue('neighborhood', event.target.value)
                }}
              />
              {errors.neighborhood && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
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
              {errors.address && (
                <span className="-mt-3 mb-2 text-xs text-red-500">
                  Esse campo é obrigatório
                </span>
              )}
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
              {errors.number && (
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
