import { MutableRefObject, useEffect, useRef, useState } from "react"
import Header from "../components/layout/header"
import Footer from "../components/layout/footer"
import Slider from "../components/slider"
import Comments from "../components/comments"
import FilmCategory from "../components/filmCategory"
import apiReq from "../services/api-requests"
import { PartnerSliderCardData } from "../interfaces"
import axios from "axios"

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

function IndexPage({ playlists = [], movies, comments, banners }) {

  const [chillPromoOpen, setChillPromoOpen] = useState(false)

  const aboutChillSlide = {
    name: "",
    image: "/images/aboutChill.png",
    onClick: (e) => { setChillPromoOpen(true) }
  }
  console.log()

  return (
      <div className="w-full">
        <div className=" md:grid grid-cols-5 grid-rows-1 gap-7">
          <div className="lg:col-span-4 md:col-span-5 grid grid-cols-1">
            <div>
            <div className={`mb-10`}>
            <Slider cards={banners} />
            </div>
            {playlists.map((playlist, i) => {
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
                    <img  className={`w-full mt-10`} src="/images/Pilots.png" alt=""/>
                  </a>
                  }
                </div>
              )
            })}
            {/* <PartnerSlider cards={partnerCards} cardToShow={3} sliderIndex={8} /> */}
          </div>
          </div>
          <div className="hidden lg:col-span-1 md:-mr-8 lg:block">
            <Comments comments={comments} />
          </div>
        </div>
      </div>
  )
}

export const getStaticProps = async (ctx) => {
  let time = new Date().getTime()/1000
  const data = await ApiReq.getTableFromAirtable("banner")
  const banners = data.records.map(record => {
      return {
        link: record.fields.link,
        image: record.fields.attachment[0].url,
        visibility: record.fields.visibility
      }
  }).filter(a => a.visibility === "true")
  const playlists = await ApiReq.getEntities("playlists")
  const comments = await ApiReq.getEntities("comments")
  let count = 1
  const movies = []
  for (let playlist of playlists) {
    const result = await ApiReq.getPlaylistMoves(playlist._id)
    movies.push(result.data)
    count++
    console.log(new Date().getTime()/1000 - time)
    }

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
