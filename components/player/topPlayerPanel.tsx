import { Fragment, useContext, useEffect } from "react";
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon} from '@heroicons/react/solid';
import MovieContext from "../context/movieContext";
import TopMenuDropdown from "./topMenuDropdown";
import PlayerContext from "../context/playerContext";


export default function TopPlayerPanel() {

    const {movie, isLoaded} = useContext(MovieContext)
    const {currentSerie, currentSeason, changeSerie, currentActing, changeActing, isIntro, isTopPanelActive} = useContext(PlayerContext)
    
    return(
        <div  className={`
        ${!isTopPanelActive && "invisible"}
        ${isIntro && "invisible"}
         absolute lg:flex hidden top-4 left-4 flex-wrap z-10`}>
        <div className="mr-3">
        {<TopMenuDropdown handler={(i) => {changeSerie(i)}} controller={`${currentSerie + 1} серия`}>
          {isLoaded ? movie.serial[currentSeason].series.map((_a, i) => `${i + 1} серия`) : []}
        </TopMenuDropdown>}
        </div>
        <div className="mr-3">
        {<TopMenuDropdown handler={(i) => {changeSerie(i)}} controller={`${currentSeason + 1} сезон`}>
          {isLoaded ? movie.serial.map((_a, i) => `${i + 1} сезон`) : []}
        </TopMenuDropdown>}
        </div>
        <div className="">
        {<TopMenuDropdown handler={(i) => {changeActing(i)}} controller={isLoaded ? `${movie.localization[currentActing]}` : ""}>
          {isLoaded ? movie.localization.map(a => a) : []}
        </TopMenuDropdown>}
        </div>
      
      </div>
      
    )
}