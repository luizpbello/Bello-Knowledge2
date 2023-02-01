import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "success" | "error" | "info" | "warning"

const defaultMessages = {
    success: "Operação realizada com sucesso.",
    error: "Ocorreu um erro.",
    info: "Informação importante.",
    warning: "Atenção, algo está errado.",
  };
  

export const myToast = (type: ToastType, message = "") => {
    const defaultMessage = defaultMessages[type];
    const toastMessage = message || defaultMessage;
  
    const toastContainer = toast[type](toastMessage, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return toastContainer;
  };
export default {myToast}