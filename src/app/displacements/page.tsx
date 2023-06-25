'use client'

import { TabsDisplacements } from '../../components/TabsDisplacements'

export default function DisplacementsPage() {
  // const [openModal, setOpenModal] = useState(false)
  // const [displacementsList, setDisplacementsList] = useState([])

  // function handleChangeModal() {
  //   setOpenModal((prev) => !prev)
  // }

  return (
    <div className="mt-20 flex h-screen flex-col px-48 xs:px-4 md:px-10 lg:px-14">
      <div className="mb-6 flex w-full items-center justify-between">
        <h1 className="font-bold text-blue-primary xs:text-base md:text-xl lg:text-3xl">
          Deslocamentos
        </h1>
      </div>
      <div className="w-full border border-blue-primary/50" />
      <TabsDisplacements />
    </div>
  )
}
