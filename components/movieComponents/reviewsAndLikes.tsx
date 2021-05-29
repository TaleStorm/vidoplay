import { useContext, useState, useEffect } from "react"
import AuthModalContext from "../context/authModalContext"
import LoginContext from "../context/loginContext"
import MovieContext from "../context/movieContext"
import StarIcon from "../icons/starIcon"
import ThumbsDown from "../icons/thumbsDown"
import ThumbsUp from "../icons/thumbsUp"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

const ReviewsAndLikes = ({setscore, score, movie, movieId}) => {
    const authModalContext = useContext(AuthModalContext)
    const loginContext = useContext(LoginContext)
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [hoveredscore, setHoveredscore] = useState(0)
    const [like, setLike] = useState(null)
    const stars = [1,2,3,4,5]

    const updateFavoriteFilm = async (additional) => {
        const data = {
            _movieId: movieId,
            _userId: localStorage.getItem('_user')
        }
        const result = Object.assign(data, additional)
        await ApiReq.updateFavoriteFilm(result)
    }

    const updateFilmState = async (newState, newLikes, newDislikes) => {
        if (loginContext.userToken) {
            if (like === null && newState) {
                setLike(newState);
                setLikes(newLikes);
                updateFilm(newState, newLikes, newDislikes);
            } else if (like === null && !newState) {
                setLike(newState);
                setDislikes(newDislikes);
                updateFilm(newState, newLikes, newDislikes);
            } else if (like !== newState) {
                setLike(newState);
                setLikes(newLikes);
                setDislikes(newDislikes);
                updateFilm(newState, newLikes, newDislikes);
            }
        }
        else {
            authModalContext.setModalOpen(true)
        }
    }

    const updateFilm = async (newState, newLikes, newDislikes) => {
        const likesData = {
            _dislikes: newDislikes,
            _likes: newLikes,
        };
        await ApiReq.updateLikes(movieId,likesData);
        updateFavoriteFilm({isLiked: newState, isDisliked: !newState});
    }

    useEffect(() => {
        async function fetchMyAPI() {
            if (localStorage.getItem('_user')) {
                const data = {
                    _movieId: movieId,
                    _userId: localStorage.getItem('_user')
                }
                const res = await ApiReq.getFavoriteFilm(data)
                setscore(res.score)
                if (res.isLiked) {
                    setLike(true)
                }
                if (res.isDisliked) {
                    setLike(false)
                }
            }
        }
      
        fetchMyAPI()
    }, [])

    useEffect(() => {
        setLikes(movie._likes)
        setDislikes(movie._dislikes)
    }, [])

    return (
        <div className="text-sm col-span-1 flex flex-col sm:flex-row justify-end content-between mt-8 pb-2">
        <div className="text-sm col-span-1 flex items-center justify-end mt-8 mr-8">
            <h4 className="font-roboto font-medium text-mainText text-base inline self-center mr-5">
                {score ? "Ваша оценка" : "Оцените сериал"}
            </h4>
            <div 
                onMouseLeave={() => {
                    setHoveredscore(0)
                }}
                className={`flex items-center`}>
                {stars.map((star, i) => {
                    return (
                        <div key={i} className={`${i === stars.length - 1 ? "mr-0" : "mr-2"} w-8 h-8`}>
                            <StarIcon 
                                setscore={setscore} 
                                score={score} 
                                index={star} 
                                hoveredscore={hoveredscore} 
                                setHoveredscore={setHoveredscore}
                                updateFavoriteFilm={updateFavoriteFilm}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
        <div className="text-sm col-span-1 flex flex-row sm:justify-end justify-center items-center content-end mt-8 ">
            <div className="self-center mr-5 flex justify-center w-full sm:w-auto bg-popupBackground sm:bg-transparent py-2 sm:py-0">
                <h6 className="font-roboto mr-2 text-mainText text-base inline self-center">
                    {likes}
                </h6>
                <div 
                onClick={() => {
                    updateFilmState(true, likes + 1, dislikes - 1);
                }}
                className={`w-8  h-8 mb-1 transition-all duration-200 cursor-pointer hover:text-white ${like === true ? "text-white" : "text-inactive"}`}>
                <ThumbsUp/>
                </div>
            </div>

            <a className="self-center flex justify-center w-full sm:w-auto bg-popupBackground sm:bg-transparent py-2 sm:py-0">
                <h6 className="font-roboto mr-2 text-mainText text-base self-center">
                    {dislikes}
                </h6>
                <div 
                onClick={() => {
                    updateFilmState(false ,likes - 1, dislikes + 1);
                }}
                className={`w-8 h-8 cursor-pointer mt-1 transition-all duration-200 hover:text-white ${like === false ? "text-white" : "text-inactive"}`}>
                <ThumbsDown/>
                </div>
            </a>
        </div>
    </div>
    )
}

export default ReviewsAndLikes