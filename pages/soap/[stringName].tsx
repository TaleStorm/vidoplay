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
import { useRouter } from "next/router"
import axios from "axios"
import requestIp from "request-ip"

const ApiReq = new apiReq()

export default function IndexPage({ movie, playlist, movies, comments, allow }) {
  const movieContext = useContext(MovieContext)
  const [currentUrl, setCurrentUrl] = useState<string>("")
  const [score, setscore] = useState(null)
  const router = useRouter()

  useEffect(() => {
    console.log(movie)
    movieContext.setMovie({ ...movie })

    return () => {
      movieContext.setMovie(movieContext.defaultMovie)
      movieContext.setIsLoaded(false)
    }
  }, [])

  useEffect(() => {
    setCurrentUrl(document.location.href)
  }, [])

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

  return "title" in movie ? (
    <>
      <Head>
        <title>{movie.type === "Сериал" ?
          movie.gener.includes("Дорама") ? `Дорама ${movie.title} смотреть онлайн в хорошем качестве - Веб-кинотеатр Chill` : `Сериал ${movie.title} смотреть онлайн в хорошем качестве - Веб-кинотеатр Chill` : `${movie.title} смотреть онлайн в хорошем качестве - Веб-кинотеатр Chill`
        }</title>
        <meta property="og:title" content={movie?.title} />
        <meta property="og:url" content={currentUrl} />
        {series.map((season, sei) => season.map((seria, sri) =>
          <meta key={`${sei}-${sri}`} property="og:video" content={seria.videoId} />
        ))}
        <meta property="og:image" content={movie?.image} />
        <meta property="og:description" content={movie?.excerpt} />
        <meta property="ya:ovs:upload_date" content={`${movie?.released}-01-01`} />
        <meta property="ya:ovs:adult" content={String(parseInt(movie?.age) >= 18)} />
        <meta property="video:duration" content="PT6M58S" />
        <meta property="og:type" content={movie?.type === "Сериал" ? "video.episode" : "video.movie"} />
        <meta property="og:video:type" content="flash" />
        <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
      </Head>
      {series.map((season, sei) => season.map((seria, sri) =>
        <div hidden itemScope itemType="http://schema.org/VideoObject">
          <a itemProp="url" href={seria.videoId}>
            <h2 itemProp="name">{movie?.title}</h2>
          </a>
          <p itemProp="description">{movie?.excerpt}</p>
          <meta itemProp="duration" content="PT6M58S" />
          <meta itemProp="isFamilyFriendly" content={String(parseInt(movie?.age) < 18)} />
          <p>Дата загрузки:<span itemProp="uploadDate">{`${movie?.released}-01-01T00:00:00`}</span></p>
          <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
            <img itemProp="contentUrl" src={seria.image} />
            <meta itemProp="width" content="800" />
            <meta itemProp="height" content="450" />
          </span>
        </div>
      ))}
      <div className="w-full grid grid-cols-1">
        <nav className="hidden sm:flex justify-start md:inline">
          <a
            onClick={() => {
              window.history.back()
            }}
            className="text-base">
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
          allow={allow}
          name={movie.title}
          series={series}
          movies={movies}
          langs={movie.localization}
          video={movie.video}
          isSerial={movie.type == "Сериал"}
        />

        <div className={`hidden sm:block`}>
          <ReviewsAndLikes score={score} setscore={setscore} movie={movie} movieId={movie._id} />
        </div>
        <Series series={series} />

        <FilmDescription />

        <div className="sm:hidden">
          <ReviewsAndLikes score={score} setscore={setscore} movie={movie} movieId={movie._id} />
        </div>

        {/* <div className="hidden sm:block ">
          <Screenshots
            name={movie.title}
            screenshots={movie.screenshots}
          />
        </div> */}

        <FilmComments comments={comments} movieId={movie._id} />

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
  ) : (
    <>
      <div className="font-roboto h-2/5 flex flex-col justify-center items-center">
        <div className=" text-xl lg:text-2xl">Похоже, что данного фильма или сериала не существует</div>
        <a className="text-orange text-md lg:text-lg mt-2" href="/">
          На главную
        </a>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const { stringName } = ctx.query
  const playlists = await ApiReq.getEntities("playlists")
  const playlist = playlists[0]
  const movie = await ApiReq.getMovieBySringName(stringName)
  const result = await ApiReq.getPlaylistMovies(playlist._id)
  const movies = [...result.data]
  const comments = await ApiReq.getComments(movie._id)
  const ip = requestIp.getClientIp(ctx.req)
  const allow = await axios.post("http://localhost:3000/api/checkLocation", {
    ip,
    head: ctx.req.headers
  })
  return { props: { movie, playlist, movies, comments, allow: allow.data } }
}
