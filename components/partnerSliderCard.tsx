import Image from 'next/image'
import Link from 'next/link'
import Tag from '../components/tag'

import { FilmCategorySliderCardData, PartnerSliderCardData } from '../interfaces'
import FilmCardLanguages from './filmCards/flimCardLanguages'

type PartnerSliderCardProps = PartnerSliderCardData

const PartnerSliderCard = (data: PartnerSliderCardProps) => (
  <a >
    <div className="bg-cardBackground partner-card relative cursor-pointer ">
      <div className="partner-image h-48 bg-cover bg-center overflow-hidden rounded-lg">
        <img
          src={data.image}
          alt="Picture of the film"
          className="z-0 bg-gradient-to-t from-black-500"
        />
        <div className="absolute w-full h-full top-0 z-10 bottomFade"/>
      </div>
      <div className="absolute w-full h-full top-0 z-10">
        <div className="absolute top-0 right-0 h-8 sm:h-12 px-5 mx-autoflex flex flex-wrap content-center bg-filmInfoBackground">
          <h1 className="text-lg font-roboto font-medium text-mainText">
            +{data.age}
          </h1>
        </div>
        <div className="absolute bottom-0 px-4 pb-2 ">
          <p className="text-md sm:text-xl font-roboto font-medium text-mainText">
            {data.title}
          </p>
          <p className="text-sm sm:text-md font-roboto font-medium text-secondaryText">
            {data.discription}
          </p>
        </div>
      </div>
    </div>
  </a>
)

export default PartnerSliderCard

