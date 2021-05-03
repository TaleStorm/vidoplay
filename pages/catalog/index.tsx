import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FilmCategory from "../../components/filmCategory"
import FilmCategorySliderCard from "../../components/filmCategorySliderCard"
import useDebounce from "../../components/hooks/useDebounce"
import Checkbox from "../../components/inputs/checkbox"
import CheckboxDropdown from "../../components/inputs/checkboxDropdown"
import Dropdown from "../../components/inputs/dropdown"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

const IndexPage = ({playlists, movies}) => {


    const [years, setYears] =  useState(["Любой"])
    const [year, setYear] = useState(years[0])
    




    const moviesArr = movies.reduce((acc, arr) => acc = [...arr, ...acc])

    const postQueryMovies = () => {
        return moviesArr
    }

    const [displayedMovies, setDisplayedMovies] = useState(postQueryMovies())
    
    const fetchedCountries = moviesArr.map(movie => movie.contry.map(contry => contry.value)).reduce((acc, name) => [...acc, ...name] )
    const countriesSet = new Set(fetchedCountries)
    const countries = ["Все страны", ...countriesSet]
    const [country, setCountry] = useState(countries[0])

    const fetchedGenres = moviesArr.map(movie => movie.gener).reduce((acc, geners) => [...acc, ...geners]).map(gener => gener.value)
    const genersSet = new Set(fetchedGenres)
    const genres = ["Любой", ...genersSet]
    const [genre, setGenre] = useState(genres[0])

    const sorts = ["По популярности", "По рейтингу"]
    const [sort, setSort] = useState(sorts[0])
    
    const fetchedLanguages = moviesArr.map(movie => movie.localization).reduce((acc, locale) => [...acc, ...locale]).map(locale => locale.value)
    const languagesSet = new Set(fetchedLanguages)
    const languages = [...languagesSet,"На всех языках"]
    const [activeLanguages, setActiveLanguages] = useState(["На всех языках"])




    //Не оставляем массив языков пустым!
    useEffect(() => {
        if (activeLanguages.length === 0) {
            setActiveLanguages(["На всех языках"])
        }
    }, [activeLanguages])



    const [isFilms, setIsFilms] = useState(false)
    const [isSeries, setIsSeries] = useState(false)
    const [isPacks, setIsPacks] = useState(false)

    const [searchQuery, setSearchQuery] = useState({
        year,
        genre,
        country,
        sort,
        languages: activeLanguages,
        isFilms,
        isSeries,
    })

    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    //Формируем поисковый запрос из стейтов
    useEffect(() => {
        setSearchQuery({
            year,
            genre,
            country,
            sort,
            languages: activeLanguages,
            isFilms,
            isSeries,
        })
    }, [year, country, sort, activeLanguages, genre, isFilms, isSeries])

    //Подаем запрос при маунте компонента 
    useEffect(() => {
        console.log(searchQuery)
    }, [debouncedSearchQuery])



    return (
            <div className="w-full">
                    <div className={`w-full flex-col md:flex-row  flex justify-between flex-wrap -mt-5`}>
                        <div className={`w-auto md:flex flex-wrap grid grid-cols-2 gap-y-5 gap-x-4 md:gap-y-2 md:gap-x-0 mb-5`}>
                        <div className={`mr-5 md:w-36 w-full`}>
                            <div className={`mb-3`}>
                                Год
                         </div>
                            <Dropdown datas={years} state={year} setState={setYear} />
                        </div>
                        <div className={`md:w-44 w-full mr-5`}>
                            <div className={`mb-3`}>
                                Страна
                        </div>
                            <Dropdown datas={countries} state={country} setState={setCountry} />
                        </div>
                        <div className={`md:w-48 w-full mr-5 col-span-2`}>
                            <div className={`mb-3`}>
                                Жанр
                        </div>
                            <Dropdown datas={genres} state={genre} setState={setGenre} />
                        </div>
                        <div className={`mr-5 md:w-48 col-span-2 w-full`}>
                            <div className={`mb-3`}>
                                Сортировка
                            </div>
                            <Dropdown datas={sorts} state={sort} setState={setSort} />
                        </div>
                        <div className={`md:w-44 mr-5 w-full col-span-2`}>
                            <div className={`mb-3`}>
                                Язык
                            </div>
                            <CheckboxDropdown datas={languages} state={activeLanguages} setState={setActiveLanguages} resetState={"На всех языках"} />
                        </div>
                        </div>
                        <div className={`flex items-center mt-3 w-auto`}>
                        <label className={`flex-shrink-0 w-auto flex items-center md:mr-7 mr-4 `}>
                            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
                                <Checkbox state={isSeries} setState={setIsSeries} />
                            </div>
                            <div className={``}>
                                Фильмы
                            </div>
                        </label>
                        <label className={`flex-shrink-0 w-auto flex items-center md:mr-7 mr-4`}>
                            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
                            <Checkbox state={isFilms} setState={setIsFilms} />
                            </div>
                            <div className={``}>
                            Сериалы
                            </div>
                        </label>
                        <label className={`flex-shrink-0 w-auto /flex items-center hidden`}>
                            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
                                <Checkbox state={isPacks} setState={setIsPacks} />
                            </div>
                            <div className={``}>
                            Подборки
                            </div>

                        </label>
                        </div>
                    </div>
                    <div className={`w-full mt-18 grid grid-cols-1`}>
                    <div className={`grid grid-cols-3 gap-8`}>
                    {displayedMovies.map(movie => {
                        return (
                            <div className={`h-full w-full`}>
                                <FilmCategorySliderCard {...movie}/>
                            </div>
                        )
                    })}
                    </div>
                    </div>
                </div>
    )

}

export default IndexPage

export async function getServerSideProps(ctx) {

    const playlists = await ApiReq.getEntities("playlists")
    const movies = []
    for (let playlist of playlists) {
      const result = await ApiReq.getPlaylistMoves(playlist._id)
      movies.push(result.data)
      }
    console.log(movies)
    return { 
      props: { playlists, movies, query: ctx.query }
    }
  }
  