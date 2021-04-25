import { useEffect } from "react";
import Header from '../components/header'
import Footer from '../components/footer'
import Slider from '../components/slider'
import Comments from '../components/comments'
import FilmCategory from '../components/filmCategory'
import apiReq from "../services/api-requests"

const urlPrefix  = process.env.API_DOMAIN

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

let filmCategories = [
    {
        name: "Дорамы и другие азиатские сериалы",
        cardToShow: 2,
        filmCards: [
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
        ]
    },
    {
        cardToShow: 2,
        name: "Дорамы и другие азиатские сериалы",
        filmCards: [
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
        ]
    },
    {
        cardToShow: 3,
        name: "Дорамы и другие азиатские сериалы",
        filmCards: [
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
            {
                name: "В яблочко! Парни - лучники",
                description: "Хон Шин А — яркая и амбициозная девушка. Она рисует, причём очень даже неплохо. На данный момент девушка весь свой талант направляет на создание вебтунов, поэтому становиться членом команды по стрельбе из лука, в которой кстати говоря, одни парни",
                image: "dorama",
                languages: ["en","ko","ru"],
                tags: [
                    {
                        name:"#дорамы",
                        color:"#36A4C9"
                    },
                    {
                        name:"#драма",
                        color:"#A036C9"
                    },
                    {
                        name:"#пролюбовь",
                        color:"#6B4DC1"
                    }
                ],
                comments: 30,
                rating: 7.8
            },
        ]
    }
]

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

const fetcher = (url) => fetch(url).then((res) => res.json())

function IndexPage({ playlists, movies }) {
    
    useEffect(() => {
        console.log(movies)
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
    console.log(movies)
    return({props: { playlists, movies }})
}

export default IndexPage
