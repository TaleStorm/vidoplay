import Image from "next/image"
import Tag from "../tag"

const PlayerFilmCard = ({
    title,
    image,
    imageSize,
    isMovie,
    serie=1,
}) => {
    return (
       
        <div 
        className="bg-cardBackground w-full relative h-full ">
            <div 
            
            className={`h-${imageSize} bg-cover relative bg-center `}> 
                <Image
                    src={`${image}`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
            </div>

        <div className="py-3 px-4">
            <p className="text-mainText mb-2 text-h1-mobile font-medium h-full">
                {title}
            </p>
            {!isMovie && `${serie} серия`}
        </div>
        <div className={`hidden h-45`}/>
        <div className="flex flex-row justify-start flex-wrap mx-4 mb-2">
            {/*data.tags.map((tag, i) => {    
                return <Tag genre={tag} key={i} name={tag} color={tag.color}/>
            })*/}
        </div>
    </div>
    )

}

export default PlayerFilmCard