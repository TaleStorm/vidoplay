import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Footer from "../../components/footer"
import Header from "../../components/header"
import Checkbox from "../../components/inputs/checkbox"
import CheckboxDropdown from "../../components/inputs/checkboxDropdown"
import Dropdown from "../../components/inputs/dropdown"

const IndexPage = ({query}) => {

    const years = ["Любой", "1812", "1945", "2014"]
    const [year, setYear] = useState(years[0])

    const countries = ["Все страны", "Россия", "Корея"]
    const [country, setCountry] = useState(countries[0])

    const genres = ["Фантастика", "Дорамы", "Драмы"]
    const [genre, setGenre] = useState(query.genre ? query.genre : genres[0])

    const sorts = ["По популярности", "По чему-то ещё"]
    const [sort, setSort] = useState(sorts[0])

    const languages = ["EN", "RU", "KO", "На всех языках"]
    const [activeLanguages, setActiveLanguages] = useState(["На всех языках"])

    useEffect(() => {
        if (activeLanguages.length === 0) {
            setActiveLanguages(["На всех языках"])
        }
    }, [activeLanguages])

    const [isFilms, setIsFilms] = useState(false)
    const [isSeries, setIsSeries] = useState(false)
    const [isPacks, setIsPacks] = useState(false)


    return (
        <div className="bg-background text-mainText">
            <Header />
            <div className="container mx-auto h-screen">
                <div className="max-w-screen-xl w-full mx-auto ">
                    <div className={`w-full flex`}>
                        <div className={`w-full mr-5`}>
                            <div className={`mb-3`}>
                                Год
                   </div>
                            <Dropdown datas={years} state={year} setState={setYear} />
                        </div>
                        <div className={`w-full mr-5`}>
                            <div className={`mb-3`}>
                                Страна
                   </div>
                            <Dropdown datas={countries} state={country} setState={setCountry} />
                        </div>
                        <div className={`w-full mr-5`}>
                            <div className={`mb-3`}>
                                Жанр
                   </div>
                            <Dropdown datas={genres} state={genre} setState={setGenre} />
                        </div>
                        <div className={`w-full mr-5`}>
                            <div className={`mb-3`}>
                                Сортировка
                   </div>
                            <Dropdown datas={sorts} state={sort} setState={setSort} />
                        </div>
                        <div className={`w-full mr-5`}>
                            <div className={`mb-3`}>
                                Язык
                            </div>
                            <CheckboxDropdown datas={languages} state={activeLanguages} setState={setActiveLanguages} resetState={"На всех языках"} />
                        </div>
                        <div className={`flex items-center mt-6`}>
                        <div className={`flex-shrink-0 w-auto flex items-center mr-7 `}>
                            <div className={`mr-2`}>
                                Фильмы
                            </div>

                            <div className={`w-9 h-9 flex-shrink-0 flex`}>
                                <Checkbox state={isFilms} setState={setIsFilms} />
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-auto flex items-center mr-7`}>
                            <div className={`mr-2`}>
                            Сериалы
                            </div>

                            <div className={`w-9 h-9 flex-shrink-0`}>
                                <Checkbox state={isSeries} setState={setIsSeries} />
                            </div>
                        </div>
                        <div className={`flex-shrink-0 w-auto flex items-center`}>
                            <div className={`mr-2`}>
                            Подборки
                            </div>
                            <div className={`w-9 h-9 flex-shrink-0`}>
                            <Checkbox state={isPacks} setState={setIsPacks} />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

}

export default IndexPage

export async function getServerSideProps(context) {

    console.log(context.query)
    return {
      props: {query: context.query}, // will be passed to the page component as props
    }
  }