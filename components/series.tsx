import React, { useEffect, useState } from "react";
import SeriesSlider from '../components/seriesSlider'

import { SeriesData } from '../interfaces'

type SeriesProps = SeriesData

export default function Series(data: SeriesProps) {
    const [slider, setSlider] = useState(0)
    const [settings, setSettings] = useState({ space: 15, sliders: 5 })

    const changeSlider = (index) => {
        setSlider(index)
        setSettings({ space: 14, sliders: 5 })
    }


    return (
        <div className="sm:mx-0 sm:py-10">
            <ul className=" flex sm:px-3 mb-3">
                {data.series.map((serie, i) => {
                    return <li key={i} className={i == slider ? "flex active items-center p-2 mr-2 mb-2 border-b-2 border-orange md:inline w-16 flex-shrink-0" : "flex items-center p-2 mr-2 mb-2 border-orange md:inline w-16 flex-shrink-0"}>
                        <a className=" tabLinks text-sm hover:text-orange flex-shrink-0" data-select={i + 1} id={"tabLink" + String(i + 1)} onClick={() => changeSlider(i)}>
                            {i + 1} сезон
                            </a>
                    </li>
                })}
            </ul>
            <div className="content">
                {data.series.map((serie, i) => {
                    return <div key={i} className={i == slider ? "" : "hidden"} >
                        <SeriesSlider slider={slider} series={serie} index={i} sliderInfo={settings} />
                    </div>
                })}
            </div>
        </div>
    );
}