import "./login.css";
import BackgrounLeft from "../../assets/backgrounf-left.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { LoginData } from "../../@types/loginTypes";
import api from "../../Api/fetchData";
import UseToast from "../../Hooks/useToast";
import { SetId, SetToken } from "../../utils/storage";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const login: LoginData = {
        email,
        password,
      };

      const response = await api.post("/login", login);

      UseToast(`${response.data.mensagem}`);

      SetToken(response.data.token);
      SetId(response.data.userId);

      setEmail("");
      setPassword("");
      navigate("/dashboard");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      UseToast(`Erro: ${error.response.data.mensagem}`, "error");
    }
  };
  return (
    <div className="container-sign-in">
      <div className="left-sign-in">
        <img src={BackgrounLeft} alt="background-left" />
      </div>

      <div className="right-sign-in">
        <div className="content-right-sign-in">
          <span>Bem vindo</span>
          <h2>Faça o login com sua conta</h2>

          <form>
            <input
              id="input-email"
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="input-password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn-green" onClick={handleLogin}>
              Login
            </button>
          </form>

          <span>
            Não tem cadastro?
            <Link to={"/cadastro"}>
              <a href="#">Clique aqui!</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
