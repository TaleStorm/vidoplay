import { Menu, Transition } from '@headlessui/react';
import { Fragment, MutableRefObject, useEffect, useRef } from "react";

const MenuWrapper = (

    {
    children,
    controller,
    parentClass="",
    id
    }
) => {
    return ( 
    <Menu className={`relative h-9 ${parentClass}`} as="div"  >
    {({ open }) => (
      <>
        <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
          <Menu.Items
            static
            className={`bottom-12 absolute left-0 mt-2 w-auto font-roboto rounded-md`}
          >
            <div className="py-1 ">
                {children.map((child, i) => {
                return (
                  <Menu.Item key={i}>
                      {child}
                  </Menu.Item>
                )
              })}
            </div>
          </Menu.Items>
        </Transition>
        <div>
          <Menu.Button >
              {controller}
          </Menu.Button>
        </div>
      </>
    )}
  </Menu>)
}

export default MenuWrapper