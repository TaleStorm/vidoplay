const FilmCardLanguages = ({data}) => {
    return (
        
        <div className="absolute bottom-0 left-0 h-8 sm:h-12 mx-auto w-auto grid grid-flow-col gap-2 flex-wrap">
        {data.localization.map((language, i) => {    
            return (
                <a className={`relative z-10`} href={`/films/${data.stringName}?lang=${language.value.toLowerCase()}`}>
                <div key={i} className="h-8 sm:h-12 w-8 sm:w-12 flex flex-wrap content-center bg-filmInfoBackground justify-center relative z-10">
                    <h1 className="text-md sm:text-lg font-roboto font-medium text-mainText">
                        {language.value.toUpperCase()}
                    </h1>
                </div>
                </a>
            )
        })}
    </div>
    )
}

export default FilmCardLanguages