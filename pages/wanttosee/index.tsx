import axios from "axios"
import { useRouter } from "next/router"
import { type } from "node:os"
import { useEffect, useState } from "react"
import FilmCategory from "../../components/filmCategory"
import FilmCategorySliderCard from "../../components/filmCategorySliderCard"
import useDebounce from "../../components/hooks/useDebounce"
import Checkbox from "../../components/inputs/checkbox"
import CheckboxDropdown from "../../components/inputs/checkboxDropdown"
import Dropdown from "../../components/inputs/dropdown"
import apiReq from "../../services/api-requests"

const ApiReq = new apiReq()

type mockupType = {
  image: string,
  title: string,
  description: string,
  year: number,
  genre: Array<string>,
  country: string,
  serias: string
}

const stub: mockupType = {
  image: "/images/stub.png",
  title: "В стране волков",
  description: 'Снятый при подддержке  правительства Страны Баскые ожравительства Ст баскских легендах, которые оживают в пейзажах в духе "Безумн правительства Страны Басков сериал основан на древних баскских легендах, которые оживают в пейзажах в духе "Безумного Макса" и снятый будто бы на старые VHS-плёнки',
  year: 2014,
  genre: ["Драма", "Боевик", "Комедия"],
  country: "Германия",
  serias: "3 сезона (30 серий)"
}

export default function IndexPage({ }) {
  const films = new Array(20).fill(stub, 0, 20)

  return (
    <div className="w-full">
      {films.map((item: mockupType) =>
        <div className=" mb-4 rounded-lg p-4 bg-cardBackground">
          <div className="flex">
            <img className="h-32 sm:h-full  rounded-lg" style={{ maxHeight: 244 }} src={item.image} />
            <div className="grid grid-cols-1 ml-5 relative" style={{ gridTemplateRows: "auto 1fr auto" }}>
              <div className="row-span-1 flex justify-between mb-1 sm:mb-2">
                <h1 className="text-mainText text-md font-medium sm:text-2xl overflow-hidden">
                  {item.title}
                </h1>
                <h1 className="hidden sm:block text-dramaTag text-xl" style={{ minWidth: 110 }}>
                  {item.serias}
                </h1>
              </div>
              <div className="text-secondaryText hidden sm:grid grid-cols-12">
                <div className="col-span-10">
                  {item.description}
                </div>
              </div>
              <div className="row-span-1 flex sm:items-end w-full justify-between">
                <div className="text-sm sm:text-lg font-medium">
                  <div className="flex">
                    <h1 className="mr-2 text-secondaryText">Год:</h1>
                    <h1 className="text-mainText">{item.year}</h1>
                  </div>
                  <div className="flex">
                    <h1 className="mr-2 text-secondaryText">Жанр:</h1>
                    <h1 className="text-mainText">{item.genre.join(", ")}</h1>
                  </div>
                  <div className="flex">
                    <h1 className="mr-2 text-secondaryText">Германия:</h1>
                    <h1 className="text-mainText">{item.country}</h1>
                  </div>
                </div>
                <div className="hidden sm:flex items-end">
                  <button
                    className="flex px-6 justify-center transition-colors duration-300 hover:bg-button-hover text-white bg-orange p-3 rounded-lg w-full"
                    onClick={() => { }}
                  >
                    <div className="flex items-center">
                      <p className="mr-1 whitespace-nowrap">
                        Хочу увидеть на Chill
                    </p>
                      <svg className="h-6" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2856 4.28564V24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4.28564 14.2856H24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-secondaryText text-sm mt-2 sm:hidden">
            {item.description}
          </div>
          <button
            className="sm:hidden flex mt-3 px-6 justify-center transition-colors duration-300 hover:bg-button-hover text-white bg-orange p-3 rounded-lg w-full"
            onClick={() => { }}
          >
            <div className="flex items-center">
              <p className="mr-1">
                Хочу увидеть на Chill
                    </p>
              <svg className="h-6" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2856 4.28564V24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M4.28564 14.2856H24.2856" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

IndexPage