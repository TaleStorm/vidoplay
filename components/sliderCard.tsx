import { SliderCardData } from '../interfaces'
import Image from 'next/image'
import React, { Component } from "react";

const SliderCard = ({image, onClick, link}) => {
	return (
		<a 
		href={link} className="h-full w-full grid">

			<div  
			className={` w-full  bg-center bg-no-repeat`}>
				<img src={image} className={`w-full`} alt="" />
			</div>
			</a>
	)
}

export default SliderCard

