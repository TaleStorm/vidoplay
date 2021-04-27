const PartnershipHeroBlock = () => {

    const mainTextStyle = {
        fontSize: "20px",
        lineHeight: "32px"
    }

    const accentTextStyle = {

    }

    return (
        <div>
            <div className={`w-full grid grid-cols-3 gap-36 mb-16`}>
                <div className={`flex items-center flex-col`}>
                    <img src="/graphics/1.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>
                        СHILL — первая независимая<br /> платформа для веб-контента <br />
                с прозрачной монетизацией
                    </div>
                </div>
                <div className={`flex items-center flex-col`}>
                    <img src="/graphics/2.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>
                        Вы размещаете свой контент —
                        его смотрят — вы зарабатываете.
                    </div>
                </div>
                <div className={`flex items-center flex-col`}>
                    <img src="/graphics/3.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>
                        Чем больше просмотров, тем больше ваш гонорар.
                    </div>
                </div>
            </div>
            <div className={`w-full justify-center flex`}>
                <div className={`w-2/3 grid grid-cols-2 gap-24`}>
                    <div className={`flex items-center flex-col`}>
                        <img src="/graphics/4.svg" className={`w-24 h-14 mb-3`} alt="" />
                        <div style={mainTextStyle} className={`text-center`}>
                            Если ваш сериал за месяц набирает
                            1 млн просмотров — мы платим вам 300 тысяч рублей.

                        </div>
                    </div>
                    <div className={`flex items-center flex-col`}>
                        <img src="/graphics/5.svg" className={`w-24 h-14 mb-3`} alt="" />
                        <div style={mainTextStyle} className={`text-center`}>
                            Если у вас только пилот веб-сериала
                            и вы хотите найти инвестора, добро пожаловать в наш раздел Пилоты.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default PartnershipHeroBlock