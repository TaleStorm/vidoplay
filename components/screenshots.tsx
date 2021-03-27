import ScreenshotsSlider from '../components/screenshotsSlider'

import { ScreenshotsData } from '../interfaces'

type ScreenshotsProps = ScreenshotsData

const Screenshots = (data: ScreenshotsProps) => (
    <div className="py-10">
        <div className="mb-10 mt-10">
            <h4 className="font-roboto text-mainText font-normal text-3xl block mb-5">
                Кадры из фильма "В яблочко! Парни - лучники"
            </h4>
            <ScreenshotsSlider screenshots={data.screenshots[0]} />
        </div>
    </div>
)

export default Screenshots
