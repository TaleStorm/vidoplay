import Image from 'next/image'

const Video = () => (
  
  <div className="mt-6 mx-auto max-w-7xl">
        <h4 className="font-roboto text-mainText font-normal text-3xl block mb-5">
            В яблочко! Парни - лучники
        </h4>

        <div className="relative h-screen">
            <Image
                src={`/images/dorama.png`}
                alt="Picture of the film"
                layout="fill"
                objectFit="cover"
            />
        </div>

        <div className="mt-8 space-x-6">
            <button className="bg-orange hover:bg-orange text-mainText font-bold py-2 px-4 rounded">
                Совместный просмотр
            </button>
            <button className="bg-orange hover:bg-orange text-mainText font-bold py-2 px-4 rounded">
                Смотреть трейлер
            </button>
        </div>

  </div>
  
)

export default Video

