import "./Header.css";

import Logo from "../../assets/logo.png";
import LogoOut from "../../assets/logout.png";
import { useGlobal } from "../../Context/GlobalContext";
import api from "../../Api/fetchData";
import { useEffect, useState } from "react";
import { GetToken, GetUserId, LogoutUser } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user_Id, setDataUser: handleUserData } = useGlobal();
  const [name, setName] = useState<string>("");
  const [imageProfile, setImageProfile] = useState<string>("");

  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutUser();
    navigate("/login");
  };

  const token = GetToken();
  const userId = GetUserId();

  const fetchUserData = async () => {
    try {
      const response = await api.get(`/listaPF/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setName(response.data.UserPersons.username);
      setImageProfile(response.data.UserPersons.imagem.url);

      handleUserData(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      console.log(user_Id);

      console.error(
        "Erro ao fazer a solicitação:",
        error.response.data.mensagem
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <>
      <header>
        <div className="profile-content">
          <p>Olá, {name}!</p>
          <img className="profile" src={imageProfile} alt="profile" />
        </div>

        <img className="logo" src={Logo} alt="logo" />
        <img
          className="sign-out"
          src={LogoOut}
          alt="logout"
          onClick={handleLogout}
        />
      </header>
    </>
  );
};

export default Header;
