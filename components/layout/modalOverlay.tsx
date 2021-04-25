import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef } from "react";

const ModalOverlay = ({ children, modalOpen, setModalOpen, classes }) => {
    const modalOverlayRef = useRef() as MutableRefObject<HTMLDivElement>;
    const modalWrap = useRef();
    const { pathname } = useRouter();

    useEffect(() => {
        const body = document.querySelector("body")
        if (modalOpen) {
            body.style.overflow = "hidden"
            modalOverlayRef.current.style.height = "";
        } else {
            body.style.overflow = ""
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
                    e.target === modalWrap.current
                ) {
                    setModalOpen();
                }
            }}
            ref={modalOverlayRef}
            style={{
                height: "0px",
            }}
            className={`${modalOpen ? "opacity-100" : "opacity-0"
                } h-screen fixed top-0 left-0 z-40 bg-black bg-opacity-25 w-full overflow-y-auto flex justify-center transition-opacity duration-500`}
        >
            <div
                ref={modalWrap}
                className={`w-full h-0 flex justify-center ${classes}`}
            >
                <div className={`h-auto w-full`}>
                {children}
                </div>
                    
            </div>
        </div>
    );
};

export default ModalOverlay;
