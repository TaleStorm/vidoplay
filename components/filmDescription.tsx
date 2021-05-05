import { useEffect } from "react"
import { FilmDescriptionData } from "../interfaces"

type FilmDescriptionProps = FilmDescriptionData

const FilmDescription = (data) => {

  useEffect(() => {
    console.log(data)
  },[])

  return (
    <div className="sm:mx-0 sm:py-10">
      <h4 className="hidden font-roboto text-mainText font-normal text-3xl sm:block mb-5">{data.name}</h4>
      <div className="sm:grid grid-cols-2 grid-rows-1 gap-4 mb-6">
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">{data.description}</h6>
        </div>
        <div className="col-span-1">
          <h6 className="font-roboto text-mainText opacity-70 font-normal text-sm block mb-5">
            Возрастные ограничения: <b>{data.yearPolicity}</b>
            <br />
            Страна: <b>{data.country.map((item) => item + ', ')}</b>
            <br />
            Жанр: <b>{data.janr}</b>
            <br />
            Режиссер: <b>{data.director.map((item) => item + ', ')}</b>
            <br />
            Оператор: <b>{data.operator.map((item) => item + ', ')}</b>
            <br />
            Автор сценария: <b>{data.screenwriter.map((item) => item + ', ')}</b>
            <br />
            Продюсер: <b>{data.producer.map((item) => item + ', ')}</b>
          </h6>
        </div>
      </div>
    </div>
  )
}

export default FilmDescription
