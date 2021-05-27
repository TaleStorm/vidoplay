import { Children, ReactComponentElement, useState } from "react"

export default function Tabs(data:
  {
    startIndex: number,
    tabs: Array<string>,
    children,
    classes?: {
      tab?: string,
      container?: string
    }
  }) {
  const [currentTab, setCurrentTab] = useState(data.startIndex)

  const childrens = Children.toArray(data.children)

  return (
    <div>
      <div className="text-center w-full flex font-roboto absolute z-10" style={{transform:"translateY(-100%)"}}>
        {data.tabs.map((item, i) =>
          <div key={item} onClick={() => { setCurrentTab(i) }} className={`w-full sm:w-auto px-2 pb-1 pt-2 rounded-t-lg cursor-pointer ${i === currentTab ? "bg-orange" : "hover:bg-"}`}>
            {item}
          </div>
        )}
      </div>
      <div className={data.classes?.container}>
        {childrens[currentTab]}
      </div>
    </div>)
}