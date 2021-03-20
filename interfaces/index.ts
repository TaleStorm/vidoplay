// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type SliderCardData = {
    name: string
    image: string
    description: string
    key:number
    nextFunction:() => void
    prevFunction:() => void
}

export type SliderData = {
    cards: {
        name: string
        image: string
    }[]
}

export type FilmCategoryData = {
    name: string
    cards: {
        name: string
        image: string
    }[]
    cardToShow: number
}

export type FilmCategorySliderData = {
    cards: {
        name: string
        image: string
        description: string
        languages: string[],
        tags: {
            name: string
            color: string
        }[]
        comments: number,
        rating: number
    }[]
    cardToShow: number
}

export type CommentsData = {
    comments: {
        userImage: string
        film: string
        username: string
        comment: string
    }[]
}

export type FilmCategorySliderCardData = {
    name: string
    imageSize: string
    image: string
    description: string
    languages: string[],
    tags: {
        name: string
        color: string
    }[]
    comments: number,
    rating: number
    key:number
}

export type TagData = {
    name: string
    color: string
    key:number
}