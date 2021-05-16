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
import WantToSeeCard from "../../components/wantToSeeCard"
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

const amount = 20

export default function IndexPage({ }) {
  const films = new Array(amount).fill(stub, 0, amount)

  return (
    <div className="w-full">
      {films.map((item: mockupType,i) =>
        <WantToSeeCard key={i} {...item}/>
      )}
    </div>
  )
}

IndexPage