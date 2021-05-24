import { useContext } from "react"
import AuthModalContext from "../context/authModalContext"
import LoginContext from "../context/loginContext"

const StarIcon = ({index, hoveredscore, setHoveredscore, score, setscore}) => {
    // const StarIcon = ({index, hoveredscore, setHoveredscore, score, setscore,updateFavoriteFilm}) => {

    const authModalContext = useContext(AuthModalContext)
    const loginContext = useContext(LoginContext)
    return (
    <svg 
    onMouseOver={() => {
        setHoveredscore(index)
    }}

    onClick={() => {
        if (loginContext.userToken) {
            setscore(index);
            // updateFavoriteFilm({score: index});
        }
        else {
            authModalContext.setModalOpen(true);
        }
    }}
    className={`cursor-pointer transition-all duration-200`} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.6127 28.9768L15.6118 22.7632L14.9984 22.2869L14.3851 22.7632L6.3816 28.9788C6.38037 28.9756 6.37918 28.9722 6.37808 28.9684L5.41862 29.2503L6.37808 28.9684C6.37034 28.9421 6.37072 28.9122 6.37882 28.8866L6.37901 28.886L9.51423 18.9385L9.72941 18.2558L9.15251 17.832L1.02693 11.863L1.0265 11.8626C1.02625 11.8625 1.01483 11.8534 1.00666 11.8283C0.998347 11.8028 0.9977 11.7727 1.00538 11.746C1.01 11.73 1.0162 11.7197 1.0207 11.7138H11.0219H11.7636L11.9788 11.0041L14.9984 1.0497L18.018 11.0073L18.2332 11.7171H18.975H28.9793C28.9838 11.723 28.99 11.7332 28.9946 11.7492C29.0023 11.7759 29.0017 11.806 28.9934 11.8315C28.9852 11.8567 28.9738 11.8658 28.9735 11.866L28.9734 11.866L20.8447 17.8317L20.2674 18.2554L20.4826 18.9384L23.616 28.8832L23.616 28.8834C23.6219 28.902 23.624 28.9238 23.6209 28.9456L24.6114 29.0834L23.6209 28.9456C23.6193 28.9578 23.6162 28.9682 23.6127 28.9768Z"
        className={`cursor-pointer transition-all duration-200`} 
        fill={`${!score ? hoveredscore >= index ? "#EFCF33" : "transparent" : score >= index ? "#EFCF33" : "transparent"}`}   
        stroke={`${!score ? hoveredscore >= index ? `transparent` : "#8A898F" : score >= index ? "transparent" : "#8A898F"}`} 
        strokeWidth="2" />
    </svg>
    )
}

export default StarIcon