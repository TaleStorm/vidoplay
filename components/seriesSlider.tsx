import React, { Component, useRef } from "react";
import SeriesSliderCard from '../components/seriesSliderCard'
import { Carousel } from 'antd';


import { SeriesSliderData } from '../interfaces'

type SeriesSliderProps = SeriesSliderData

export default class SeriesSlider extends Component<SeriesSliderProps>  {
  private carousel: React.MutableRefObject<typeof Carousel | null>;

  constructor(props: SeriesSliderProps) {
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


  public render(): React.ReactElement<SeriesSliderProps> {

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

              {this.props.series.map((serie, i) => {
                  return <div key={i} className="mr-5">
                      <SeriesSliderCard 
                        id={i}
                        videoLength={serie.videoLength} 
                        image={serie.image}
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