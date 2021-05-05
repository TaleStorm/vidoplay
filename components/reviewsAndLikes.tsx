import { useContext, useState } from "react"
import AuthModalContext from "./context/authModalContext"
import LoginContext from "./context/loginContext"
import StarIcon from "./icons/starIcon"
import ThumbsDown from "./icons/thumbsDown"
import ThumbsUp from "./icons/thumbsUp"

const ReviewsAndLikes = ({setRating, rating, _dislikes, _likes}) => {
    const authModalContext = useContext(AuthModalContext)
    const loginContext = useContext(LoginContext)
    const [likes, setLikes] = useState(_likes)
    const [dislikes, setDislikes] = useState(_dislikes)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [like, setLike] = useState(null)



    const stars = [1,2,3,4,5]
    return (
        <div className="text-sm col-span-1 flex flex-col sm:flex-row justify-end content-between mt-8 pb-2">
        <div className="text-sm col-span-1 flex items-center justify-end mt-8 mr-8">
            <h4 className="font-roboto font-medium text-mainText text-base inline self-center mr-5">
                {rating ? "Ваша оценка" : "Оцените сериал"}
            </h4>
            <div 
            onMouseLeave={() => {
                    setHoveredRating(0)
                }}
            className={`flex items-center`}>
            {stars.map((star, i) => {
                return (
                    <div className={`${i === stars.length - 1 ? "mr-0" : "mr-2"} w-8 h-8`}>
                        <StarIcon setRating={setRating} rating={rating} index={star} hoveredRating={hoveredRating} setHoveredRating={setHoveredRating}/>
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
                    if (loginContext.userToken) {
                        setLike(true)
                        if (like !== true) {
                            setLikes(likes + 1)
                        }
                        if (like === false) {
                            setDislikes(dislikes - 1)
                        }
                    }
                    else {
                        authModalContext.setModalOpen(true)
                    }
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
                    if (loginContext.userToken) {
                    setLike(false)
                    if (like !== false) {
                        setDislikes(dislikes + 1)
                    }
                    if (like === true) {
                        setLikes(likes - 1)
                    }
                }
                else {
                    authModalContext.setModalOpen(true)
                }
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