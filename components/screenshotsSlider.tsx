import React, { Component, useRef } from "react";
import ScreenshotsSliderCard from '../components/screenshotsSliderCard'
import { Carousel } from 'antd';


import { ScreenshotsSliderData } from '../interfaces'

type ScreenshotsSliderProps = ScreenshotsSliderData

export default class ScreenshotsSlider extends Component<ScreenshotsSliderProps>  {
  private carousel: React.MutableRefObject<typeof Carousel | null>;

  constructor(props: ScreenshotsSliderProps) {
    super(props);
    this.carousel  = React.createRef<typeof Carousel | null>();
    
    this.next = this.next.bind(this);
  }

  public next = () => {
    console.log(this.carousel)

    const node = this.carousel.current
    if (node) {
      node.next();
    }
    
  };

  componentDidMount() {
  }


  public render(): React.ReactElement<ScreenshotsSliderProps> {

    const settings = {
      autoplay: false,
      dots: false,
      infinite: true,
      rows: 1,
      slidesPerRow: 1,
      slidesToShow: 5,
      speed: 500,
      arrows: false,
      slidesToScroll: 1,
    };
    return (
      <div className="relative">
        <Carousel ref={node => (this.carousel.current = node)} {...settings}>

              {this.props.screenshots.map((screenshot, i) => {
                  return <div key={i} className="mr-5">
                      <ScreenshotsSliderCard 
                        image={screenshot.image}
                      />
                    </div>
                })}
      
        </Carousel>
        <div  className="-mr-8 absolute inset-y-0 right-0 h-full flex flex-wrap content-center inline-block" onClick={this.next}>
          <svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="white" strokeMiterlimit="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
				</div>
      </div>
    );
  }
}