import FilmCategorySlider from '../components/filmCategorySlider'

import { FilmCategoryData } from '../interfaces'

type FilmCategoryProps = FilmCategoryData

const FilmCategory = (data: FilmCategoryProps) => {
    return (<div>
        <div className="flex justify-between items-center mb-4 sm:mb-7">

            <h2 className="font-roboto text-mainText font-medium text-xl sm:text-3xl">
                {data.name} 
            </h2>

            <nav className="hidden sm:flex justify-end md:inline  ">
                <a href={`/${data.stringName}`} className="text-base hover:text-gray-900 ml-5">
                    <h4 className="font-roboto text-orange font-normal text-base inline">
                        Посмотреть все
                    </h4>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                        <path d="M3.90625 12.5H21.0938" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.0625 5.46875L21.0938 12.5L14.0625 19.5312" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
            </nav>
        </div>

        <FilmCategorySlider cards={data.cards} cardToShow={data.cardToShow} sliderIndex={data.sliderIndex}/>
       
        <nav className="flex justify-start pt-3 sm:hidden">
                <a href="#" className="text-base hover:text-gray-900">
                    <h4 className="font-roboto text-orange font-normal text-base inline mr-1.5">
                        Посмотреть все
                    </h4>
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                        <path d="M3.90625 12.5H21.0938" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.0625 5.46875L21.0938 12.5L14.0625 19.5312" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
        </nav>

    </div>
)}

export default FilmCategory
