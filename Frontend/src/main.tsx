import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { GlobalProvider } from "./Context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <ToastContainer />

        <MainRoutes />
      </BrowserRouter>
    </GlobalProvider>
  </React.StrictMode>
);
