import { useEffect, useState } from "react";

const useSanitize = text => {
    const [sanitizedText, setSanitizedText] = useState("")
	useEffect(() => {
			const div = document.createElement("div");
			div.innerHTML = text
			setSanitizedText(div.textContent || div.innerText || "") 
	}, [text])
    return sanitizedText
}

export default useSanitize