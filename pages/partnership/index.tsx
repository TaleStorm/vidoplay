import Layout from "../../components/layout/layout"
import DropdownWrapper from "../../components/layout/dropdownWrapper";
import TextInput from "../../components/inputs/textInput";
import { useState } from "react";
import validator from "../../components/inputs/validator";
import PartnershipHeroBlock from "../../components/partnershipHeroBlock";


const Partnership = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)

    return (
        <Layout>
        <div className={`mb-8`}>
            <PartnershipHeroBlock/>
        </div>
        <form onSubmit={(e) => {e.preventDefault()}}>
        <div className={`lg:w-2/3`}>
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
        </div>
        </form>
        </Layout>
    )
}

export default Partnership