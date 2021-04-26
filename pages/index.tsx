import { useEffect } from "react";
import Header from '../components/header'
import Footer from '../components/footer'
import Slider from '../components/slider'
import Comments from '../components/comments'
import FilmCategory from '../components/filmCategory'
import apiReq from "../services/api-requests"
import comments from "../data/comments";

const ApiReq = new apiReq()

let cards = [
    {
        name: "Слайдер с информацией, баннера и т.п.",
        image: "slider.png",
    },
    {
        name: "Slider 2",
        image: "slider.png"
    },
    {
        name: "Slider 3",
        image: "slider.png"
    },
    {
        name: "Слайдер с информацией, баннера и т.п.",
        image: "slider.png",
    },
    {
        name: "Slider 2",
        image: "slider.png"
    },
    {
        name: "Slider 3",
        image: "slider.png"
    },
]



function IndexPage({ playlists, movies }) {
    
    useEffect(() => {
    }, [])
  
    return (
    <div className="bg-background text-mainText">
        <Header />
        <div className="container mx-auto ">
            <div className="max-w-screen-xl w-full mx-auto px-6 sm:grid grid-cols-5 grid-rows-1 gap-7">
                <div className="lg:col-span-4 md:col-span-5 space-y-12 sm:space-y-16">
                    <Slider cards={cards}/>
                    {playlists.map((playlist, i) => {    
                        return <FilmCategory 
                            key={i} 
                            name={playlist.name} 
                            stringName={playlist.stringName} 
                            cards={movies[i]} 
                            cardToShow={2}
                            sliderIndex={i}
                        />
                    })}
                </div>
                <div className="hidden lg:col-span-1 lg:block">
                    <Comments comments={comments}/>
                </div>
            </div>
        </div>
        <Footer />
    </div>
)}

export const getServerSideProps = async (ctx) => {
    const playlists = await ApiReq.getEntities("playlists")
    const movies = []
    for (let playlist in playlists) {
        const playlistMovies = []
        for (let movie in playlists[playlist].movies) {
            const movieInfo = await ApiReq.getSingleEntity("movies",playlists[playlist].movies[movie]._id)
            playlistMovies.push(movieInfo)
        }
        movies.push(playlistMovies)
    }
    // console.log(movies)
    return({props: { playlists, movies }})
}

export default IndexPage
