import { useState } from "react"
import StarIcon from "./icons/starIcon"
import ThumbsDown from "./icons/thumbsDown"
import ThumbsUp from "./icons/thumbsUp"

const ReviewsAndLikes = ({setRating, rating}) => {
    const [hoveredRating, setHoveredRating] = useState(0)
    const [like, setLike] = useState(null)

    const stars = [1,2,3,4,5]
    return (
        <div className="text-sm col-span-1 flex flex-row justify-end content-between mt-8 pb-2">
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
        <div className="text-sm col-span-1 flex flex-row justify-end content-end mt-8">
            <div className="self-center mr-5 flex justify-center">
                <h6 className="font-roboto mr-2 text-mainText text-base inline self-center">
                    123
                </h6>
                <div className={`w-8 h-8 -mt-1.5 cursor-pointer hover:text-white ${like === true ? "text-white" : "text-inactive"}`}>
                <ThumbsUp/>
                </div>
            </div>

            <a className="self-center space-x-2 flex justify-center">
                <h6 className="font-roboto text-mainText text-base inline self-center">
                    1
                </h6>
                <div className={`w-8 h-8 cursor-pointer hover:text-white ${like === false ? "text-white" : "text-inactive"}`}>
                <ThumbsDown/>
                </div>
            </a>
        </div>
    </div>
    )
}

export default ReviewsAndLikes