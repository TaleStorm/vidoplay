import Header from "../../components/header"
import FilmDescription from "../../components/filmDescription"
import Footer from "../../components/footer"
import FilmComments from "../../components/filmComments"
import Video from "../../components/video"
import Series from "../../components/series"
import Screenshots from "../../components/screenshots"
import FilmCategory from "../../components/filmCategory"
import apiReq from "../../services/api-requests"
import Head from 'next/head';
import { useEffect } from "react"

const ApiReq = new apiReq()

let comments = [
  {
    comment: "Хорошая версия, но мне ближе другая.",
    film: "«Здравствуйте, я робот»",
    username: "Виталий Иванович",
    userImage: "",
  },
  {
    comment: "Хорошая версия, но мне ближе другая.",
    film: "«Здравствуйте, я робот»",
    username: "Виталий Иванович",
    userImage: "",
  },
  {
    comment: "Хорошая версия, но мне ближе другая.",
    film: "«Здравствуйте, я робот»",
    username: "Виталий Иванович",
    userImage: "",
  },
  {
    comment: "Хорошая версия, но мне ближе другая.",
    film: "«Здравствуйте, я робот»",
    username: "Виталий Иванович",
    userImage: "",
  },
]

export default function IndexPage({ movie, playlist, movies }) {
  const series = []
  for (let season in movie.serial) {
    const seasonBuffer = []
    for (let serie in movie.serial[season].series) {
      seasonBuffer.push(
        {
          videoId: movie.serial[season].series[serie].value,
          acting: "LostFilm",
          videoLength: "10",
          image: movie.image,
        }
      )
    }
    series.push(seasonBuffer)
  }

  useEffect(() => {
  },[])


  return(
  <>
    <Head>
      <script src="https://vplatform.gcdn.co/_players/v2.0.71/gplayerAPI.js"></script>
    </Head>
    <div className="w-full">
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

      <Video name={movie.title} series={series} movieId = {movie._id}/>

      <Series series={series}/>

      <FilmDescription
        name={movie.title}
        description={movie.excerpt}
        yearPolicity={movie.age}
        country={movie.contry}
        janr={movie.type}
        director={movie.director}
        operator={movie.producer}
        producer={movie.producer}
        screenwriter={movie.writers}
      />

      <div className="mx-6 sm:hidden">
        <div className="text-sm flex mt-3 space-y-2 flex-wrap">
          <h4 className="font-roboto text-mainText mt-auto text-base mr-3 inline self-center">
            Оцените сериал
            </h4>

          <div className="flex space-x-1.5">
            <a href="/#" className="self-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z" stroke="#C0C0C0" strokeWidth="2" />
              </svg>
            </a>

            <a href="/#" className="self-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z" stroke="#C0C0C0" strokeWidth="2" />
              </svg>
            </a>

            <a href="/#" className="self-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z" stroke="#C0C0C0" strokeWidth="2" />
              </svg>
            </a>

            <a className="self-center">
              
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z" stroke="#C0C0C0" strokeWidth="2" />
              </svg>
            </a>

            <a  className="self-center">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z" stroke="#C0C0C0" strokeWidth="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <Screenshots name={movie.title} screenshots={[movie.image,movie.image,movie.image,movie.image,movie.image,movie.image,movie.image,movie.image]} />
      </div>

      <FilmComments comments={comments} />

      <div className="mt-8 mx-6 sm:mx-0">
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
)}

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const playlists = await ApiReq.getEntities("playlists")
  const playlist = playlists[0]
  const movie = await ApiReq.getSingleEntity("movies",id)
  const movies = []
  for (let movie in playlist.movies) {
    const movieInfo = await ApiReq.getSingleEntity("movies",playlist.movies[movie]._id)
    movies.push(movieInfo)
  }
  return({props: { movie, playlist, movies  }})
}