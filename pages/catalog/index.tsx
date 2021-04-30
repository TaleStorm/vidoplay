import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import FilmCategory from "../../components/filmCategory"
import Checkbox from "../../components/inputs/checkbox"
import CheckboxDropdown from "../../components/inputs/checkboxDropdown"
import Dropdown from "../../components/inputs/dropdown"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

const IndexPage = ({playlists, movies}) => {


    const [years, setYears] =  useState(["Любой"])
    const [year, setYear] = useState(years[0])
    


    const moviesArr = movies.reduce((acc, arr) => acc = [...arr, ...acc])
    const fetchedCountries = moviesArr.map(movie => movie.contry)
    const countriesSet = new Set(fetchedCountries)

    const countries = ["Все страны", ...countriesSet]
    const [country, setCountry] = useState(countries[0])

    const fetchedGenres = playlists.map(a => (a.name))
    const genres = ["Любой", ...fetchedGenres]
    const [genre, setGenre] = useState(genres[0])

    const sorts = ["По популярности", "По рейтингу"]
    const [sort, setSort] = useState(sorts[0])

    const languages = ["EN", "RU", "KO", "На всех языках"]
    const [activeLanguages, setActiveLanguages] = useState(["На всех языках"])

    useEffect(() => {
        if (activeLanguages.length === 0) {
            setActiveLanguages(["На всех языках"])
        }
    }, [activeLanguages])

    useEffect(() => {

    },[])

    const [isFilms, setIsFilms] = useState(false)
    const [isSeries, setIsSeries] = useState(false)
    const [isPacks, setIsPacks] = useState(false)


    return (
            <div className="w-full">
                    <div className={`w-full flex justify-between flex-wrap -mt-5`}>
                        <div className={`w-auto flex`}>
                        <div className={`mr-5 w-36`}>
                            <div className={`mb-3`}>
                                Год
                         </div>
                            <Dropdown datas={years} state={year} setState={setYear} />
                        </div>
                        <div className={`w-36 mr-5`}>
                            <div className={`mb-3`}>
                                Страна
                        </div>
                            <Dropdown datas={countries} state={country} setState={setCountry} />
                        </div>
                        <div className={`w-48 mr-5`}>
                            <div className={`mb-3`}>
                                Жанр
                        </div>
                            <Dropdown datas={genres} state={genre} setState={setGenre} />
                        </div>
                        <div className={`mr-5 w-48`}>
                            <div className={`mb-3`}>
                                Сортировка
                            </div>
                            <Dropdown datas={sorts} state={sort} setState={setSort} />
                        </div>
                        <div className={`w-44 mr-5`}>
                            <div className={`mb-3`}>
                                Язык
                            </div>
                            <CheckboxDropdown datas={languages} state={activeLanguages} setState={setActiveLanguages} resetState={"На всех языках"} />
                        </div>
                        </div>
                        <div className={`flex items-center mt-6 w-auto`}>
                        <div className={`flex-shrink-0 w-auto flex items-center mr-7 `}>
                            <div className={`mr-2`}>
                                Фильмы
                            </div>

                            <div className={`w-9 h-9 flex-shrink-0 flex`}>
                                <Checkbox state={isFilms} setState={setIsFilms} />
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-auto flex items-center mr-7`}>
                            <div className={`mr-2`}>
                            Сериалы
                            </div>

                            <div className={`w-9 h-9 flex-shrink-0`}>
                                <Checkbox state={isSeries} setState={setIsSeries} />
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-auto flex items-center`}>
                            <div className={`mr-2`}>
                            Подборки
                            </div>
                            <div className={`w-9 h-9 flex-shrink-0`}>
                            <Checkbox state={isPacks} setState={setIsPacks} />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className={`w-full mt-18`}>
                    {playlists.map((playlist, i) => {
              return (
                <>
                  <FilmCategory
                    key={i}
                    name={playlist.name}
                    stringName={playlist.stringName}
                    cards={movies[i]}
                    cardToShow={2}
                    sliderIndex={i}
                  />
                  {i + 1 === Math.floor(playlists.length / 2) &&
                    <img
                      className = {`w-full rounded-lg mt-10 mb-10`}
                      src={"/images/sosedi.jpg"}
                      alt="Picture of the film"
                    />
                  }
                </>
              )
            })}
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
  