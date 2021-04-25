// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export type ProgressBarData = {
    currentTimePercent: string
    bufferTimePercent: string
    getMousePos: (e) => void
    setPlay: () => void
    fullScreenFunc: () => void
    setCurrentDuration: (e) => void
    isPlaying: boolean
    durationTime: number
    currentTime: number
    setFullScreen: () => void
}

export type AuthWindowData = {
    stage: string
    hidden: string
    authFunc: () => void
    forPassFunc: () => void
    regFunc: () => void
    hideFunc: () => void
}

export type ForgottenPassData = {
    hidden: string
    hideFunc: () => void
}

export type AuthorizationData = {
    hidden: string
    hideFunc: () => void
    forPassFunc: () => void
    regFunc: () => void
}

export type RegistrationData = {
    hidden: string
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
    sliderIndex: number
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
    index: number
    sliderInfo: {
        space: number,
        sliders: number
    }
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
    sliderIndex: number
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