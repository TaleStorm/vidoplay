const AboutUs = () => {
    return (
        <div className={`grid grid-cols-1 gap-y-22 text-2xl pr-16`}>
            <div>
                <h6 className={`text-h6 font-medium mb-5`}>О CHILL</h6>
                <p> <span className={`font-medium`}>CHILL</span>
                     {" "}— первый веб-кинотеатр в России, у которого нет аналогов в мире. Уникальная мультимедийная платформа для просмотра веб-сериалов. </p>
            </div>
            <div>
                <h6 className={`text-h6 mb-5 font-medium`}>CHILL — это:</h6>
                <p><ul>
                    <li>уникальный формат;</li>
                    <li>оригинальный контент со всего мира;</li>
                    <li>жанры от хоррора до комедии;</li>
                    <li>международное кинопроизводство: Россия, США, Канада, Южная Корея, Китай, страны Европы и др.;</li>
                    <li>на языке оригинала и в переводе на русский.</li>
                    </ul></p>
            </div>
            <div>
                <h6 className={`text-h6 font-medium mb-5`}>Идея проекта CHILL</h6>
                <p> Идея проекта - создание творческого сообщества, где пользователи смогут не только просматривать контент, но и загружать на платформу свой собственный. Основное внимание направлено на сотрудничество с российскими авторами веб-сериалов. Международный контент - лишь часть проекта.  </p>
            </div>
            <div>
                <h6 className={`text-h6 font-medium mb-5`}>Команда CHILL</h6>
                <p>Мультимедийная платформа создана компанией Red Carpet Studio, которая занимается продвижением и популяризацией веб-сериалов в России.
                <br/> <br/>
                С 2018 года команда Red Carpet Studio и Chill проводит первый в России международный фестиваль REALIST WEB FEST, в рамках которого не только проходят показы лучших отечественных и международных проектов, но и заключаются партнерские соглашения с производителями контента со всего мира. </p>
            </div>
            <div>
            <h6 className={`text-h6 font-medium mb-5`}>О веб-сериалах</h6>
                <p>Веб-сериалы отличает не только хронометраж эпизода - как правило, не длиннее 25 минут - но и динамичность сюжета, а также нестандартная форма повествования. Этот формат идеально подходит для просмотра с компьютера или экрана смартфона и позволяет с пользой и удовольствием провести время по пути на работу или за завтраком, в пробке или во время рабочего перерыва. 
                <br/> <br/>
                CHILL – значит расслабляться. CHILL – значит раскрывать для себя новые креативные форматы и первыми получать доступ к лучшим мировым веб-сериалам.</p>
            </div>
            
        </div>
    )
}

export default AboutUs