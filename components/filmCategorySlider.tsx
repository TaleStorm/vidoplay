import React, { Component, useRef } from "react";
import FilmCategorySliderCard from '../components/filmCategorySliderCard'
import { Carousel } from 'antd';

import { FilmCategorySliderData } from '../interfaces'

type FilmCategorySliderProps = FilmCategorySliderData

export default class FilmCategorySlider extends Component<FilmCategorySliderProps>  {
  private carousel: React.MutableRefObject<typeof Carousel | null>;

  constructor(props: FilmCategorySliderProps) {
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
    // console.log(this.carousel)
  }


  public render(): React.ReactElement<FilmCategorySliderProps> {

    const settings = {
      autoplay: false,
      dots: false,
      infinite: true,
      rows: 1,
      slidesPerRow: 1,
      slidesToShow: this.props.cardToShow,
      speed: 500,
      arrows: false,
      slidesToScroll: 1,
    };
    return (
      <div className="relative">
        <Carousel id="carousel" ref={this.carousel} {...settings}>
            

              {this.props.cards.map((card, i) => {
                  return <div key={i} className="mr-5">
                      <FilmCategorySliderCard 
                        name={card.name} 
                        image={card.image}
                        imageSize={this.props.cardToShow == 2 ? "72" : "52"}
                        description={card.description}
                        languages={card.languages}
                        tags={card.tags}
                        comments={card.comments}
                        rating={card.rating}
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