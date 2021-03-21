import { TagData } from '../interfaces'

type TagProps = TagData

const Tag = (data: TagProps) => (
  <div className={"px-2 rounded-full mr-2 mb-2"}  style={{backgroundColor: data.color}}>
    <p className="text-xs text-mainText">
      {data.name}
    </p>
  </div>
)

export default Tag

