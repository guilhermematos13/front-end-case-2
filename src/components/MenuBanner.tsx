import Image, { StaticImageData } from 'next/image'
import { MenuButton } from './MenuButton'
import { useRouter } from 'next/navigation'

interface MenuBannerProps {
  title: string
  image: StaticImageData
  description: string
  route: string
}

export function MenuBanner({
  title,
  image,
  description,
  route,
}: MenuBannerProps) {
  const Route = useRouter()

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-gray-200 p-6 xs:w-full">
      <Image src={image} alt="" className="h-20 w-20" />
      <strong className="mt-6 text-2xl text-green-primary">{title}</strong>
      <p className="mb-6 mt-3 text-center">{description}</p>
      <MenuButton
        onClick={() => {
          Route.push(`${route}`)
        }}
        title={`Detalhes ${title}`}
      />
    </div>
  )
}
