import useSwr from 'swr'
import Image from 'next/image'
import fetch from '../libs/fetch'

function Movies() {
  const { data } = useSwr('/api/movies', fetch)

  return (
    <div className="col-span-1">
      movies
      {
        data ?
        data.content.map((movie, i) => { 
          if (i < 6) {
            return <div key={i} className="inline">
              <h3>{movie.title}</h3>
              <Image
                src={movie.image}
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

export default Movies

