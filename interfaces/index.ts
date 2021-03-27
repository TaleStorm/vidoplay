// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type HeaderData = {
}

export type AuthWindowData = {
    stage: string
    hidden: boolean
    authFunc: () => void
    forPassFunc: () => void
    regFunc: () => void
    hideFunc: () => void
}

export type ForgottenPassData = {
    hidden: boolean
    hideFunc: () => void
}

export type AuthorizationData = {
    hidden: boolean
    hideFunc: () => void
    forPassFunc: () => void
    regFunc: () => void
}

export type RegistrationData = {
    hidden: boolean
    authFunc: () => void
    hideFunc: () => void
}

export type SliderCardData = {
    name: string
    image: string
    description: string
    key:number
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

export type SeriesData = {
    series: {
        videoLength: string
        image: string
    }[][]
}

export type SeriesSliderData = {
    series: {
        videoLength: string
        image: string
    }[]
}

export type SeriesSliderCardData = {
    id: number
    videoLength: string
    image: string
}

export type FilmDescriptionData = {
    name: string
    description: string
    yearPolicity: string
    country: string
    janr: string
    director: string
    operator: string
    screenwriter: string
    producer: string
}

export type ScreenshotsData = {
    screenshots: {
        image: string
    }[][]
}

export type ScreenshotsSliderData = {
    screenshots: {
        image: string
    }[]
}

export type ScreenshotsSliderCardData = {
    image: string
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

export type FilmCommentsData = {
    comments: {
        userImage: string
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
}

export type TagData = {
    name: string
    color: string
}