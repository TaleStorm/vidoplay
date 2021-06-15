import Head from "next/head"
import WantToSeeCard from "../../components/wantToSeeCard"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

function IndexPage({ wanttosees }) {
  const films = wanttosees;

  return (
    <>
      <Head>
        <link rel="canonical" href="https://chillvision.ru/wanttosee" />
        <meta property="og:title" content="Хочу увидеть на Chill" />
        <meta property="og:description" content="Проголосуйте за новый сериал или фильмы на Chill, сделайте свой выбор!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://chillvision.ru/wanttosee"} />
        <meta property="og:image" content="https://chillvision.ru/images/aboutChill.png" />
      </Head>
      <div className="w-full">
        {films.map((item, i) =>
          <WantToSeeCard key={i} {...item} />
        )}
      </div>
    </>
  )
}

export const getStaticProps = async (ctx) => {
  const wanttosees = await ApiReq.getEntities("wanttosees")

  return {
    props: {
      wanttosees
    },
  }
}

export default IndexPage