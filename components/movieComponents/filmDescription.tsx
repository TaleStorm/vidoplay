import { useContext, useEffect,createElement } from "react"
import { FilmDescriptionData } from "../../interfaces"
import MovieContext from "../context/movieContext"
import useSanitize from "../hooks/useSanitize"

type FilmDescriptionProps = FilmDescriptionData

const FilmDescription = () => {

  const {movie} = useContext(MovieContext)

  return (
    <div className="sm:mx-0 sm:py-10">
      <h4 className="hidden font-roboto text-mainText font-normal text-3xl sm:block mb-5">{movie.title}</h4>
      <div className="sm:grid grid-cols-2 grid-rows-1 gap-4 mb-6">
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">{movie.excerpt}</h6>
        </div>
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">
            Возрастные ограничения: <b>{movie.age}</b>
            <br />
            Страна: <b>{movie.country ? movie.country.join(", ") : "Нет данных"}</b>
            <br />
            Жанр: <b>{movie.gener ? movie.gener.join(", ") : "Без категории"}</b>
            <br />
            Режиссер: <b>{movie.directors ? movie.directors.join(", ") : "Нет данных"}</b>
            <br />
            Оператор: <b>{movie.operators ? movie.operators.join(", ") : "Нет данных"}</b>
            <br />
            Автор сценария: <b>{movie.scenarists ? movie.scenarists.join(", ") : "Нет данных"}</b>
            <br />
            Продюсер: <b>{movie.producers ? movie.producers.join(", ") : "Нет данных"}</b>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default FilmDescription
