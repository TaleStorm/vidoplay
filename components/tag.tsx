// import Link from "next/link";
// import Image from "next/image";

import { TagData } from '../interfaces'

type TagProps = TagData

const Tag = (data: TagProps) => (
  <div key={data.key} className={"px-2 rounded-full mr-2 mb-2 bg-" + data.color}>
    <p className="text-xs text-mainText">
      {data.name}
    </p>
  </div>
)

export default Tag

