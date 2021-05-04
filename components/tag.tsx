import { TagData } from '../interfaces'

type TagProps = TagData

const Tag = (data) => {
  return (
    <a className={`relative z-10`} href={`/catalog?genre=${data.genre}`}>
    <div className={"px-2.5 py-1 rounded-full mr-2 mb-2 "}  style={{backgroundColor: "darkred"}}>
      <p className="text-xs text-mainText">
        {data.genre}
      </p>
    </div>
    </a>
  )

}

export default Tag

