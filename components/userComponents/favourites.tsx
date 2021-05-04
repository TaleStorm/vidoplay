import { FilmCategorySliderCardData } from "../../interfaces"
import MiniFavouritesFilmCard from "../filmCards/miniFavouritesFilmCard"

const Favourites = ({films}) => {
    return (
        <div className={`w-full`}>
            <div className={`w-full`}>
                <div className={`grid gap-x-8 gap-y-6 lg:grid-cols-3`}>
                    {films.map((film, i: number) => (
                        <MiniFavouritesFilmCard key={`${film.title}${i}`} filmId={film.movieId} imageSize={"40"} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favourites