import Image from "next/image"
import Tag from "../tag"

const PlayerFilmCard = (data) => {
    return (
        
        <div className="bg-cardBackground w-full relative h-full ">
            <div className={`h-52 bg-cover relative bg-center `}> 
                <Image
                    src={`${data.image}`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
            </div>

        <div className="my-4">
            <p className="text-mainText mx-4 mb-4 text-h1-mobile font-medium h-full">
                {data.title}
            </p>
        </div>
    </div>
    )
}

export default PlayerFilmCard