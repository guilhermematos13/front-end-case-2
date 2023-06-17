import { Header } from '../components/Header';
import { MenuBanner } from '../components/MenuBanner';
import { MenuBannersData } from '../data/MenuBannersData';

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="mt-28 flex flex-col gap-8 xs:px-4 lg:px-30 xl:px-60">
        <div className="gap-4 w-full justify-center xs:flex xs:flex-col md:grid md:grid-cols-2 xs:mb-28 xl:mb-0">
          {MenuBannersData.map((data) => (
            <MenuBanner description={data.description} image={data.image} title={data.title} route={data.route}/>
          ))}
        </div>
      </div>
    </div>
  );
}
