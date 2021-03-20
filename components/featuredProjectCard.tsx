// import Link from "next/link";
// import Image from "next/image";
import Tag from '../components/tag'
import { FeaturedProjectData } from '../interfaces'

type FeaturedProjectCardProps = FeaturedProjectData

const FeaturedProjectCard = (data: FeaturedProjectCardProps) => (
  <div className="bg-white p-3 rounded w-full">
      <div>
        <div className={"bg-cover bg-center bg-gray-300 h-72 rounded bg-" + data.image}>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-xl text-bold tracking-wide text-gray-600 mb-2">
          {data.name}
        </p>
        <p className="text-sm text-gray-600">
          {data.description}
        </p>
      </div>
      <div className="flex flex-row py-3 justify-start flex-wrap">
        {data.tags.map((name, i) => {    
          return <Tag key={i} name={name} />
        })}
      </div>
    </div>
)

export default FeaturedProjectCard

