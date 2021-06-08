import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import SearchContext from '../context/searchContext'
import ArrowIcon from '../icons/arrowIcon'

const SearchFilmCard = (
    {
    title,
    image,
    excerpt,
    stringName

    }
) => {
    const router = useRouter()
    const {closeSearch} = useContext(SearchContext)
    return (
        <a 
        href={`/soap/${stringName}`}
        className={`w-full bg-cardBackground text-white p-1 md:p-4 rounded-lg md:h-40 h-13 flex cursor-pointer`}>
            <div className={`h-full md:w-60 w-20 mr-5 relative flex-shrink-0 rounded-lg`}>
                <Image
                src={image}
                layout="fill"
                alt={title}
                className={`rounded-lg`}
                />
            </div>
            <div className={`overflow-hidden w-full`}>
                <div className={`md:text-h7 text-h2-mobile font-medium mb-3`}>
                {title}
                </div>
                <div className={`opacity-70 text-h2-mobile hidden md:block`}>
                {excerpt}
                </div>
            </div>
            <a 
            href={`/soap/${stringName}`}
            className={`flex-shrink-0 ml-5 text-orange h-5 items-center cursor-pointer hidden md:flex`}>
                <div>

                </div>
                Перейти
                <div className={`w-5 h-5 ml-1`}>
                <ArrowIcon/>
                </div>
            </a>

        </a>
    )
}

export default SearchFilmCard