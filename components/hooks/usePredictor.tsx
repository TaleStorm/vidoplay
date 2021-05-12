import axios from "axios";
import { useEffect, useState } from "react";

const usePredictor = id => {
    const [predictions, setPredictions] = useState([])
	useEffect(() => {
        const fetchPredicitons = async () => {
            const result = await axios.post("/api/predictions", {
                
            })
            setPredictions(result.data)
        }
        fetchPredicitons()
	}, [])
    return predictions
}

export default usePredictor