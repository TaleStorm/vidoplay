import { useContext, useEffect, createElement } from "react"
import { FilmDescriptionData } from "../../interfaces"
import MovieContext from "../context/movieContext"
import useSanitize from "../hooks/useSanitize"

type FilmDescriptionProps = FilmDescriptionData

const FilmDescription = () => {

  const { movie } = useContext(MovieContext)
  const sanitizedText = useSanitize(movie.excerpt)

  const isNotEmpty = (array: Array<string>) => {
    return array ? array.filter(item => item?.length > 0).length > 0 : false
  }

  return (
    <div className="sm:mx-0 sm:py-10">
      <h4 className="hidden font-roboto text-mainText font-normal text-3xl sm:block mb-5">{movie.title}</h4>
      <div className="sm:grid grid-cols-2 grid-rows-1 gap-4 mb-6">
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">{sanitizedText}</h6>
        </div>
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">
            {movie?.age && movie.age.length > 0 &&
              <>
                Возрастные ограничения: <b>{movie.age}</b>
                <br />
              </>}
            {isNotEmpty(movie?.country) &&
              <>
                Страна: <b>{movie.country.join(", ")}</b>
                <br />
              </>}
            {isNotEmpty(movie?.gener) &&
              <>
                Жанр: <b>{movie.gener.join(", ")}</b>
                <br />
              </>}
            {isNotEmpty(movie?.directors) &&
              <>
                Режиссер: <b>{movie.directors.join(", ")}</b>
                <br />
              </>}
            {isNotEmpty(movie?.operators) &&
              <>
                Оператор: <b>{movie.operators ? movie.operators.join(", ") : "Нет данных"}</b>
                <br />
              </>}
            {isNotEmpty(movie?.scenarists) &&
              <>
                Автор сценария: <b>{movie.scenarists ? movie.scenarists.join(", ") : "Нет данных"}</b>
                <br />
              </>}
            {isNotEmpty(movie?.producers) && 
              <>
                Продюсер: <b>{movie.producers ? movie.producers.join(", ") : "Нет данных"}</b>
              </>}
          </h6>
        </div>
      </div>
    </div>
  )
}

export default FilmDescription
