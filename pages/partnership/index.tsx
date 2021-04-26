import Layout from "../../components/layout/layout"
import DropdownWrapper from "../../components/layout/dropdownWrapper";
import TextInput from "../../components/inputs/textInput";
import { useState } from "react";
import validator from "../../components/inputs/validator";


const Partnership = () => {
    const [name, setName] = useState("")

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)

    return (
        <Layout>
        <div className={`mb-8`}>
            <div className={`mb-8`}>Как стать автором контента</div>
            <div>СHILL - первая независимая платформа для web-контента с прозрачной монетизацией. <br/> <br/> Пользователь платит 6 рублей за просмотр любого эпизода. После вычета налогов и транзакционных сборов доход делится в пропорции 50%/50% между правообладателем и платформой. 
            Вы также можете разместить свой контент в бесплатной зоне CHILL по рекламной модели. 
            Если у вас есть только пилот веб-сериала и вы хотите найти инвестора, то мы также готовы его разместить в специальной зоне.</div>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}}>
        <div className={`lg:w-2/3`}>
        <DropdownWrapper heading={`Контактная информация`}>
        <div className={`w-full grid grid-cols-2 gap-14`}>
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