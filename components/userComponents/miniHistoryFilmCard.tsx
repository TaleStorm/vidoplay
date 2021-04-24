import Image from "next/image"
import { FilmCategorySliderCardData } from "../../interfaces"
import Tag from "../tag"

const MiniHistoryFilmCard = (data:FilmCategorySliderCardData) => {
    return (
        <div className="bg-cardBackground w-full relative">
        <a href="/films/testdorama">
            <div className={`h-${data.imageSize} bg-cover relative bg-center`}> 
                <Image
                    src={`/images/${data.image}.png`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
                <div  className="absolute top-0 right-0 h-12 mx-auto w-20 flex flex-wrap content-center bg-filmInfoBackground">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline ml-2">
                        <path d="M18.4504 21.501C18.2925 21.5016 18.1385 21.4524 18.0102 21.3603L11.9816 16.9897L5.95302 21.3603C5.82422 21.4537 5.66905 21.5038 5.50994 21.5032C5.35084 21.5026 5.19604 21.4515 5.06792 21.3571C4.93981 21.2628 4.84502 21.1301 4.79726 20.9783C4.7495 20.8266 4.75124 20.6635 4.80224 20.5128L7.15349 13.5486L1.05974 9.36971C0.927741 9.27929 0.828119 9.14903 0.775425 8.99797C0.722732 8.8469 0.719728 8.68294 0.766854 8.53005C0.813979 8.37715 0.908763 8.24333 1.03736 8.14814C1.16595 8.05295 1.32162 8.00138 1.48161 8.00096H8.99942L11.2682 1.01893C11.317 0.868189 11.4124 0.736803 11.5406 0.64362C11.6688 0.550436 11.8231 0.500244 11.9816 0.500244C12.1401 0.500244 12.2945 0.550436 12.4226 0.64362C12.5508 0.736803 12.6462 0.868189 12.695 1.01893L14.9638 8.0033H22.4816C22.6418 8.00322 22.7978 8.05444 22.9268 8.14945C23.0558 8.24445 23.1509 8.37826 23.1984 8.53127C23.2458 8.68429 23.243 8.84846 23.1903 8.99976C23.1377 9.15106 23.038 9.28152 22.9058 9.37205L16.8097 13.5486L19.1596 20.511C19.1977 20.6237 19.2084 20.7438 19.1908 20.8615C19.1733 20.9792 19.128 21.091 19.0587 21.1877C18.9894 21.2845 18.8981 21.3633 18.7923 21.4178C18.6866 21.4722 18.5693 21.5007 18.4504 21.501Z" fill="#EFCF33"/>
                    </svg>
                    <h1 className="text-lg font-roboto font-medium text-mainText inline ml-2">
                        {data.rating}
                    </h1>
                </div>
    
                <div  className="absolute bottom-0 left-0 h-10 mx-auto w-auto flex flex-row justify-start flex-wrap space-x-2">
                    {data.languages.map((language, i) => {    
                        return <div key={i} className="h-10 w-10 flex-wrap content-center bg-filmInfoBackground justify-center flex">
                            <h1 className="text-lg font-roboto font-medium text-mainText">
                                {language.toUpperCase()}
                            </h1>
                        </div>
                    })}
                </div>
            </div>
        </a>
        <div className="my-4">
            <p className="text-xl font-roboto font-medium text-mainText mx-4 mb-4">
                {data.name}
            </p>
        </div>
        <div className="flex flex-row justify-start flex-wrap mx-4 mb-2">
            {data.tags.map((tag, i) => {    
                return <Tag key={i} name={tag.name} color={tag.color}/>
            })}
        </div>
        <div  className="h-10 flex flex-wrap justify-center items-center mr-4 cursor-pointer bg-sub-gray w-full">
            <h1 className="font-roboto font-normal text-mainText inline">
                Отзывы: {data.comments}
            </h1>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline ml-2"> 
                <path d="M15.9375 2.5H4.0625C3.48285 2.50165 2.9274 2.73265 2.51753 3.14253C2.10765 3.5524 1.87665 4.10785 1.875 4.6875V12.1875C1.87665 12.7672 2.10765 13.3226 2.51753 13.7325C2.9274 14.1424 3.48285 14.3734 4.0625 14.375H5.625V17.5L9.28594 14.4477C9.34216 14.4007 9.41308 14.375 9.48633 14.375H15.9375C16.5172 14.3734 17.0726 14.1424 17.4825 13.7325C17.8924 13.3226 18.1234 12.7672 18.125 12.1875V4.6875C18.1234 4.10785 17.8924 3.5524 17.4825 3.14253C17.0726 2.73265 16.5172 2.50165 15.9375 2.5V2.5Z" stroke="white" strokeLinejoin="round"/>
            </svg>
        </div>
    </div>
    )

}

export default MiniHistoryFilmCard