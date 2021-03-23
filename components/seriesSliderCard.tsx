import Image from 'next/image'

import { SeriesSliderCardData } from '../interfaces'

type SeriesSliderCardProps = SeriesSliderCardData

const SeriesSliderCard = (data: SeriesSliderCardProps) => (
  	<div className="bg-cardBackground w-full relative">
		<a href="/films/testdorama">
			<div className={`h-32 bg-cover bg-center relative`}> 
				<Image
					src={`/images/dorama.png`}
					alt="Picture of the film"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</a>
		<div className="my-3">
			<p className="text-lg font-roboto font-medium text-mainText mx-4 mb-2">
				Серия {data.id+1}
			</p>
			<p className="text-sm font-roboto text-mainText mx-4 opacity-70 pb-5">
				{data.videoLength} минут
			</p>
		</div>
    </div>
)

export default SeriesSliderCard

