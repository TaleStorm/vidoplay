import ScreenshotsSlider from '../components/screenshotsSlider'

import { ScreenshotsData } from '../interfaces'

type ScreenshotsProps = ScreenshotsData

const Screenshots = (data: ScreenshotsProps) => (
    <div className="py-10 grid grid-cols-1">
        <div className="mb-10 mt-10">
            <h4 className="font-roboto text-mainText font-normal text-3xl block mb-5">
                Кадры из фильма "{data.name}"
            </h4>
            <ScreenshotsSlider screenshots={data.screenshots} />
        </div>
    </div>
)

export default Screenshots
