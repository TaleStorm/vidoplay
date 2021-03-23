import SeriesSlider from '../components/seriesSlider'

import { SeriesData } from '../interfaces'

type SeriesProps = SeriesData

const Series = (data: SeriesProps) => (
    <div>
        <div className="mb-7 mt-10">

            <div className={"flex items-center px-2 mr-2 mb-2 text-black-900 border-b-2 border-orange inline w-16"}>
                <p className="text-sm">
                    1 сезон
                </p>
            </div>

            <br />
            <SeriesSlider series={data.series[0]} />
        </div>
    </div>
)

export default Series
