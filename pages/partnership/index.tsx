import Layout from "../../components/layout/layout"
import DropdownWrapper from "../../components/layout/dropdownWrapper";
import TextInput from "../../components/inputs/textInput";
import { useState } from "react";
import validator from "../../components/inputs/validator";
import PartnershipHeroBlock from "../../components/partnershipHeroBlock";
import ResizableTextInput from "../../components/inputs/resizableTextInput";


const Partnership = () => {
    const [name, setName] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)

    const [seriesName, setSeriesName] = useState("")
    
    const [seriesOriginalName, setSeriesOriginalName] = useState("")

    const [year, setYear] = useState("")

    const [projectLink, setProjectLink] = useState("")

    const [seasonAmount, setSeasonAmount] = useState("")

    const [serieLength, setSerieLength] = useState("")

    const [annotation, setAnnotation] = useState("")

    return (
        <Layout>
        <div className={`mb-16`}>
            <PartnershipHeroBlock/>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}}>
        <div className={`lg:w-3/4`}>
        <DropdownWrapper heading={`Контактная информация`}>
        <div className={`w-full grid grid-cols-2 gap-14 py-6`}>
            <TextInput
            label={'Имя'}
            name={"name"}
            placeholder={"Константин Констанитинопольский"}
            state={name}
            setState={setName}
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
            />
        </div>
        </DropdownWrapper>
        <DropdownWrapper heading={`Информация о сериале`}>
        <div className={`w-full grid grid-cols-2 gap-14 pt-6 gap-y-6`}>
            <TextInput
            label={'Название (На языке оригинала)'}
            name={"series-name"}
            placeholder={"Название (на языке оригинала)"}
            state={seriesName}
            setState={setSeriesName}
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
            label={`Ссылка на скачивание проекта`}
            name={`series-name`}
            placeholder={`mp4, 16:9, H.264, HD(1920*1080); Аудио: 48 кгц, Stereo)`}
            state={projectLink}
            setState={setProjectLink}
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
            <div className={`col-span-2`}>
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
        <div className={`w-full grid grid-cols-2 gap-14 pt-6`}>
            <TextInput
            label={'Имя'}
            name={"name"}
            placeholder={"Константин Констанитинопольский"}
            state={name}
            setState={setName}
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
            />
        </div>
        </DropdownWrapper>
        <DropdownWrapper heading={`Социальные сети`}>
        <div className={`w-full grid grid-cols-2 gap-14 pt-6`}>
            <TextInput
            label={'Имя'}
            name={"name"}
            placeholder={"Константин Констанитинопольский"}
            state={name}
            setState={setName}
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
            />
        </div>
        </DropdownWrapper>
        </div>
        </form>
        </Layout>
    )
}

export default Partnership