import Image from 'next/image'

import { ScreenshotsSliderCardData } from '../interfaces'

type ScreenshotsSliderCardProps = ScreenshotsSliderCardData

const ScreenshotsSliderCard = (data: ScreenshotsSliderCardProps) => (
  	<div className="bg-cardBackground w-full relative">
		<a href="/films/testdorama">
			<div className={`h-32 bg-cover bg-center relative`}> 
				<Image
					src={`${data.image}`}
					alt="Picture of the film"
					layout="fill"
					objectFit="cover"
				/>
			</div>
		</a>
    </div>
)

export default ScreenshotsSliderCard

