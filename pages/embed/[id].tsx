import Head from "next/head"
import { useContext, useEffect } from "react"
import MovieContext from "../../components/context/movieContext"
import Player from "../../components/player"
import apiReq from "../../services/api-requests"
const ApiReq = new apiReq()

const EmbeddedPage = ({movie, movies}) => {

    
  const movieContext = useContext(MovieContext)
  const series = []

  console.log(movie);
  

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

  useEffect(() => {
    const next = document.getElementById("__next")
    next.classList.add("h-full")
    movieContext.setMovie({...movie})
  }, [])



    return (
        <> 
        <Head>

        </Head>
        <div className={`fixed top-0 left-0 w-full h-full`}>
        <Player
            movies={movies}
            series={series}
            />
        </div>

        </>
    )

}

export default EmbeddedPage 

export const getServerSideProps = async (ctx) => {
    const { id } = ctx.query
    const playlists = await ApiReq.getEntities("playlists")
    const playlist = playlists[0]
    const movie = await ApiReq.getSingleEntity("movies", id)
    const result = await ApiReq.getPlaylistMoves(playlist._id)
    const movies = [...result.data]
    const comments = await ApiReq.getComments(movie._id)
    return { props: { movie, playlist, movies, comments } }
  }