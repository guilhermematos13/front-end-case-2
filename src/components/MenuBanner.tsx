import Image, { StaticImageData } from 'next/image';
import { MenuButton } from './MenuButton';
import { useRouter } from 'next/navigation';

interface MenuBannerProps {
  title: string;
  image: StaticImageData;
  description: string;
  route: string;
}

export function MenuBanner({
  title,
  image,
  description,
  route
}: MenuBannerProps) {
  const Route = useRouter();

  return (
    <div className="p-6 flex flex-col items-center justify-center bg-gray-200 rounded-md xs:w-full">
      <Image src={image} alt="" className="w-20 h-20" />
      <strong className="text-2xl text-green-primary mt-6">{title}</strong>
      <p className="mt-3 text-center mb-6">{description}</p>
      <MenuButton
        onClick={() => {
          Route.push(`${route}`);
        }}
        title={`Detalhes ${title}`}
      />
    </div>
  );
}
