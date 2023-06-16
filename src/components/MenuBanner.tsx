import Image, { StaticImageData } from 'next/image';
import { MenuButton } from './MenuButton';

interface MenuBannerProps {
  title: string;
  image: StaticImageData;
  description: string;
}

export function MenuBanner({ title, image, description }: MenuBannerProps) {
  return (
    <div className="w-1/3 p-6 flex flex-col items-center justify-center bg-gray-200 rounded-md xs:w-full lg:w-1/3">
      <Image src={image} alt="" className="w-20 h-20" />
      <strong className="text-2xl text-green-primary mt-6">{title}</strong>
      <p className="mt-3 text-center mb-6">{description}</p>
      <MenuButton title={`Detalhes ${title}`} />
    </div>
  );
}
