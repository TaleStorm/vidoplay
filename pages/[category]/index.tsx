import FilmCategorySliderCard from "../../components/filmCategorySliderCard"
import Link from 'next/link'
import { ChevronLeftIcon } from "@heroicons/react/solid"
import Comments from "../../components/comments"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

const IndexPage = ({ playlist, movies, comments }) => {
    return (
        <>
            <div className="w-full ">
                <div className=" w-full mx-auto grid grid-cols-5 grid-rows-1 gap-10 ">
                    <div className="lg:col-span-4 col-span-5">
                        <nav className="inline-flex max-h-full h-min mb-5">
                            <Link href="/">
                                <a className="text-base hover:text-gray-900 text-orange flex items-center">
                                    <ChevronLeftIcon className={`inline w-5 h-5 fill-current`} />
                                    <h4 className="font-roboto  font-normal text-base inline">
                                        Назад
                            </h4>
                                </a>
                            </Link>
                        </nav>
                        <h2 className="font-roboto text-mainText mb-8  font-medium text-3xl">
                            {playlist.name}
                        </h2>
                        <div className={`grid gap-x-8 gap-y-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1`}>
                            {movies.map((card, i) => (
                                <div className={`h-full`}>
                                    <FilmCategorySliderCard
                                        title={card.title}
                                        image={card.image}
                                        stringName={card.stringName}
                                        imageSize={"40"}
                                        excerpt={card.excerpt}
                                        localization={card.localization}
                                        _comment={card._comment}
                                        score={card.score}
                                        tags={card.tags}
                                    />
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className="lg:col-span-1 lg:block hidden overflow-visible -ml-7">
                        <Comments comments={comments} />
                    </div>

                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    const { category } = ctx.query

    const comments = await ApiReq.getEntities("comments")

    const playlists = await ApiReq.getEntities("playlists")
    const current = playlists.find(x => x.stringName == category)
    const playlist = current

    const result = await ApiReq.getPlaylistMovies(playlist._id)
    const movies = [...result.data]
    return ({ props: { playlist, movies, comments } })
}

export default IndexPage

