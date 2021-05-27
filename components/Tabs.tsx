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
    <div className={`h-full`}>
      <div className="text-center w-full flex font-roboto absolute z-10" style={{transform:"translateY(-100%)"}}>
        {data.tabs.map((item, i) =>
          <div key={item} onClick={() => { setCurrentTab(i) }} className={`w-full sm:w-auto px-2 pb-1 pt-2 rounded-t-lg cursor-pointer ${i === currentTab ? "bg-orange" : "hover:bg-"}`}>
            {item}
          </div>
        )}
      </div>
      <div className={`h-full`}>
        {childrens.map((child, i) => {
          if (i === currentTab) {
            return <div className={`h-full`}>{child}</div>
          }
          else {
            return <div className={`w-0 h-0 opacity-0 overflow-hidden`}>{child}</div>
          }
        })}
      </div>
    </div>)
}