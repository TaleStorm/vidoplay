
import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid';


const Dropdown = ({datas, state, setState}) => {
  
  return (
    <div className="">
              <Menu as="div" className="relative inline-block text-left w-full">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm pl-2 py-2 bg-playerMain text-sm font-roboto`} >
                        <div className={`inline-flex w-full px-3 justify-between items-center ${open && "text-orange"}`}>
                          <div className={`text-h2-mobile capitalize`}>{state}</div>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"  className={`-mr-1 ml-2 h-6 w-6 transform transition ease-out duration-150 ${open ? "rotate-180" : ""} flex-shrink-0 ${!open && "opacity-70"} stroke-current`}>
                          <path d="M19 10L12.25 16.75L5.5 10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                      </Menu.Button>
                    </div>

                    <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      <Menu.Items
                      static
                        className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-lg shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5 z-20"
                      >
                        <div className="">
                        {datas.map((data, i) => {
                            return (
                              <Menu.Item key={i}>
                                {({ active }) => (
                                  <button onClick={() => {setState(data)}} className={`${active && 'bg-black text-white'} w-full py-2 hover:bg-orange text-left px-4 ${i===0 && "rounded-t-lg"} ${i===datas.length-1 && "rounded-b-lg"} text-h2-mobile capitalize`}>
                                    {data}
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
            </div>
  )


            
}

export default Dropdown