import Layout from "../../components/layout/layout"
import DropdownWrapper from "../../components/layout/dropdownWrapper";
import TextInput from "../../components/inputs/textInput";
import { useState } from "react";
import validator from "../../components/inputs/validator";
import PartnershipHeroBlock from "../../components/partnershipHeroBlock";
import ResizableTextInput from "../../components/inputs/resizableTextInput";
import ImageInput from "../../components/inputs/imageInput";
import Checkbox from "../../components/inputs/checkbox";
import Head from "next/head";
import GoodToast from "../../components/goodtoast"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()


const Partnership = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [seriesName, setSeriesName] = useState("")
    const [seriesOriginalName, setSeriesOriginalName] = useState("")
    const [year, setYear] = useState("")
    const [projectLink, setProjectLink] = useState("")
    const [seasonAmount, setSeasonAmount] = useState("")
    const [serieLength, setSerieLength] = useState("")
    const [annotation, setAnnotation] = useState("")
    const [director, setDirector] = useState("")
    const [producer, setProducer] = useState("")
    const [actors, setActors] = useState("")
    const [trailer, setTrailer] = useState("")
    const [facebookLink, setFacebookLink] = useState("")
    const [vkLink, setVkLink] = useState("")
    const [instagramLink, setInstagramLink] = useState("")
    const [youtubeLink, setYoutubeLink] = useState("")
    const [festivalInfo, setFestivalInfo] = useState("")
    const [conditions, setConditions] = useState("")
    //images
    const [images, setImages] = useState([])
    const [poster, setPoster] = useState([])

    const [emailError, setEmailError] = useState(true)
    const [nameError, setNameError] = useState(true)
    const [nameSeriesError, setNameSeriesError] = useState(true)
    const [projectLinkError, setProjectLinkError] = useState(true)

    const sendApplication = async () => {
        const imagesLinks = []
        const posterLinks = []
        const personalInfo = {
            name: name,
            email: email
        }
        const serialInfo = {
            seriesName: seriesName,
            seriesOriginalName: seriesOriginalName,
            year: year,
            projectLink: projectLink,
            seasonAmount: seasonAmount,
            serieLength: serieLength,
            annotation: annotation,
        }
        const additioanlInfo = {
            director: director,
            producer: producer,
            actors: actors,
            trailer: trailer
        }
        const sotialNetworks = {
            facebookLink: facebookLink,
            vkLink: vkLink,
            instagramLink: instagramLink,
            youtubeLink: youtubeLink,
            festivalInfo: festivalInfo
        }
        for (let image of images) {
            const formData = new FormData();
            formData.append("image", image)
            const res = await ApiReq.addImage(formData)
            imagesLinks.push(res.data.path)
        }
        for (let elem of poster) {
            const formData = new FormData();
            formData.append("image", elem)
            const res = await ApiReq.addImage(formData)
            posterLinks.push(res.data.path)
        }
        const files = {
            images: imagesLinks,
            poster: posterLinks
        }
        const data = {
            personalInfo: personalInfo,
            serialInfo: serialInfo,
            additioanlInfo: additioanlInfo,
            sotialNetworks: sotialNetworks,
            files: files
        }
        const res = await ApiReq.partnership(data)
        GoodToast("Форма успешно отправлена")
    }

    return (
        <>
            <Head>
                <link rel="canonical" href="https://chillvision.ru/partnership" />
                <meta property="og:title" content="Стань частью Chill Vision" />
                <meta property="og:description" content="СHILL — первая независимая платформа для веб-контента с прозрачной монетизацией, Вы размещаете свой контент — его смотрят — вы зарабатываете. Чем больше просмотров, тем больше ваш гонорар. Если ваш сериал за месяц набирает 1 млн просмотров — мы платим вам 300 тысяч рублей. Если у вас только пилот веб-сериала и вы хотите найти инвестора, добро пожаловать в наш раздел Пилоты." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={"https://chillvision.ru/partnership"} />
                <meta property="og:image" content="https://chillvision.ru/images/aboutChill.png" />
            </Head>
            <div className={`mb-16`}>
                <PartnershipHeroBlock />
            </div>
            <form onSubmit={(e) => { e.preventDefault() }} encType="multipart/form-data">
                <div className={`xl:w-3/4`}>
                    <DropdownWrapper heading={`Контактная информация`}>
                        <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 py-6`}>
                            <TextInput
                                label={'Имя'}
                                name={"name"}
                                placeholder={"Константин Констанитинопольский"}
                                state={name}
                                setState={setName}
                                validator={validator.default}
                                error={nameError}
                                setError={setNameError}
                                errorMessage={"Обязательное поле"}
                            />
                            <TextInput
                                label={`Email`}
                                name={`email`}
                                type={`email`}
                                placeholder={`Введите email`}
                                state={email}
                                setState={setEmail}
                                validator={validator.email}
                                error={emailError}
                                setError={setEmailError}
                                errorMessage={"Неправильный формат почты"}
                            />
                        </div>
                    </DropdownWrapper>
                    <DropdownWrapper heading={`Информация о сериале`}>
                        <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-x-14 pt-6 gap-y-6`}>
                            <TextInput
                                label={'Название (На языке оригинала)'}
                                name={"series-name"}
                                placeholder={"Название (на языке оригинала)"}
                                state={seriesName}
                                setState={setSeriesName}
                                validator={validator.default}
                                error={nameSeriesError}
                                setError={setNameSeriesError}
                                errorMessage={"Обязательное поле"}
                            />
                            <TextInput
                                label={`Ссылка на скачивание проекта`}
                                name={`series-name`}
                                placeholder={`mp4, 16:9, H.264, HD(1920*1080); Аудио: 48 кгц, Stereo)`}
                                state={projectLink}
                                setState={setProjectLink}
                                validator={validator.default}
                                error={projectLinkError}
                                setError={setProjectLinkError}
                                errorMessage={"Обязательное поле"}
                            />
                            <TextInput
                                label={`Название (На английском)`}
                                name={`series-name`}
                                placeholder={`Название (на английском)`}
                                state={seriesOriginalName}
                                setState={setSeriesOriginalName}
                            />
                            <TextInput
                                label={'Год выпуска'}
                                name={"series-name"}
                                placeholder={"Введите год выпуска"}
                                state={year}
                                setState={setYear}
                            />
                            <TextInput
                                label={'Количество сезонов и серий'}
                                name={"series-name"}
                                placeholder={"Введите количество сезонов и серий"}
                                state={seasonAmount}
                                setState={setSeasonAmount}
                            />
                            <TextInput
                                label={'Продолжительность серии'}
                                name={"series-name"}
                                placeholder={"Введите продолжительность серии"}
                                state={serieLength}
                                setState={setSerieLength}
                            />
                            <div className={`md:col-span-2`}>
                                <ResizableTextInput
                                    label={'Аннотация'}
                                    name={"annotation"}
                                    placeholder={"Введите краткую аннотацию"}
                                    state={annotation}
                                    setState={setAnnotation}
                                />
                            </div>
                        </div>
                    </DropdownWrapper>
                    <DropdownWrapper heading={`Дополнительная информация`}>
                        <div className={`w-full grid grid-cols-1 md:grid-cols-2 gap-x-14 pt-6 gap-y-6`}>
                            <TextInput
                                label={'Режиссер'}
                                name={"director"}
                                placeholder={"Режиссер"}
                                state={director}
                                setState={setDirector}
                            />
                            <TextInput
                                label={`Продюссер`}
                                name={`producer`}
                                placeholder={`Продюссер`}
                                state={producer}
                                setState={setProducer}
                            />
                            <TextInput
                                label={`Актеры`}
                                name={`producer`}
                                placeholder={`Актеры`}
                                state={actors}
                                setState={setActors}
                            />
                            <TextInput
                                label={`Ссылка на скачивание трейлера`}
                                name={`producer`}
                                placeholder={`Ссылка на скачивание трейлера`}
                                state={trailer}
                                setState={setTrailer}
                            />

                            <ImageInput
                                images={poster}
                                setImages={setPoster}
                                header={"Постер"}
                                buttonText={`Прикрепить постер`}
                                notice={`*  Постер — 400*520px`}
                                multiple={false}
                            />
                            <ImageInput
                                images={images}
                                setImages={setImages}
                                header={"Обложки серий"}
                                buttonText={`Прикрепить обложки`}
                                notice={`*  Обложки серий — 400*400px и 1280*720px`}
                            />
                        </div>
                    </DropdownWrapper>
                    <DropdownWrapper heading={`Социальные сети`}>
                        <div className={`w-full grid md:grid-cols-2 gap-x-14 pt-6 gap-y-6`}>
                            <TextInput
                                label={'Facebook'}
                                name={"facebook"}
                                placeholder={"https://facebook.com"}
                                state={facebookLink}
                                setState={setFacebookLink}
                            />
                            <TextInput
                                label={`VK`}
                                name={`vk`}
                                placeholder={`https://vk.com`}
                                state={vkLink}
                                setState={setVkLink}
                            />
                            <TextInput
                                label={'Instagram'}
                                name={"instagram"}
                                placeholder={"https://instagram.com"}
                                state={instagramLink}
                                setState={setInstagramLink}
                            />
                            <TextInput
                                label={'Youtube'}
                                name={"youtube"}
                                placeholder={"https://youtube.com"}
                                state={youtubeLink}
                                setState={setYoutubeLink}
                            />
                            <div className={`md:col-span-2`}>
                                <ResizableTextInput
                                    label={'Информация об участии в фестивалях'}
                                    name={"festival-info"}
                                    placeholder={"Введите информацию об участии в фестивалях"}
                                    state={festivalInfo}
                                    setState={setFestivalInfo}
                                />
                            </div>
                        </div>
                    </DropdownWrapper>
                    <label className={`cursor-pointer select-none`}>
                        <div className={`flex items-center`}>
                            <div className={`w-6 h-6 mr-3`}>
                                <Checkbox state={conditions} setState={setConditions} />
                            </div>
                            Я принимаю условия пользования платформой
                        </div>
                    </label>
                    <button
                        onClick={() => {
                            sendApplication()
                        }}
                        className="mt-10 text-h2-mobile text-center text-white bg-orange p-4 duration-300 rounded-lg hover:bg-orange w-full md:w-64">
                        Отправить
                    </button>
                </div>
            </form>
        </>
    )
}

export default Partnership