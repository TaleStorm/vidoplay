import FilmCategorySliderCard from "../../components/filmCategorySliderCard";
import TextSearchContext from "../../components/context/textSearchContetxt"
import React, { useContext, useState, useEffect } from "react"
import useDebounce from "../../components/hooks/useDebounce"
import axios from "axios";
import SearchContext from "../../components/context/searchContext";
import Head from "next/head";

export default function Search() {

  const {displayedMovies} = useContext(SearchContext)

  return (
    <>
      <Head>
        <link rel="canonical" href="https://chillvision.ru/search" />
        <meta property="og:title" content="Поиск по Chill Vision" />
        <meta property="og:description" content="Найдите любимый сериал на Chill Vision" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://chillvision.ru/search"} />
        <meta property="og:image" content="https://chillvision.ru/images/aboutChill.png" />
      </Head>
      <div>
        <nav className="hidden sm:block w-min mb-4">
          <a onClick={() => { window.history.back() }} className="text-base flex items-center">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline"
            >
              <path
                d="M10.8906 13.2812L6.10937 8.5L10.8906 3.71875"
                stroke="#F8634A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h4 className="font-roboto text-orange font-normal text-base inline ml-2">Назад</h4>
          </a>
        </nav>
        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">

          {displayedMovies.map((movie) => {
            return (
              <div className={`h-full w-full`}>
                <FilmCategorySliderCard {...movie} />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}