import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid';


const TopMenuDropdown = (
    {
        children,
        controller,
        handler,
        parentClass="",
        id=""
    }
) => {
    const childArray = [...children]
    return (
        <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${open ? "text-playerSecond" : "text-mainText" }`} >
                <div className="inline-flex">
                  {controller}
                  <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 transition-all transform ${open ? "rotate-180" : "rotate-0" }`}/>
                </div>
                
              </Menu.Button>
            </div>

            <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-1 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
              >
                <div className="rounded">
                {childArray.map((child, i) => {
                    return (
                      <Menu.Item key={i}>
                        {({ active }) => (
                            <button
                              className={
                                `${active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText'} block pr-4 pl-0 py-2 text-sm w-full ${i===0 && "rounded-t"} ${i === childArray.length - 1 && "rounded-b"}`}
                              onClick = {() => handler(i)}
                            >
                            {child}
                            </button>
                        )}
                      </Menu.Item>
                    )
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    )
}

export default TopMenuDropdown