'use client';
import { MenuBanner } from '../components/MenuBanner';
import { MenuBannersData } from '../data/MenuBannersData';

export default function App() {
  return (
    <div className="w-screen">
      <div className="mt-28 flex flex-col gap-8 xs:px-4 lg:px-30 xl:px-60">
        <div className="gap-4 w-full justify-center xs:flex xs:flex-col md:grid md:grid-cols-2 xs:mb-28 lg:mb-0">
          {MenuBannersData.map((data) => (
            <MenuBanner
              key={data.title}
              description={data.description}
              image={data.image}
              title={data.title}
              route={data.route}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
