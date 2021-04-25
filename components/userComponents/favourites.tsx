import { FilmCategorySliderCardData } from "../../interfaces"
import MiniFavouritesFilmCard from "./miniFavouritesFilmCard"

const Favourites = ({films}) => {
    return (
        <div className={`w-full`}>
            <div className={`w-full`}>
                <div className={`grid gap-x-8 gap-y-6 lg:grid-cols-3`}>
                    {films.map((film: FilmCategorySliderCardData, i: number) => (
                        <MiniFavouritesFilmCard key={`${film.name}${i}`} {...film} imageSize={"40"} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Favourites