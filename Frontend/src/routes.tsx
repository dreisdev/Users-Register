import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/Sign-Up/signUp";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<SignUp />} />
    </Routes>
  );
};

export default MainRoutes;
