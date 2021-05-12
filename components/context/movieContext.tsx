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
    isSeries: false
});

interface Props {
  children: ReactNode;
}

const MovieContextProvider = ({ children }: Props) => {
  const [movie, setMovie] = useState({
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
})
const [predictions, setPredictions] = useState([])
const isSeries = movie.type === "Сериал"
 
  useEffect(() => {
    const fetchPredicitons = async (id) => {
        const result = await axios.post("/api/predictions", {
            _id: id
        })
        setPredictions(result.data)
    }
    if (movie._id) {
        fetchPredicitons(movie._id)
    }
  }, [movie])
  
  return (
    <MovieContext.Provider
    value={{
        setMovie,
        movie,
        predictions,
        isSeries
    }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;

export { MovieContextProvider };