import { Fragment } from "react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid';

import { TopPlayerPanelData } from '../../interfaces'

type TopPlayerPanelProps = TopPlayerPanelData

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function TopPlayerPanel(data:TopPlayerPanelProps) {
    return(
        <div  className="absolute top-4 left-4 flex flex-wrap content-center space-x-4">
        <div className="">
          <Menu as="div" className="relative inline-block text-left " onClick={() => data.changeSeasonState()}>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${data.seasonState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                    <div onClick={() => data.changeSeasonState()} className="inline-flex">
                      {data.currentSeason+1} Сезон 
                      <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.seasonState == "open" ? "hidden" : "" }`}/>
                      <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.seasonState == "open" ? "" : "hidden" }`}/>
                    </div>
                    
                  </Menu.Button>
                </div>

                <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                    {data.data.map((serie, i) => {
                        return (
                          <Menu.Item key={i}>
                            {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                    'block pr-4 pl-0 py-2 text-sm w-full'
                                  )}
                                  onClick = {() => data.changeSeason(i)}
                                >
                                  {i+1} Сезон
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
        <div className="">
          <Menu as="div" className="relative inline-block text-left " onClick={() => data.changeSerieState()}>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${data.serieState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                    <div onClick={() => data.changeSerieState()} className="inline-flex">
                      {data.currentSerie+1} Серия 
                      <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.serieState == "open" ? "hidden" : "" }`}/>
                      <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.serieState == "open" ? "" : "hidden" }`}/>
                    </div>
                    
                  </Menu.Button>
                </div>

                <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                    {data.data[data.currentSeason].map((serie, i) => {
                        return (
                          <Menu.Item key={i}>
                            {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                    'block pr-4 pl-0 py-2 text-sm w-full'
                                  )}
                                  onClick = {() => data.changeSerie(i)}
                                >
                                  {i+1} Серия 
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
        <div className="">
          <Menu as="div" className="relative inline-block text-left " onClick={() => data.changeActingState()}>
            {({ open }) => (
              <>
                <div>
                  <Menu.Button className={`inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-playerMain text-sm font-roboto ${data.actingState == "open" ? "text-playerSecond" : "text-mainText" }`} >
                    <div onClick={() => data.changeActingState()} className="inline-flex">
                      {data.data[data.currentSeason][data.currentSerie][data.currentActing].acting}
                      <ChevronDownIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.actingState == "open" ? "hidden" : "" }`}/>
                      <ChevronUpIcon aria-hidden="true" className={`-mr-1 ml-2 h-5 w-5 ${data.actingState == "open" ? "" : "hidden" }`}/>
                    </div>
                    
                  </Menu.Button>
                </div>

                <Transition show={open} as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-full font-roboto rounded-md shadow-lg bg-playerMain ring-1 ring-black ring-opacity-5"
                  >
                    <div className="py-1">
                    {data.data[data.currentSeason][data.currentSerie].map((acting, i) => {
                        return (
                          <Menu.Item key={i}>
                            {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-playerSecond text-mainText' : 'bg-playerMain text-mainText',
                                    'block pr-4 pl-0 py-2 text-sm w-full'
                                  )}
                                  onClick = {() => data.changeActing(i)}
                                >
                                  {acting.acting}
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
      </div>
      
    )
}