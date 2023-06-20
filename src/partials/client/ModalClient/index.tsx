import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Label } from '../../../components/Label'
import { InputMaskRG } from '../../../components/InputMaskRG'
import { InputMaskCPF } from '../../../components/InputMaskCPF'
import { Select } from '../../../components/Select'
import { Modal } from '../../../components/Modal'
import { SelectDocumentData } from '../../../data/SelectDocumentData'
import { CityStateListProps, ModalClientProps, UfListProps } from './interface'
import { Alert, MenuItem, SelectChangeEvent, Typography } from '@mui/material'
import { PaperPlaneRight, X } from '@phosphor-icons/react'

export function ModalClient({ handleCloseModal, openModal }: ModalClientProps) {
  const [ufList, setUfList] = useState<UfListProps[]>([])
  const [cityStateList, setCityStateList] = useState<CityStateListProps[]>([])
  const [documentOption, setDocumentOption] = useState('')
  const [ufOption, setUfOption] = useState('')
  const [cityStateOption, setCityStateOption] = useState('')

  const fetchUF = () => {
    axios
      .get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
      )
      .then((response) => {
        setUfList(response.data)
      })
      .catch(() => <Alert severity="error">Algo deu Errado!</Alert>)
  }

  const fetchCityState = (UF: string) => {
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios?orderBy=nome`,
      )
      .then((response) => {
        setCityStateList(response.data)
      })
      .catch(() => <Alert severity="error">Algo deu Errado!</Alert>)
  }

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
    fetchUF()
    fetchCityState(ufOption)
  }, [ufOption])

  return (
    <Modal closeModal={handleCloseModal} openModal={openModal}>
      <div className="flex items-start justify-between">
        <Typography className="text-2xl font-bold text-blue-primary xs:text-sm">
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
          <div className="flex  w-full gap-4">
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
              ) : (
                <InputMaskCPF id="document" name="document" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
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
              className="w-1/2"
              title="Enviar"
              icon={<PaperPlaneRight />}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}
