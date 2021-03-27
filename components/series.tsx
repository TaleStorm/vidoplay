import React, { Component } from "react";
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
        let selectType = e.target.getAttribute("data-select");
        jQuery(".tabs").hide();
        jQuery("#tabs"+selectType).show();
        jQuery(".tabLinks").parent().removeClass('border-b-2 active');
        jQuery("#tabLink"+selectType).parent().addClass('border-b-2 active');
    };
    
    componentDidMount() {
    }

    public render(): React.ReactElement<SeriesProps> {
        return (
            <div className="py-10">
                        <ul className="list-reset flex px-3 mb-3">
                            {this.props.series.map((serie, i) => {
                                return <li key={i} className={i==0 ? "flex active items-center p-2 mr-2 mb-2 border-b-2 border-orange inline w-16" : "flex items-center p-2 mr-2 mb-2 border-orange inline w-16"}>
                                    <a className=" tabLinks text-sm hover:text-orange" data-select={i+1} id={"tabLink"+String(i+1)} onClick={this.showTab}>
                                        {i+1} сезон
                                    </a>
                                </li>
                            })}
                        </ul>
                        <div className="content mt-3">
                            {this.props.series.map((serie, i) => {
                                return <div  key={i} id={"tabs"+String(i+1)} className={i==0 ? "tabs" : "hidden tabs"}>
                                    <SeriesSlider series={this.props.series[i]} />
                                </div>
                            })}
                        </div>
            </div>
        );
    }
}