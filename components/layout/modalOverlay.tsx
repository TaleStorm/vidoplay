import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef } from "react";

const ModalOverlay = ({ children, modalOpen, setModalOpen, classes }) => {
    const modalOverlayRef = useRef() as MutableRefObject<HTMLDivElement>;
    const modalWrap = useRef();

    useEffect(() => {
        const body = document.querySelector("body")
        if (modalOpen) {
            body.style.overflow = "hidden"
        } else {
            body.style.overflow = ""
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
            className={`${modalOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } h-screen fixed top-0 left-0 z-40 bg-black bg-opacity-25 w-full overflow-y-auto flex justify-center transition-all duration-500`}
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
