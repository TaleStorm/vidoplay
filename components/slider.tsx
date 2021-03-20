import React, { Component } from "react";
import SliderCard from '../components/sliderCard'
import { Carousel } from 'antd';
// import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { SliderData } from '../interfaces'

type SliderProps = SliderData

export default class Slider extends Component<SliderProps>  {
  constructor(props: SliderProps) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.carousel  = React.createRef();
  }

  public next() {
    this.carousel.next();
  }
  public previous() {
    this.carousel.prev();
  }

  public render(): React.ReactElement<SliderProps> {
    const settings = {
      dots: true,
      infinite: true,
      rows: 1,
      slidesPerRow: 1,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
    };
    return (
      <div className="relative">
        <Carousel autoplay dotPosition="bottom" id="carousel" ref={node => (this.carousel = node)} {...settings}>
          {this.props.cards.map((card, i) => {    
            return <SliderCard 
              key={i} 
              name={card.name} 
              description={card.name} 
              image={card.image}
              nextFunction={this.next}
              prevFunction={this.previous}
            />
          })}
        </Carousel>

        <div  className="ml-5 absolute inset-y-0 left-0 h-full flex flex-wrap content-center inline-block" onClick={this.previous}>
				<svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M18.4375 35.875L1.5625 19L18.4375 2.125" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round" strokeLinejoin="round"/>
				</svg>
				</div>
          
        <div  className="mr-5 absolute inset-y-0 right-0 h-full flex flex-wrap content-center inline-block" onClick={this.next}>
				<svg width="20" height="38" viewBox="0 0 20 38" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1.5625 2.125L18.4375 19L1.5625 35.875" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round" strokeLinejoin="round"/>
				</svg>
				</div>
      </div>
    );
  }
}