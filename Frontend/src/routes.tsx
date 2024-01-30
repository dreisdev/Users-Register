import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Login from "./Pages/Login/login";
import SignUp from "./Pages/Sign-Up/signUp";
import Header from "./Components/Header/Header";
import Dashboard from "./Pages/Dashboard/dashboard";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Header />
            <Dashboard />
          </>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
