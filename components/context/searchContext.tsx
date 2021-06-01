import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

const SearchContext = React.createContext({
    setSearchMode: (arg:boolean) => {},
    searchMode: false,
    setSearchString: (arg:string) => {},
    searchString: "",
    searchInputRef: null,
    openSearch: () => {},
    closeSearch: () => {},
    overlayRef: null
});

interface Props {
  children: ReactNode;
}

const SearchContextProvider = ({ children }: Props) => {
  const [searchMode, setSearchMode] = useState(false)
  const [searchString, setSearchString] = useState("")
  const searchInputRef = useRef(null) as MutableRefObject<HTMLInputElement>
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>

  const openSearch = () => {
      setSearchMode(true)
  }

  const closeSearch = () => {
    setSearchMode(false)
  }


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
        overlayRef
    }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

export { SearchContextProvider };
