import { SliderCardData } from '../interfaces'
import Image from 'next/image'
import React, { Component } from "react";

const SliderCard = ({image, onClick, link}) => {
	return (
		<a 
		href={link} className="h-full w-full grid">
			<div  
			style={{
				backgroundImage: `url(${image})`
			}}
			className={`sm:h-72 h-40 w-full object-fill bg-center`}/>
			</a>
	)
}

export default SliderCard

