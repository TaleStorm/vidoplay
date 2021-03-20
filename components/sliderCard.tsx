import { SliderCardData } from '../interfaces'
import React, { Component } from "react";

type SliderCardProps = SliderCardData

class SliderCard extends React.Component {
	constructor(props: SliderCardProps) {
		super(props);
	}
	
	public render(): React.ReactElement<SliderCardProps> {
	
		return (
			<div className="bg-slider h-72 bg-cover bg-no-repeat rounded relative flex flex-wrap content-end">
				
				<h3 className="font-medium text-3xl text-greySlider m-10">{this.props.name}</h3>

			</div>
		)
	}
}

export default SliderCard

