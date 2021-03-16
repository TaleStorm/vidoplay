import useSwr from 'swr'
import Image from 'next/image'
import fetch from '../libs/fetch'

function Recomandations() {
  const { data } = useSwr('/api/recomendations', fetch)

  return (
    <div className="col-span-1">
      recomendations
      {
        data ?
        data.content.map((recomendation, i) => { 
          if (i < 6) {
            return <div key={i} className="inline">
            <h3>{recomendation.title}</h3>
            <Image
                  src={recomendation.image}
                  alt="Picture of the author"
                  width={200}
                  height={200}
                />
          </div>
          }
        })
      : 'loading...'
    }
    </div>
  )
}

export default Recomandations

