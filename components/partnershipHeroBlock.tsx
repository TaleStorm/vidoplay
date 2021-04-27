const PartnershipHeroBlock = () => {

    const mainTextStyle = {
        fontSize: "20px",
        lineHeight: "32px"
    }

    const color1 = "#A036C9"
    const color2 = "#602BB7"
    const color3 = "#6B9FDB"
    const color4 = "#DE2DF4"
    const color5 = "#4680C2"

    const accentTextStyle = (color:string) => {
        return {
            fontSize: "23px",
            lineHeight: "32px",
            fontWeight: 700,
            color: color
        }

    }

    return (
        <div className={`w-full justify-center`}>
            <div className={`w-full grid md:grid-cols-3 gap-x-36 gap-y-10 md:mb-16 mb-10 justify-center`}>
                <div className={`flex items-center flex-col max-w-sm`}>
                    <img src="/graphics/1.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>     
                        СHILL — первая <span style={accentTextStyle("")}>независимая</span> <span style={accentTextStyle(color1)}>платформа</span>   для веб-контента <span style={accentTextStyle("")}>с прозрачной монетизацией</span>
                    </div>
                </div>
                <div className={`flex items-center flex-col max-w-sm`}>
                    <img src="/graphics/2.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>
                        Вы размещаете свой контент —
                        <span style={accentTextStyle("")}>его </span>
                        <span style={accentTextStyle(color2)}>смотрят </span>
                         — 
                         <span style={accentTextStyle("")}> вы </span>
                         <span style={accentTextStyle(color2)}>зарабатываете.</span>
                         
                    </div>
                </div>
                <div className={`flex items-center flex-col max-w-sm`}>
                    <img src="/graphics/3.svg" className={`w-24 h-14 mb-3`} alt="" />
                    <div style={mainTextStyle} className={`text-center`}>
                        Чем 
                        <span style={accentTextStyle(color3)}> больше просмотров</span>
                        , тем 
                        <span style={accentTextStyle(color3)}> больше </span>
                         ваш 
                         <span style={accentTextStyle(color3)}> гонорар</span>
                         .
                    </div>
                </div>
            </div>
            <div className={`w-full justify-center flex `}>
                <div className={`md:w-2/3 w-full grid md:grid-cols-2 gap-x-24 gap-y-10 justify-center`}>
                    <div className={`flex items-center flex-col max-w-sm`}>
                        <img src="/graphics/4.svg" className={`w-24 h-14 mb-3`} alt="" />
                        <div style={mainTextStyle} className={`text-center`}>
                            Если ваш сериал за месяц набирает <br/>
                            <span  style={accentTextStyle(color4)}> 1 млн </span>
                            <span  style={accentTextStyle("")}> просмотров </span>
                             — мы платим вам 
                             <span  style={accentTextStyle(color4)}> 300 тысяч </span>
                             <span  style={accentTextStyle("")}> рублей</span>
                             .

                        </div>
                    </div>
                    <div className={`flex items-center flex-col max-w-sm`}>
                        <img src="/graphics/5.svg" className={`w-24 h-14 mb-3`} alt="" />
                        <div style={mainTextStyle} className={`text-center`}>
                            Если у вас только пилот веб-сериала
                            и вы
                            <span  style={accentTextStyle("")}> хотите </span>
                            <span  style={accentTextStyle(color5)}> найти инвестора</span>
                            , добро пожаловать в наш 
                            <span  style={accentTextStyle(color5)}> раздел Пилоты</span>
                            .
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default PartnershipHeroBlock