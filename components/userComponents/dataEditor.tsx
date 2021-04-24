import { useState } from "react"
import TextInput from "../textInput"

const DataEditor = ({name, setName, lastName, setLastName, patronymic, setPatronymic}) => {

    return (
        <div className={`w-full`}>
        <div className={`mb-12`}>
            <h3 className={`text-lk-header mb-5`}>
                Редактировать профиль
            </h3>
            <div className={`grid lg:grid-cols-2 gap-x-14 gap-y-6`}>
                <TextInput label={`Имя`} name={`name`} state={name} setState={setName} />
                <TextInput label={`Фамилия`} name={`lastname`} state={lastName} setState={setLastName} />
                <TextInput label={`Отчество`} name={`patronymic`} state={patronymic} setState={setPatronymic} />
            </div>
        </div>
        <div>
            <div>
                <h3 className={`text-lk-header mb-5`}>
                    Сменить пароль
                </h3>
                <div className={`grid lg:grid-cols-2 gap-x-14 gap-y-6`}>
                    <TextInput label={`Текущий пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                    <div />
                    <TextInput label={`Новый пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                    <TextInput label={`Повторите новый пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                </div>
            </div>
        </div>
    </div>
    )

}

export default DataEditor