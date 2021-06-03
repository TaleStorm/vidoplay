import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import useSanitize from "../hooks/useSanitize";



const MovieContext = React.createContext({
    setMovie: (arg:Object) => {},
    movie: {
        actors: [],
        age: "",
        compositors: [],
        contry: [],
        country: [],
        directors: [],
        display: "",
        excerpt: "",
        gener: [],
        image: "",
        localization: [],
        mariaDB: "",
        operators: [],
        painters: [],
        producers: [],
        released: "2018",
        scenarist: [],
        scenarists: [],
        score: 9,
        screenshots: [],
        serial: [],
        stringName: "",
        studio: null,
        tags: [],
        title: "",
        trailer: "",
        type: "",
        video: "",
        writers: "",
        _comment: [],
        _dislikes: 0,
        _id: "",
        _likes: 0,
        _mariaDB: "",
    },
    predictions: [],
    isSeries: false,
    isLoaded: false,
    defaultMovie: {
      actors: [],
      age: "",
      compositors: [],
      contry: [],
      country: [],
      directors: [],
      display: "",
      excerpt: "",
      gener: [],
      image: "",
      localization: [],
      mariaDB: "",
      operators: [],
      painters: [],
      producers: [],
      released: "2018",
      scenarist: [],
      scenarists: [],
      score: 9,
      screenshots: [],
      serial: [],
      stringName: "",
      studio: null,
      tags: [],
      title: "",
      trailer: "",
      type: "",
      video: "",
      writers: "",
      _comment: [],
      _dislikes: 0,
      _id: "",
      _likes: 0,
      _mariaDB: "",
  },
  setIsLoaded: (arg:boolean) => {}
});

interface Props {
  children: ReactNode;
}

const MovieContextProvider = ({ children }: Props) => {

  const defaultMovie = {
    actors: [],
    age: "",
    compositors: [],
    contry: [],
    country: [],
    directors: [],
    display: "",
    excerpt: "",
    gener: [],
    image: "",
    localization: [],
    mariaDB: "",
    operators: [],
    painters: [],
    producers: [],
    released: "2018",
    scenarist: [],
    scenarists: [],
    score: 9,
    screenshots: [],
    serial: [],
    stringName: "",
    studio: null,
    tags: [],
    title: "",
    trailer: "",
    type: "",
    video: "",
    writers: "",
    _comment: [],
    _dislikes: 0,
    _id: "",
    _likes: 0,
    _mariaDB: "",
}
  const [isLoaded, setIsLoaded] = useState(false)
  const [movie, setMovie] = useState(defaultMovie)
const [predictions, setPredictions] = useState([])
const isSeries = movie.type === "Сериал"
 
  useEffect(() => {
    const fetchPredicitons = async (id) => {
        // const result = await axios.post("/api/predictions", {
        //     _id: id
        // })
        // setPredictions(result.data)
    }
    if (movie._id) {
        fetchPredicitons(movie._id)
        setIsLoaded(true)
    }
  }, [movie])
  
  return (
    <MovieContext.Provider
    value={{
        setMovie,
        movie,
        predictions,
        isSeries,
        isLoaded,
        defaultMovie,
        setIsLoaded
    }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;

export { MovieContextProvider };