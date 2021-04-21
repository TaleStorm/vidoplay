import { SliderCardData } from '../interfaces'
import Image from 'next/image'
import React, { Component } from "react";

type SliderCardProps = SliderCardData

interface SliderCardState {
}

class SliderCard extends Component<SliderCardProps,SliderCardState> {
	constructor(props: SliderCardProps) {
		super(props);
	}

	

	public render(): React.ReactElement<SliderCardProps> {
	
		return (
			<div className="h-72">
				<Image
					src={`/images/slider.png`}
					alt="Picture of the film"
					layout="fill"
					objectFit="cover"
					className="rounded-lg z-40"
				/>
				<h3 className="font-medium text-3xl text-greySlider m-10 z-50 relative">{this.props.name}</h3>
			</div>
		)
	}
}

export default SliderCard

