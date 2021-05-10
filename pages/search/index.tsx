import FilmCategorySliderCard from "../../components/filmCategorySliderCard";
import TextSearchContext from "../../components/context/textSearchContetxt"
import React, {useContext, useState, useEffect} from "react"
import useDebounce from "../../components/hooks/useDebounce"
import axios from "axios";

export default function Search() {

  const textSearch = useContext(TextSearchContext)
  const [displayedMovies, setDisplayedMovies] = useState([])
  const debouncedSearchQuery = useDebounce(textSearch.text, 3000)

  const getResults  = async () => {
    const body = {
      text: textSearch.text
    }
    const res = await axios.post('/api/textSearch', body)
    setDisplayedMovies(res.data.data)
  }


  useEffect(() => {
    getResults()
  }, [debouncedSearchQuery])

  return (
    <div>
      <nav className="hidden sm:block w-min mb-4">
        <a href="/" className="text-base flex items-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
          >
            <path
              d="M10.8906 13.2812L6.10937 8.5L10.8906 3.71875"
              stroke="#F8634A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="font-roboto text-orange font-normal text-base inline ml-2">Назад</h4>
        </a>
      </nav>
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">

      {displayedMovies.map((movie) => {
            return (
              <div className={`h-full w-full`}>
                <FilmCategorySliderCard {...movie} />
              </div>
            )
          })}
      </div>
    </div>
  )
}