import axios from "axios";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const CatalogContext = React.createContext({
    setDisplayedMovies: (arg:any[]) => {},
    displayedMovies: [],
    countries: ["Любой", ""],
    country: "Любой",
    setCountry:  (arg:string) => {},
    genres: ["Любой", ""],
    genre: "Любой",
    setGenre: (arg:string) => {},
    sorts: ["По популярности", "По рейтингу"],
    sort: "По популярности",
    setSort: (arg:string) => {},
    languages: ["Любой", ""],
    activeLanguages: ["Любой"],
    setActiveLanguages: (arg:string[]) => {},
    years: ["Любой", ""],
    released: "Любой",
    setYear: (arg:string) => {},
    isFilms: false,
    setIsFilms: (arg:boolean) => {},
    isSeries: false,
    setIsSeries: (arg:boolean) => {}


});

interface Props {
  children: ReactNode;
}

const CatalogContextProvider = ({ children }: Props) => {
    const {pathname} = useRouter()

    const [displayedMovies, setDisplayedMovies] = useState([])
    const [countries, setCountries] = useState(["Любой", ""])
    const [country, setCountry] = useState("Любой")

    const [genres, setGenres] = useState(["Любой", ""])
    const [genre, setGenre] = useState("Любой")

    const sorts = ["По популярности", "По рейтингу"]
    const [sort, setSort] = useState(sorts[0])

    const [languages, setLanguages] = useState(["Любой", ""])
    const [activeLanguages, setActiveLanguages] = useState(["Любой"])

    const [years, setYears] = useState(["Любой"])
    const [released, setYear] = useState("Любой")

    const [isFilms, setIsFilms] = useState(false)
    const [isSeries, setIsSeries] = useState(false)

    //Формируем поисковый запрос из стейтов
    const [searchQuery, setSearchQuery] = useState({
        released,
        genre,
        country,
        sort,
        languages: activeLanguages,
        isFilms,
        isSeries,
      })

    const debouncedSearchQuery = useDebounce(searchQuery, 3000)

    const getMoviesFromCat = async () => {
        let tmp = {
            localization: activeLanguages,
            country,
            genre,
            released,
            isFilms,
            isSeries,
        }
        const res = await axios.post('/api/categorySearch', tmp)
        console.log(res.data.data)
        setDisplayedMovies(res.data.data)
    }

      //Подаем запрос при маунте компонента
    useEffect(() => {
        if (pathname.split("/")[1] === "catalog" && !displayedMovies.length) {
            getMoviesFromCat()
        }
    }, [pathname])

    useEffect(() => {
        getMoviesFromCat()
    }, [debouncedSearchQuery])

    useEffect(() => {
        setSearchQuery({
        released,
        genre,
        country,
        sort,
        languages: activeLanguages,
        isFilms,
        isSeries,
        })
    }, [released, country, sort, activeLanguages, genre, isFilms, isSeries])

    useEffect(() => {
        const getCats = async () => {
            const categoryes = await axios.get("/api/getCategories")
            console.log(categoryes.data)
            categoryes.data.forEach((element) => {
              if (element.title == "gener") {
                setGenres(["Любой", ...element.category])
              } else if (element.title === "contry") {
                setCountries(["Любой", ...element.category])
              } else if (element.title === "localization") {
                setLanguages(["Любой", ...element.category])
              } else if (element.title === "released") {
                setYears(["Любой", ...element.category])
              }
            })
        }
        getCats()
    },[])


     

  return (
    <CatalogContext.Provider
    value={{
        setDisplayedMovies,
        displayedMovies,
        countries,
        country,
        setCountry,
        genres,
        genre,
        setGenre,
        sorts,
        sort,
        setSort,
        languages,
        activeLanguages,
        setActiveLanguages,
        years,
        released,
        setYear,
        isFilms,
        setIsFilms,
        isSeries,
        setIsSeries
    }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogContext;

export { CatalogContextProvider };