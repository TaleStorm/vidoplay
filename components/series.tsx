import React, { Component, useRef } from "react";
import SeriesSlider from '../components/seriesSlider'
import jQuery from "jquery";

import { SeriesData } from '../interfaces'

type SeriesProps = SeriesData

export default class Series extends Component<SeriesProps>  {
    constructor(props: SeriesProps) {
        super(props);
        this.showTab = this.showTab.bind(this);
    }

    public showTab = (e) => {
        // console.log(e.target.getAttribute("data-select"));
        let selectType = e.target.getAttribute("data-select");
      	if (selectType == '1') {
      	    jQuery("#tabs2,#tabs3").hide();
      	    jQuery("#tabs1").show();
      	    jQuery("#one").addClass('text-blue-800 active');
      	    jQuery("#two,#three").removeClass('text-blue-800 active');
      	} else if (selectType == '2') {
      		jQuery("#tabs1,#tabs3").hide();
      	    jQuery("#tabs2").show();
      		jQuery("#two").addClass('text-blue-800 active');
      		jQuery("#one,#three").removeClass('text-blue-800 active').addClass('text-blue-400');
      	} else if (selectType == '3') {
      		jQuery("#tabs2,#tabs1").hide();
      	    jQuery("#tabs3").show();
      	    jQuery("#three").addClass('text-blue-800 active');
      		jQuery("#one,#two").removeClass('text-blue-800 active').addClass('text-blue-400');
      	}
    };
    
    componentDidMount() {
    }

    public render(): React.ReactElement<SeriesProps> {
        return (
            <div>
                <div className="mb-7 mt-10">
                    <div className="p-8">
                        <ul className="list-reset flex">
                            {this.props.series.map((serie, i) => {
                                return <li key={i} className="flex items-center px-2 mr-2 mb-2 text-black-900 border-b-2 border-orange inline w-16">
                                    <a className="text-sm active" data-select={i+1} id={"tabLink"+String(i+1)} onClick={this.showTab}>
                                        {i+1} сезон
                                    </a>
                                </li>
                            })}
                        </ul>
                        <div className="content">
                            {this.props.series.map((serie, i) => {
                                return <div  key={i} id={"tabs"+String(i+1)}>
                                    <SeriesSlider series={this.props.series[i]} />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}