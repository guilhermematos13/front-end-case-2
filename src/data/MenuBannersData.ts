import { StaticImageData } from 'next/image'
import ClientPhoto from '../../public/client.png'
import CarPhoto from '../../public/car.png'
import DriverPhoto from '../../public/driver.png'
import RoadPhoto from '../../public/road.png'

interface MenuBannersDataProps {
  title: string
  image: StaticImageData
  route: string
  description: string
}

export const MenuBannersData: MenuBannersDataProps[] = [
  {
    title: 'Clientes',
    image: ClientPhoto,
    description:
      'Os clientes são a base de qualquer negócio, representando aqueles que buscam produtos e serviços para atender às suas necessidades. Eles são indivíduos ou organizações em busca de soluções, conveniência e qualidade.',
    route: '/clients',
  },
  {
    title: 'Condutores',
    image: DriverPhoto,
    description:
      'Os condutores são indivíduos responsáveis ​​pela operação e condução segura de veículos, como carros, ônibus ou caminhões. Eles possuem as técnicas necessárias para garantir a segurança no transporte de mercadorias.',
    route: '/drivers',
  },
  {
    title: 'Veiculos',
    image: CarPhoto,
    description:
      'Veículos são meios de transporte que proporcionam mobilidade e transporte de pessoas e/ou carga. Eles vêm em diferentes formas, como carros, caminhões, motocicletas, bicicletas, ônibus e trens, entre outros.',
    route: '/vehicles',
  },
  {
    title: 'Deslocamentos',
    image: RoadPhoto,
    description:
      'Deslocamentos referem-se aos movimentos físicos de pessoas ou objetos de um local para outro. Essas viagens podem ser realizadas por diversos meios de transporte, como veículos, transporte público, bicicletas ou a pé.',
    route: '/displacements',
  },
]
