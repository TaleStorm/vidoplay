import Swal from "sweetalert2";

const GoodToast = (title) => {
    Swal.fire({
        position: "bottom",
        title: title,
        customClass: {
          closeButton: "absolute right-4 top-4",
          container: "relaive max-w-full w-195",
          title: "font-normal pb-10 text-white",
        },
        showClass: {
          popup: "swal2-noanimation",
          backdrop: "swal2-noanimation",
        },
        hideClass: {
          popup: "",
          backdrop: "",
        },
        buttonsStyling: false,
        showCloseButton: true,
        showConfirmButton: false,
        timer: 50000,
        background: "#F8634A",
        toast: true,
      });
}

export default GoodToast