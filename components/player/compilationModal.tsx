import Image from "next/image";

const CompilationModal = ({
    setModalOpen, 
    currentCompilationMovie,
    changeSerie

}) => {
    return (
    <div className={`w-96`}>
        <div className={`text-h2-mobile font-medium mb-2`}>Сериал {currentCompilationMovie.title}</div>
        <div className="bg-cardBackground w-full relative ">
            <div className={`h-54 bg-cover relative bg-center`}> 
                <Image
                    src={`${currentCompilationMovie.image}`}
                    alt="Picture of the film"
                    layout="fill"
                    objectFit="cover"
                /> 
            </div>
            <div className={`p-3`}>
            <div className="flex justify-between items-center mb-1">
                <p className="text-mainText text-h1-mobile font-medium">
                    {currentCompilationMovie.title}
                </p>
                <p className={`opacity-70 text-h2-mobile`}>
                    30 мин.
                </p>
            </div>
            <div className={`text-h1-mobile font-medium mb-3`}>
            {currentCompilationMovie.serie} серия, 1 сезон
            </div>
            <p className={`text-smol opacity-70 mb-4`}>
                {currentCompilationMovie.excerpt}
            </p>
            <div className={`grid grid-cols-2 gap-2`}>
                    <button onClick={() => {
                        setModalOpen(false);
                    }} className="text-h2-mobile text-center text-white bg-black bg-opacity-20 opacity-50 p-2 duration-300 rounded-lg w-full flex items-center justify-center">
                        Отмена
                    </button>

                    <button onClick={() => {
                        setModalOpen(false);
                        changeSerie(currentCompilationMovie.serie - 1)
                    }} className=" text-h2-mobile text-center text-white bg-orange p-2 duration-300 rounded-lg hover:bg-orange w-full flex items-center justify-center">
                        Воспроизвести
                    </button>
            </div>
        </div>
    </div>
    </div>
    );
};

export default CompilationModal