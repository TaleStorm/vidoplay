import FilmDescription from "../../components/movieComponents/filmDescription"
import FilmComments from "../../components/filmComments"
import Video from "../../components/video"
import Series from "../../components/series"
import Screenshots from "../../components/screenshots"
import FilmCategory from "../../components/filmCategory"
import apiReq from "../../services/api-requests"
import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import ReviewsAndLikes from "../../components/movieComponents/reviewsAndLikes"
import MovieContext from "../../components/context/movieContext"

const ApiReq = new apiReq()

export default function IndexPage({ movie, playlist, movies }) {

  const movieContext = useContext(MovieContext)

  useEffect(() => {
    const div = document.createElement("div");
    div.innerHTML = movie.excerpt
    const sanitizedText = div.textContent || div.innerText || ""

    movieContext.setMovie({...movie,excerpt:sanitizedText})
  }, [])

  const [score, setscore] = useState(null)

  const series = []

  if (movie.serial)
    for (let season in movie.serial) {
      const seasonBuffer = []
      for (let serie in movie.serial[season].series) {
        seasonBuffer.push({
          videoId: movie.serial[season].series[serie][0].value,
          acting: "LostFilm",
          videoLength: "10",
          image: movie.serial[season].series[serie][1].value,
        })
      }
      series.push(seasonBuffer)
    }

  return (
    <>
      <Head>
        <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
      </Head>
      <div className="w-full grid grid-cols-1">
        <nav className="hidden sm:flex justify-start md:inline">
          <a href="/" className="text-base">
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

        <Video 
          name={movie.title} 
          series={series} 
          movieId = {movie._id} 
          movies = {movies} 
          langs={movie.localization}
          isSerial={movie.type == "Сериал"}
        />
        <div className={`hidden sm:block`}>
          <ReviewsAndLikes score={score} setscore={setscore} />
        </div>
        <Series series={series} />

        <FilmDescription/>

        <div className="sm:hidden">
          <ReviewsAndLikes score={score} setscore={setscore} />
        </div>

        {/* <div className="hidden sm:block ">
          <Screenshots
            name={movie.title}
            screenshots={movie.screenshots}
          />
        </div> */}

        <FilmComments comments={movie._comment} movieId={movie._id} />

        <div className="mt-8 sm:mx-0 grid grid-cols-1">
          <FilmCategory
            name={playlist.name}
            stringName={playlist.stringName}
            cards={movies}
            cardToShow={3}
            sliderIndex={0}
          />
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const playlists = await ApiReq.getEntities("playlists")
  const playlist = playlists[0]
  const movie = await ApiReq.getSingleEntity("movies", id)
  const result = await ApiReq.getPlaylistMoves(playlist._id)
  const movies = [...result.data]
  return { props: { movie, playlist, movies } }
}
