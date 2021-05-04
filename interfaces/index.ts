// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';
export type PlayerData = {
    width: string
    height: string
    name: string
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
    setDrag: (boolean) => void
}

export type TopPlayerPanelData = {
    data: {
        acting: string
        videoId: string
        // videoLength: string
        // image: string
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
    onClick?:Function
}

export type SliderData = {
    cards: {
        name: string
        image: string
        onClick?: Function
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
    movieId: string, 
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
    country: Object
    janr: string
    director: Object
    operator: Object
    screenwriter: Object
    producer: Object
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
    comments: Comment[],
    movieId: string
}

export interface InputProps  {
    label: string,
    name: string,
    type?: string,
    placeholder?:string,
    disabled?: boolean,
    state: string,
    validator?: Function,
    error?: boolean,
    setError?: Function,
    setState: Function,
    errorMessage?: string,
    onBlur?: Function,
}

export interface ResizableInputProps extends InputProps {
    rows?: number
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

export type PartnerSliderCardData = {
    title: string
    image: string
    discription: string
    age: number
}

export type PartnerSliderData = {
    cards: PartnerSliderCardData[]
    cardToShow: number
    sliderIndex: number
}