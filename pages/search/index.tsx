import FilmCategorySliderCard from "../../components/filmCategorySliderCard";

export default function Search() {

  const cards = Array(10).fill(
    <FilmCategorySliderCard
      comments={20}
      image="/images/sosedi.jpg"
      languages={["RU"]}
      imageSize="72"
      key={1}
      title="Test"
      tags={[{ color: "#33ff90", genre: "Tech", name: "Tech" }]}
      score={9.9}
      stringName="Tehc test"
      excerpt={"kekich"} />
  )

  return (
    <div>
      <nav className="hidden sm:block w-min mb-4">
        <a href="/" className="text-base flex items-center">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="inline"
          >
            <path
              d="M10.8906 13.2812L6.10937 8.5L10.8906 3.71875"
              stroke="#F8634A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h4 className="font-roboto text-orange font-normal text-base inline ml-2">Назад</h4>
        </a>
      </nav>
      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">

        {cards.map((card, i) => <div key={i} className="col-span-1">{card}</div>)}
      </div>
    </div>
  )
}