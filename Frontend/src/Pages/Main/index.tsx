import Login from "../Login/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function Main() {
  return (
    <>
      <ToastContainer />
      <div>
        <Login />
      </div>
    </>
  );
}

export default Main;
