import { SliderCardData } from '../interfaces'
import Image from 'next/image'
import React, { Component } from "react";

const SliderCard = ({image, onClick, link}) => {
	return (
		<a 
		href={link} className="h-full w-full grid">

			<div  
			className={`sm:h-72 h-40 w-full  bg-center bg-no-repeat`}>
				<Image
				src={image}
				layout="fill"
				objectFit="cover"
				className="z-40"
				/>
			</div>
			</a>
	)
}

export default SliderCard

