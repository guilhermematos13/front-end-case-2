'use client'
import { MenuBanner } from '../components/MenuBanner'
import { MenuBannersData } from '../data/MenuBannersData'

export default function App() {
  return (
    <div className="w-screen">
      <div className="lg:px-30 mt-28 flex flex-col gap-8 xs:px-4 xl:px-60">
        <div className="w-full justify-center gap-4 xs:mb-28 xs:flex xs:flex-col md:grid md:grid-cols-2 lg:mb-0">
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
  )
}
