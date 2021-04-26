import Layout from "../../components/layout/layout"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import doramas from "../../data/doramas";
import PlayerFilmCard from "../../components/filmCards/playerFilmCard";


const Partnership = () => {
    return (
        <Layout>
        <div>
            <div className={`mb-8`}>Как стать автором контента</div>
            <div>СHILL - первая независимая платформа для web-контента с прозрачной монетизацией. <br/> <br/> Пользователь платит 6 рублей за просмотр любого эпизода. После вычета налогов и транзакционных сборов доход делится в пропорции 50%/50% между правообладателем и платформой. 
            Вы также можете разместить свой контент в бесплатной зоне CHILL по рекламной модели. 
            Если у вас есть только пилот веб-сериала и вы хотите найти инвестора, то мы также готовы его разместить в специальной зоне.</div>
            <div>
            <Swiper
                spaceBetween={20}
                slidesPerView={3.5}
                allowTouchMove= {true}
                navigation={{
                  nextEl: '#next' + 1,
                }}
              >
                {doramas.map((card, i) => {    
                  return <SwiperSlide key={i} className="">
                    <div className={`w-full`}>
                    <PlayerFilmCard {...card} imageSize={"40"} />
                    </div>
                  </SwiperSlide>
                })}
            </Swiper>
            </div>
        </div>
        </Layout>
    )
}

export default Partnership