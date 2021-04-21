import Header from '../../components/header'
import FilmDescription from '../../components/filmDescription'
import Footer from '../../components/footer'
import FilmComments from '../../components/filmComments'
import Video from '../../components/video'
import Series from '../../components/series'
import Screenshots from '../../components/screenshots'
import FilmCategory from '../../components/filmCategory'

let series = [
    [
        {
            videoLength: "10",
            image: "",
        },
        {
            videoLength: "10",
            image: "",
        },
        {
            videoLength: "10",
            image: "",
        },{
            videoLength: "10",
            image: "",
        },
        {
            videoLength: "10",
            image: "",
        },
        {
            videoLength: "10",
            image: "",
        },{
            videoLength: "10",
            image: "",
        }
    ],
    [
        {
            videoLength: "20",
            image: "",
        },
        {
            videoLength: "20",
            image: "",
        },
        {
            videoLength: "20",
            image: "",
        },{
            videoLength: "20",
            image: "",
        },
        {
            videoLength: "20",
            image: "",
        },
        {
            videoLength: "20",
            image: "",
        },{
            videoLength: "20",
            image: "",
        }
    ]
]

let screenshots = [
    [
        {
            image: "",
        },
        {
            image: "",
        },
        {
            image: "",
        },{
            image: "",
        },
        {
            image: "",
        },
        {
            image: "",
        },{
            image: "",
        }
    ]
]

let filmCategories = [
    {
        name: "Похожие фильмы и сериалы",
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
]

let description = {
    name: "В яблочко! Парни - лучники",
    description: "Новый интерактивный мультсериал для малышей. Космический Доктор Кот, его помощник Осьминог Зео и верный друг Собака - Полицейский, который знает приемы кунг-фу, приходят на помощь инопланетным жителям в любой ситуации. Сериал в игровой форме обучает малышей правилам гигиены, безопасности, правильному питанию и хорошим привычкам. В конце каждой серии кулинарная школа или мастер класс 'сделай сам'. Подробнее https://spacedoctorcat.com/ru ",
    yearPolicity: "0+",
    country: "Россия",
    janr: "Для детей",
    director: "Петр Тарасов",
    operator: "Михаил Старков, Денис Дубровский",
    screenwriter: "Наталья Иванова-Достоевская, Полина Ратковская-Орлова, Анна Бондаренко, Ольга Сташкевич",
    producer: "Антон Калинкин, Наталья Иванова-Достоевская",
}

const IndexPage = () => (
    <div className="bg-background text-mainText">
        <Header />

        <div className="mx-auto max-w-7xl">
            <nav className="flex justify-start inline">
                <a href="/" className="text-sm text-base hover:text-gray-900">
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
                        <path d="M10.8906 13.2812L6.10937 8.5L10.8906 3.71875" stroke="#F8634A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h4 className="font-roboto text-orange font-normal text-base inline ml-2">
                        Назад
                    </h4>
                </a>
            </nav>

            <Video />

            <Series series={series}/>

            <FilmDescription {...description}/>

            <Screenshots screenshots={screenshots}/>

            <FilmComments comments={comments}/>
            
            <div className="mt-8">
                {filmCategories.map((filmsCategory, i) => {    
                    return <FilmCategory key={i} sliderIndex={i} name={filmsCategory.name} cards={filmsCategory.filmCards} cardToShow={filmsCategory.cardToShow}/>
                })}
            </div>
        </div>

        <Footer />
    </div>
)

export default IndexPage