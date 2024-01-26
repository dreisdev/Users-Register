import { toast } from "react-toastify";

type ToastStatus = "success" | "error" | null;

const useToast = (msg: string, status: ToastStatus = null): void => {
  if (!status) {
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  } else if (status === "error") {
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    });
  }
};

export default useToast;
