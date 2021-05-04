import { MutableRefObject, useEffect, useRef, useState } from "react"
import ModalOverlay from "../layout/modalOverlay"
import TextInput from "../inputs/textInput"

const DataEditor = ({ name, setName, lastName, setLastName, patronymic, setPatronymic }) => {

    const [stage, setStage] = useState(0)
    const sliderBody = useRef() as MutableRefObject<HTMLDivElement>
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const resizeListener = () => {
            sliderBody.current.style.transform = `translate3d(${-stage * sliderBody.current.getBoundingClientRect().width}px, 0px, 0px)`
        }
        sliderBody.current.style.transform = `translate3d(${-stage * sliderBody.current.getBoundingClientRect().width}px, 0px, 0px)`
        window.addEventListener("resize", resizeListener)
        return () => { window.removeEventListener("resize", resizeListener) }
    }, [modalOpen])

    return (
        <div className={`w-full`}>
            <ModalOverlay modalOpen={modalOpen} setModalOpen={setModalOpen} classes={`px-4`}>
                <div className={`w-full h-auto bg-popupBackground mt-30 flex flex-col items-center sm:px-8 px-4 pt-4 pb-8 max-w-md mx-auto`}>
                    <div className={`text-h2-mobile mb-5`}> Вы точно хотите сменить пароль?</div>
                    <button
                        onClick={() => {
                            setModalOpen(!modalOpen);

                        }}
                        className="mb-3 text-center text-h2-mobile text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full">
                        Сменить пароль
                        </button>
                    <button
                        onClick={() => {
                            setModalOpen(!modalOpen);

                        }}
                        className="text-center text-h2-mobile text-white  p-3 duration-300 rounded-lg bg-user-button-gray-2 w-full">
                        Отмена
                        </button>
                </div>
            </ModalOverlay>
            <div className={`w-full hidden sm:block`}>
                <div className={`mb-12`}>
                    
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
                            <button
                                onClick={() => {
                                    setModalOpen(!modalOpen);

                                }}
                                className="text-center text-h2-mobile text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full ">
                                Сменить пароль
                        </button>
                        </div>

                    </div>
                </div>
            </div>

            <div className={`w-full overflow-x-hidden sm:hidden`}>
                <div className={`w-full flex py-2`}>
                    <div
                        onClick={() => {
                            setStage(0)
                        }}
                        className={`w-full flex justify-center items-center text-ui-text`}>
                        Личная информация
                </div>
                    <div
                        onClick={() => {
                            setStage(1)
                        }}
                        className={`w-full flex justify-center items-center text-ui-text`}>
                        Сменить пароль
                </div>
                </div>
                <div className={`mb-4`}>
                    <div
                        style={{
                            transform: sliderBody.current ? `translate3d(${stage * sliderBody.current.getBoundingClientRect().width / 2}px, 0px, 0px)` : ``
                        }}
                        className={`h-0.5 bg-orange w-1/2 transition-all duration-300`}></div>
                </div>
                <div className={`flex w-full`}>
                    <div
                        style={{
                            width: "200%",
                            transform: sliderBody.current ? `translate3d(${-stage * sliderBody.current.getBoundingClientRect().width}px, 0px, 0px)` : ``
                        }}
                        ref={sliderBody}
                        className={`flex transition-all duration-300 py-2`}
                    >
                        <div className={`w-full flex-shrink-0 grid grid-cols-1 gap-y-4`}>
                            <TextInput label={`Имя`} name={`name`} state={name} setState={setName} />
                            <TextInput label={`Фамилия`} name={`lastname`} state={lastName} setState={setLastName} />
                            <TextInput label={`Отчество`} name={`patronymic`} state={patronymic} setState={setPatronymic} />
                            <button className="mt-1 text-h2-mobile text-center text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full ">
                                Сохранить изменения
                    </button>
                        </div>
                        <div className={`w-full flex-shrink-0 grid grid-cols-1 gap-y-4`}>
                            <TextInput label={`Текущий пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                            <TextInput label={`Новый пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                            <TextInput label={`Повторите новый пароль`} name={`name`} state={name} setState={setName} type={`password`} />
                            <button onClick={() => {
                                setModalOpen(!modalOpen);
                            }} className="mt-1 text-h2-mobile text-center text-white bg-orange p-3 duration-300 rounded-lg hover:bg-orange w-full ">
                                Сменить пароль
                    </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DataEditor