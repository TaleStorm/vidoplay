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
        className={`w-full bg-cardBackground text-white p-4 rounded-lg h-40  flex cursor-pointer`}>
            <div className={`h-full w-60 mr-5 relative flex-shrink-0 rounded-lg`}>
                <Image
                src={image}
                layout="fill"
                alt={title}
                className={`rounded-lg`}
                />
            </div>
            <div className={`overflow-hidden`}>
                <div className={`text-h7 font-medium mb-3`}>
                {title}
                </div>
                <div className={`opacity-70 text-h2-mobile`}>
                {excerpt}
                </div>
            </div>
            <a 
            href={`/soap/${stringName}`}
            className={`flex-shrink-0 ml-5 flex text-orange h-5 items-center cursor-pointer`}>
                Перейти
                <div className={`w-5 h-5 ml-1`}>
                <ArrowIcon/>
                </div>
            </a>

        </a>
    )
}

export default SearchFilmCard