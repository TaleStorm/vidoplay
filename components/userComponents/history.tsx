import { FilmCategorySliderCardData } from "../../interfaces"
import MiniFilmCard from "../filmCards/miniHistoryFilmCard"

const History = ({films}) => {
    return (
        <div className={`w-full`}>
                    <div className={`grid gap-x-8 gap-y-6 lg:grid-cols-3`}>
                    {films.map((film, i:number) => (
                            <MiniFilmCard key={`${film}${i}`} filmId={film.movieId} imageSize={"40"} />
                        ))}
                    </div>
        </div>
    )
}

export default History