import { MutableRefObject, useEffect, useRef, useState } from "react"
import Header from "../components/layout/header"
import Footer from "../components/footer"
import Slider from "../components/slider"
import Comments from "../components/comments"
import FilmCategory from "../components/filmCategory"
import apiReq from "../services/api-requests"
import comments from "../data/comments";
import PartnerSlider from "../components/partnerSlider"
import { PartnerSliderCardData } from "../interfaces"
import { ChillPromo } from "../components/chillPromo"

const ApiReq = new apiReq()

let cards = [
  {
    name: "",
    image: "/images/Anomaly.jpg",
  },
  {
    name: "",
    image: "/images/CoolMoves.jpg",
  },
  {
    name: "",
    image: "/images/sosedi.jpg",
  },
]

const partnerCards: PartnerSliderCardData[] = [
  {
    title: "Partner 1",
    discription: "Hello",
    image: "https://picsum.photos/400?random=1",
    age: 6
  },
  {
    title: "Partner 2",
    discription: "Hello",
    image: "https://picsum.photos/400?random=2",
    age: 18
  },
  {
    title: "Partner 3",
    discription: "Hello",
    image: "https://picsum.photos/400?random=3",
    age: 15
  },
  {
    title: "Partner 4",
    discription: "Hello",
    image: "https://picsum.photos/400?random=4",
    age: 0
  },
  {
    title: "Partner 5",
    discription: "Hello",
    image: "https://picsum.photos/400?random=5",
    age: 21
  },
  {
    title: "Partner 6",
    discription: "Hello",
    image: "https://picsum.photos/400?random=6",
    age: 8
  },
]

function IndexPage({ playlists, movies }) {

  const [chillPromoOpen, setChillPromoOpen] = useState(false)

  const aboutChillSlide = {
    name: "",
    image: "/images/aboutChill.png",
    onClick: (e) => { setChillPromoOpen(true) }
  }

  return (
      <div className="w-full">
        <div className="w-full mx-auto sm:grid grid-cols-5 grid-rows-1 gap-7">
          <div className="lg:col-span-4 md:col-span-5 space-y-12 sm:space-y-16">
            <Slider cards={[aboutChillSlide, ...cards]} />
            {playlists.map((playlist, i) => {
              return (
                <>
                  <FilmCategory
                    key={i}
                    name={playlist.name}
                    stringName={playlist.stringName}
                    cards={movies[i]}
                    cardToShow={2}
                    sliderIndex={i}
                  />
                  {i + 1 === Math.floor(playlists.length / 2) &&
                    <img
                      src={"/images/sosedi.jpg"}
                      alt="Picture of the film"
                      className="rounded-lg"
                    />
                  }
                </>
              )
            })}
            {/* <PartnerSlider cards={partnerCards} cardToShow={3} sliderIndex={8} /> */}
          </div>
          <div className="hidden lg:col-span-1 md:-mr-7 lg:block">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
  )
}

export const getStaticProps = async (ctx) => {
  let time = new Date().getTime()/1000
  const playlists = await ApiReq.getEntities("playlists")
  let count = 1

  const movies = []
  for (let playlist in playlists) {
    const playlistMovies = []
    count++
    
    // for (let movie in playlists[playlist].movies) {
    //   count++
    //   console.log(new Date().getTime()/1000 - time)
    //   const movieInfo = await ApiReq.getSingleEntity("movies", playlists[playlist].movies[movie]._id)
    //   playlistMovies.push(movieInfo)
    // }
    movies.push(playlistMovies)
  }
  console.log(`MADE ${count} REQUESTS`)
  return { 
    props: { playlists, movies },
    revalidate: 10
  
  }
}

export default IndexPage
