import FilmCategorySlider from '../components/filmCategorySlider'

import { FilmCategoryData } from '../interfaces'

type FilmCategoryProps = FilmCategoryData

const FilmCategory = (data: FilmCategoryProps) => (
    <div>
        <div className="flex justify-between items-center mb-7">

            <h2 className="font-roboto text-mainText font-medium text-3xl">
                {data.name} 
            </h2>

            <nav className="flex justify-end inline">
                <a href="#" className="text-sm text-base hover:text-gray-900 ml-5">
                    <h4 className="font-roboto text-orange font-normal text-base inline">
                        Посмотреть все
                    </h4>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                        <path d="M3.90625 12.5H21.0938" stroke="#F8634A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.0625 5.46875L21.0938 12.5L14.0625 19.5312" stroke="#F8634A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </nav>
        </div>

        <FilmCategorySlider cards={data.cards} cardToShow={data.cardToShow}/>



    </div>
)

export default FilmCategory
