// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export type PlayerData = {
    width: string
    height: string
    series: {
        videoLength: string
        image: string
        videoId: string
        acting: string
    }[][]
}

export type ProgressBarData = {
    currentTimePercent: string
    currentVolume: number
    bufferTimePercent: string
    currentQuality: string
    getMousePos: (e) => void
    setPlay: () => void
    fullScreenFunc: () => void
    setCurrentDuration: (e) => void
    changeCurrentLevel: (quality) => void
    setCurrentVolume: (e) => void
    isPlaying: boolean
    durationTime: number
    currentTime: number
    setFullScreen: () => void
    isMuted: boolean
    changeMute: () => void
}

export type TopPlayerPanelData = {
    data: {
        acting: string
        videoId: string
    }[][][]

    changeSeasonState: () => void
    changeSeason: (index: number) => void
    currentSeason: number
    seasonState: string

    changeSerieState: () => void
    changeSerie: (index: number) => void
    currentSerie: number
    serieState: string

    changeActingState: () => void
    changeActing: (index: number) => void
    currentActing: number
    actingState: string
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

export type VideoData = {
    name: string
    series: {
        videoLength: string
        image: string
        videoId: string
        acting: string
    }[][] 
}

export type FilmCategoryData = {
    name: string
    stringName: string
    cards: {
        title: string
        stringName: string
        image: string
        excerpt: string
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
        videoId: string
        acting: string
    }[][]
}

export type SeriesSliderData = {
    series: {
        videoLength: string
        image: string
        videoId: string
        acting: string
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
    screenshots: string[]
    name: string
}

export type ScreenshotsSliderData = {
    screenshots: string[]
}

export type ScreenshotsSliderCardData = {
    image: string
}

export type FilmCategorySliderData = {
    cards: {
        stringName: string
        title: string
        image: string
        excerpt: string
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

export type Comment = {
    userImage: string
    username: string
    comment: string
}

export interface DetachedComment extends Comment {
    film: string,
    url: string
}

export interface CommentsData  {
    comments: DetachedComment[]
}

export type FilmCommentsData = {
    comments: Comment[]
}

export type FilmCategorySliderCardData = {
    stringName: string
    title: string
    imageSize: string
    image: string
    excerpt: string
    languages: string[],
    tags: TagData[]
    comments: number,
    rating: number
}

export type TagData = {
    name: string
    color: string
    genre: string
}