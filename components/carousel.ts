import * as React from 'react';
import { Settings } from '@ant-design/react-slick';
export declare type CarouselEffect = 'scrollx' | 'fade';
export declare type DotPosition = 'top' | 'bottom' | 'left' | 'right';
export interface CarouselProps extends Omit<Settings, 'dots' | 'dotsClass'> {
    effect?: CarouselEffect;
    style?: React.CSSProperties;
    prefixCls?: string;
    slickGoTo?: number;
    dotPosition?: DotPosition;
    children?: React.ReactNode;
    dots?: boolean | {
        className?: string;
    };
    next: () => void;
    prev: () => void;
}
export interface CarouselRef {
    goTo: (slide: number, dontAnimate?: boolean) => void;
    next: () => void;
    prev: () => void;
    autoPlay: boolean;
    innerSlider: any;
}
declare const Carousel: React.Component<CarouselProps & React.RefAttributes<CarouselRef>>;
export default Carousel;
