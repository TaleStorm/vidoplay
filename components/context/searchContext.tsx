import axios from "axios";
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchContext = React.createContext({
    setSearchMode: (arg:boolean) => {},
    searchMode: false,
    setSearchString: (arg:string) => {},
    searchString: "",
    searchInputRef: null,
    openSearch: () => {},
    closeSearch: () => {},
    overlayRef: null,
    displayedMovies: [],
    searchInputDiv: null
});

interface Props {
  children: ReactNode;
}

const SearchContextProvider = ({ children }: Props) => {
  const [searchMode, setSearchMode] = useState(false)
  const [searchString, setSearchString] = useState("")
  const [displayedMovies, setDisplayedMovies] = useState([])
  const searchInputRef = useRef(null) as MutableRefObject<HTMLInputElement>
  const searchInputDiv = useRef(null) as MutableRefObject<HTMLDivElement>
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>

  const openSearch = () => {
    const body = document.querySelector("body")
    body.style.overflow = "hidden"
    searchInputRef.current.focus()
    setSearchMode(true)
  }

  const closeSearch = () => {
    const body = document.querySelector("body")
    body.style.overflow = ""
    setSearchMode(false)
  }

  const debouncedSearchString = useDebounce(searchString, 1000)

  const getResults  = async () => {
    const body = {
      text: searchString
    }
    const res = await axios.post('/api/textSearch', body)
    setDisplayedMovies(res.data.data)
    console.log(res.data.data)
  }

  useEffect(() => {
    if (searchString.length > 1) {
      getResults()
    }
  },[debouncedSearchString])


  return (
    <SearchContext.Provider
    value={{
        setSearchMode,
        searchMode,
        searchString,
        setSearchString,
        searchInputRef,
        openSearch,
        closeSearch,
        overlayRef,
        displayedMovies,
        searchInputDiv
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

export { SearchContextProvider };
