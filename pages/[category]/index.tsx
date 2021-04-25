import FilmCategorySliderCard from "../../components/filmCategorySliderCard"
import Footer from "../../components/footer"
import Header from "../../components/header"
import doramas from "../../data/doramas"
import Link from 'next/link'
import { ChevronLeftIcon } from "@heroicons/react/solid"
import comments from "../../data/comments"
import Comments from "../../components/comments"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

const IndexPage = ({ playlist, movies }) => {
    return (
        <div className="bg-background text-mainText">
            <Header />
            <div className="container mx-auto ">
                <div className="max-w-screen-xl w-full mx-auto grid grid-cols-5 grid-rows-1 gap-7 ">
                    <div className="lg:col-span-4 md:col-span-5">
                    <nav className="inline-flex max-h-full h-min mb-5">
                        <Link href="/">
                        <a className="text-base hover:text-gray-900 text-orange flex items-center">
                            <ChevronLeftIcon className={`inline w-5 h-5 fill-current`}/>
                            <h4 className="font-roboto  font-normal text-base inline">
                                Назад
                            </h4>
                        </a>
                        </Link>
                    </nav>
                    <h2 className="font-roboto text-mainText mb-8  font-medium text-3xl">
                            {playlist.name}
                    </h2>
                    <div className={`grid gap-x-8 gap-y-6 grid-cols-3`}>
                    {movies.map((movie, i) => (
                            // <FilmCategorySliderCard key={i} {...dorama} imageSize={"52"} />
                            <FilmCategorySliderCard 
                                key={i}
                                title={movie.title} 
                                image={movie.image}
                                stringName={movie.stringName}
                                imageSize={"52"}
                                excerpt={movie.excerpt}
                                languages={["EN","RU","KO"]}
                                tags={[{
                                        name:"#дорамы",
                                        color:"#36A4C9"
                                    },
                                    {
                                        name:"#драма",
                                        color:"#A036C9"
                                    }
                                ]}
                                comments={30}
                                rating={7.8}
                            />
                        ))}
                    </div>

                    </div>

                    <div className="lg:col-span-1 lg:block hidden overflow-visible">
                        <Comments comments={comments}/>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const { category } = ctx.query

    const playlist = await ApiReq.getSingleEntity("playlists",category)
    const movies = []

    for (let movie in playlist.movies) {
        const movieInfo = await ApiReq.getSingleEntity("movies",playlist.movies[movie]._id)
        movies.push(movieInfo)
    }
    return({props: { playlist, movies }})
}

export default IndexPage
