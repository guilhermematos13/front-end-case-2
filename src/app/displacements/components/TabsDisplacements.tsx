import { Tabs, Tab } from '@mui/material'
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { fetchDisplacements } from '../../../services/requests/displacements'
import { displacementInterface } from '../../../services/requests/displacements/interface'
import { Table } from '../../../components/Table'
import { TableHeader } from '../../../components/TableHeader'
import { TableColumn } from '../../../components/TableColumn'
import { Pause, Trash } from '@phosphor-icons/react'
import { TableInDisplacementsData } from '../../../data/TableInDisplacementsData copy'
import { TableFinishDisplacementsData } from '../../../data/TableFinishedDisplacementsData'
import { getFormatDate } from '../../../utils/getFormatDate'
import { SwalAlert } from '../../../components/SwalAlert'

interface TabsDisplacementsInterface {
  handleChangeFinishModal: (setDisplacementId: number) => void
  displacementsList: displacementInterface[]
  setDisplacementsList: Dispatch<SetStateAction<displacementInterface[]>>
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export function TabsDisplacements({
  handleChangeFinishModal,
  displacementsList,
  setDisplacementsList,
  isLoading,
  setIsLoading,
}: TabsDisplacementsInterface) {
  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: number,
  ) => {
    setSelectedTab(newValue)
  }

  function verificationEmpty(isFinished: boolean): boolean {
    const verifyList = displacementsList.filter((displacement) =>
      isFinished
        ? displacement.fimDeslocamento !== null
        : displacement.fimDeslocamento === null,
    )
    return verifyList.length === 0
  }

  function handleDeleteClient(id: number) {
    SwalAlert({
      deleted: 'deslocamento',
      id,
      url: 'deslocamento',
      fetchDelete: async () =>
        fetchDisplacements({ setDisplacementsList, setIsLoading }),
    })
  }

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleChange}>
        <Tab label="Em deslocamento" />
        <Tab label="Deslocamento Finalizado" />
      </Tabs>
      {selectedTab === 0 && (
        <div>
          <Table
            isEmpty={verificationEmpty(false)}
            isLoading={isLoading}
            tHeadChildren={TableInDisplacementsData.map((data, index) => (
              <TableHeader
                key={index}
                title={data.label}
                className="text-center"
              />
            ))}
            tBodyChildren={displacementsList.map(
              (displacement, index) =>
                !displacement.fimDeslocamento && (
                  <tr
                    key={index}
                    className="border-b border-b-gray-600 last-of-type:border-0"
                  >
                    <TableColumn
                      className="text-center"
                      title={displacement.kmInicial}
                    />

                    <TableColumn
                      className="text-center"
                      title={
                        displacement.inicioDeslocamento &&
                        getFormatDate(displacement.inicioDeslocamento)
                      }
                    />

                    <TableColumn
                      className="text-center"
                      title={displacement.checkList}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.motivo}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.observacao}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idCondutor}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idVeiculo}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idCliente}
                    />

                    <TableColumn
                      title={
                        <div className="flex w-full items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              handleChangeFinishModal(displacement.id)
                            }}
                            className="rounded-md border border-red-500 p-2 text-red-500 hover:border-red-800 hover:text-red-800"
                          >
                            <Pause size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteClient(displacement.id)}
                            className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      }
                    />
                  </tr>
                ),
            )}
          />
        </div>
      )}

      {selectedTab === 1 && (
        <div>
          <Table
            isEmpty={verificationEmpty(true)}
            isLoading={isLoading}
            tHeadChildren={TableFinishDisplacementsData.map((data, index) => (
              <TableHeader
                key={index}
                title={data.label}
                className="text-center"
              />
            ))}
            tBodyChildren={displacementsList.map(
              (displacement, index) =>
                displacement.fimDeslocamento && (
                  <tr
                    key={index}
                    className="border-b border-b-gray-600 last-of-type:border-0"
                  >
                    <TableColumn
                      className="text-center"
                      title={displacement.kmInicial}
                    />

                    <TableColumn
                      className="text-center"
                      title={displacement.kmFinal}
                    />

                    <TableColumn
                      className="text-center"
                      title={
                        displacement.inicioDeslocamento &&
                        getFormatDate(displacement.inicioDeslocamento)
                      }
                    />

                    <TableColumn
                      className="text-center"
                      title={
                        displacement.fimDeslocamento &&
                        getFormatDate(displacement.fimDeslocamento)
                      }
                    />

                    <TableColumn
                      className="text-center"
                      title={displacement.checkList}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.motivo}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.observacao}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idCondutor}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idVeiculo}
                    />
                    <TableColumn
                      className="text-center"
                      title={displacement.idCliente}
                    />

                    <TableColumn
                      title={
                        <div className="flex w-full items-center justify-center gap-2">
                          <button
                            onClick={() => handleDeleteClient(displacement.id)}
                            className="rounded-md border border-blue-primary p-2 text-blue-primary hover:border-blue-950 hover:text-blue-900"
                          >
                            <Trash size={20} />
                          </button>
                        </div>
                      }
                    />
                  </tr>
                ),
            )}
          />
        </div>
      )}
    </div>
  )
}
