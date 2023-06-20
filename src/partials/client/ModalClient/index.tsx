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
import { MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'
import { InputMaskCNPJ } from '../../../components/InputMaskCNPJ'
import { fetchCityState, fetchUF } from '../../../services/requests/clients'

export function ModalClient({ handleCloseModal, openModal }: ModalClientProps) {
  const [ufList, setUfList] = useState<UfListProps[]>([])
  const [cityStateList, setCityStateList] = useState<CityStateListProps[]>([])
  const [documentOption, setDocumentOption] = useState('')
  const [ufOption, setUfOption] = useState('')
  const [cityStateOption, setCityStateOption] = useState('')

  function handleChangeSelectDocumentOption(event: SelectChangeEvent) {
    setDocumentOption(event.target.value)
  }

  function handleChangeSelectUfOption(event: SelectChangeEvent) {
    setUfOption(event.target.value)
  }

  function handleChangeSelectCityStateOption(event: SelectChangeEvent) {
    setCityStateOption(event.target.value)
  }

  useEffect(() => {
    fetchUF({ setUfList })
    fetchCityState({ ufOption, setCityStateList })
  }, [setUfList, ufOption])

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
      <form>
        <div className="flex w-full flex-col">
          <Label title="Nome:" htmlFor="name" />
          <Input placeholder="Digite seu nome" id="name" />
          <div className="flex  w-full gap-4 xs:flex-col xl:flex-row">
            <div className="flex flex-1 flex-col">
              <Label title="Selecione o Documento:" htmlFor="document" />
              <Select
                value={documentOption}
                onChange={handleChangeSelectDocumentOption}
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
              {documentOption === 'RG' ? (
                <InputMaskRG id="document" name="document" />
              ) : documentOption === 'CPF' ? (
                <InputMaskCPF id="document" name="document" />
              ) : documentOption === 'CNPJ' ? (
                <InputMaskCNPJ id="document" name="document" />
              ) : (
                <Input
                  id="document"
                  name="document"
                  placeholder="Digite seu Documento"
                />
              )}
            </div>
          </div>
          <div className="gap-2 xs:flex xs:flex-col md:grid md:grid-cols-3">
            <div className="flex flex-col">
              <Label title="UF:" />
              <Select value={ufOption} onChange={handleChangeSelectUfOption}>
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
                value={cityStateOption}
                onChange={handleChangeSelectCityStateOption}
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
              <Input placeholder="Digite seu Bairro" id="cityState" />
            </div>
          </div>
          <div className="flex  w-full gap-4">
            <div className="flex flex-1 flex-col">
              <Label title="Rua:" htmlFor="address" />
              <Input placeholder="Digite sua Rua" id="address" />
            </div>
            <div className="flex w-1/3 flex-col">
              <Label title="Número:" htmlFor="number" />
              <Input placeholder="Digite o número" id="number" />
            </div>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <Button
              onClick={() => {}}
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
