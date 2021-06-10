import { useState } from "react"
import Slider from "../components/slider"
import Comments from "../components/comments"
import FilmCategory from "../components/filmCategory"
import apiReq from "../services/api-requests"
import Head from "next/head"

const ApiReq = new apiReq()

function IndexPage({ playlists = [], movies, comments, banners }) {

  const [chillPromoOpen, setChillPromoOpen] = useState(false)

  const aboutChillSlide = {
    name: "",
    image: "/images/aboutChill.png",
    onClick: (e) => { setChillPromoOpen(true) }
  }

  console.log(playlists)

  return (
    <>
      <Head>
        <link rel="canonical" href="https://chillvision.ru/" />
        <meta property="og:title" content="Chill Vision" />
        <meta property="og:description" content="Первый веб-кинотеатр в России, у которого нет аналогов в мире. Уникальная мультимедийная платформа для просмотра веб-сериалов." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://chillvision.ru/"} />
        <meta property="og:image" content="https://chillvision.ru/images/aboutChill.png" />
      </Head>
      <div className="w-full">
        <div className=" md:grid grid-cols-5 grid-rows-1 gap-7">
          <div className="lg:col-span-4 md:col-span-5 grid grid-cols-1">
            <div>
              <div className={`mb-10`}>
                <Slider cards={banners} />
              </div>

              {/* <PartnerSlider cards={partnerCards} cardToShow={3} sliderIndex={8} /> */}
            </div>
            {playlists.map((playlist, i) => {

              if (playlist.stringName === "piloty")
                return

              return (
                <div className={`mb-10`}>
                  <FilmCategory
                    key={i}
                    name={playlist.name}
                    stringName={playlist.stringName}
                    cards={movies[i]}
                    cardToShow={2}
                    sliderIndex={i}
                  />
                  { i === 0 &&
                    <a href="/piloty">
                      <img className={`rounded-lg w-full mt-10`} src="/images/Pilots.png" alt="" />
                    </a>
                  }
                </div>
              )
            })}
            {/* <PartnerSlider cards={partnerCards} cardToShow={3} sliderIndex={8} /> */}
          </div>
          <div className="hidden lg:col-span-1 md:-mr-8 lg:block">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async (ctx) => {
  const data = await ApiReq.getTableFromAirtable("banner")
  let banners = data.records.map(record => {
    return {
      link: record.fields.link,
      image: record.fields.attachment[0].url,
      visibility: record.fields.visibility
    }
  }).filter(a => a.visibility === "true")

  const playlists = await ApiReq.getEntities("playlists")
  const comments = await ApiReq.getEntities("comments")
  const reqArr = []
  for (let playlist of playlists) {
    reqArr.push(ApiReq.getPlaylistMovies(playlist._id))
  }
  const moviesData = await Promise.all(reqArr)
  const movies = moviesData.map((movieData) => {
    return movieData.data
  })
  console.log(moviesData)
  

  return {
    props: {
      playlists,
      movies,
      comments,
      banners
    },
    revalidate: 10
  }
}

export default IndexPage
