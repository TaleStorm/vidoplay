import axios from "axios"
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

const IndexPage = ({generCat, contryCat, localCat, yearCat }) => {
  const [years, setYears] = useState(["Любой"])
  const [year, setYear] = useState(yearCat[0])

  const [displayedMovies, setDisplayedMovies] = useState([])

  const [country, setCountry] = useState(contryCat[0])

  const [genre, setGenre] = useState(generCat[0])

  const sorts = ["По популярности", "По рейтингу"]
  const [sort, setSort] = useState(sorts[0])

  const [activeLanguages, setActiveLanguages] = useState([localCat[0]])

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

  const debouncedSearchQuery = useDebounce(searchQuery, 3000)

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

  const getMoviesFromCat = async () => {

    let tmp = {
        localization: activeLanguages,
        country,
        genre,
        year,
        isFilms,
        isSeries,
    }

    const res = await axios.post('/api/categorySearch', tmp)

    setDisplayedMovies(res.data.data)
  }

  //Подаем запрос при маунте компонента
  useEffect(() => {

    getMoviesFromCat()

  }, [debouncedSearchQuery])

  return (
    <div className="w-full">
      <div className={`w-full flex-col md:flex-row  flex justify-between flex-wrap -mt-5`}>
        <div className={`w-auto md:flex flex-wrap grid grid-cols-2 gap-y-5 gap-x-4 md:gap-y-2 md:gap-x-0 mb-5`}>
          <div className={`mr-5 md:w-36 w-full`}>
            <div className={`mb-3`}>Год</div>
            <Dropdown datas={yearCat} state={year} setState={setYear} />
          </div>
          <div className={`md:w-44 w-full mr-5`}>
            <div className={`mb-3`}>Страна</div>
            <Dropdown datas={contryCat} state={country} setState={setCountry} />
          </div>
          <div className={`md:w-48 w-full mr-5 col-span-2`}>
            <div className={`mb-3`}>Жанр</div>
            <Dropdown datas={generCat} state={genre} setState={setGenre} />
          </div>
          <div className={`mr-5 md:w-48 col-span-2 w-full`}>
            <div className={`mb-3`}>Сортировка</div>
            <Dropdown datas={sorts} state={sort} setState={setSort} />
          </div>
          <div className={`md:w-44 mr-5 w-full col-span-2`}>
            <div className={`mb-3`}>Язык</div>
            <CheckboxDropdown
              datas={localCat}
              state={activeLanguages}
              setState={setActiveLanguages}
              resetState={"На всех языках"}
            />
          </div>
        </div>
        <div className={`flex items-center mt-3 w-auto`}>
          <label className={`flex-shrink-0 w-auto flex items-center md:mr-7 mr-4 `}>
            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
              <Checkbox state={isSeries} setState={setIsSeries} />
            </div>
            <div className={``}>Сериалы</div>
          </label>
          <label className={`flex-shrink-0 w-auto flex items-center md:mr-7 mr-4`}>
            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
              <Checkbox state={isFilms} setState={setIsFilms} />
            </div>
            <div className={``}>Фильмы</div>
          </label>
          <label className={`flex-shrink-0 w-auto /flex items-center hidden`}>
            <div className={`md:w-9 md:h-9 w-6 h-6 flex-shrink-0 mr-2`}>
              <Checkbox state={isPacks} setState={setIsPacks} />
            </div>
            <div className={``}>Подборки</div>
          </label>
        </div>
      </div>
      <div className={`w-full mt-18 grid grid-cols-1`}>
        <div className={`grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8`}>
          {displayedMovies.map((movie) => {
            return (
              <div className={`h-full w-full`}>
                <FilmCategorySliderCard {...movie} />
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
//   const movies = await ApiReq.getEntities("movies")
  const categoryes = await ApiReq.getEntities("categoryes")
  let yearCat = []
  let generCat = []
  let contryCat = []
  let localCat = []
  categoryes.forEach((element) => {
    if (element.title == "gener") {
      generCat = ["Любой", ...element.category]
    } else if (element.title === "contry") {
      contryCat = ["Любой", ...element.category]
    } else if (element.title === "localization") {
      localCat = ["Любой", ...element.category]
    } else if (element.title === "year") {
      yearCat = ["Любой", ...element.category]
    }
  })

  return {
    props: { query: ctx.query, generCat, contryCat, localCat, yearCat },
  }
}
