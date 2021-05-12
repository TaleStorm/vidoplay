import { useEffect, useState } from "react";

const useSanitize = text => {
    const [sanitizedText, setSanitizedText] = useState("")
	useEffect(() => {
			const div = document.createElement("div");
			console.log(text)
			div.innerHTML = text
			setSanitizedText(div.textContent || div.innerText || "") 
	}, [])
    return sanitizedText
}

export default useSanitize