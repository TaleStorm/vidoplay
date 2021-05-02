import { MutableRefObject, useEffect, useRef } from "react";
import doramas from "../../data/doramas";
import PlayerFilmCard from "../filmCards/playerFilmCard";

const PlayerModalOverlay = ({ modalOpen, setModalOpen, classes="", children }) => {
    const modalOverlayRef = useRef() as MutableRefObject<HTMLDivElement>;
    const modalWrap = useRef() as MutableRefObject<HTMLDivElement>;
    const thirdWrap = useRef() as MutableRefObject<HTMLDivElement>;


    useEffect(() => {
        if (modalOpen) {
            modalOverlayRef.current.style.height = "";
        } else {
            setTimeout(() => {
                modalOverlayRef.current.style.height = "0px";
            }, 500);
        }

    }, [modalOpen]);

    return (
        <div
            onClick={(e) => {
                if (
                    e.target === modalOverlayRef.current ||
                    e.target === modalWrap.current ||
                    e.target === thirdWrap.current
                ) {
                    setModalOpen();
                }
            }}
            ref={modalOverlayRef}
            style={{
                height: "0px",
            }}
            className={`${modalOpen ? "opacity-100" : "opacity-0"
                } h-full absolute top-0 left-0 z-40 bg-black bg-opacity-25 w-full overflow-y-auto flex justify-center transition-opacity duration-500`}
        >
            <div
                ref={modalWrap}
                className={`w-full h-auto flex justify-center ${classes}`}
            >
                <div 
                ref={thirdWrap} 
                className={`h-auto flex justify-center items-center w-full`}>
                    {children}
                </div>
                    
            </div>
        </div>
    );
};

export default PlayerModalOverlay