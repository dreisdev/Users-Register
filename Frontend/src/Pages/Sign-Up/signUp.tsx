import React, { ChangeEvent, useState } from "react";
import "./signUp.css";
import { Link } from "react-router-dom";
import api from "../../Api/fetchData";
import UseToast from "../../Hooks/useToast";

const SignUp: React.FC = () => {
  const [imagem, setImagem] = useState<string | null>(null);
  const [username, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formData, setFormData] = useState(new FormData());

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagem(e.target?.result as string);
      };

      reader.readAsDataURL(file);

      const newFormData = new FormData();
      newFormData.set("imagem", file);
      setFormData(newFormData);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      formData.append("username", username);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("imagem", `${imagem}`);

      const response = await api.post("/cadastroUsuario", formData);

      UseToast(`${response.data.mensagem}`);

      setUserName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setImagem(null);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      UseToast(`Erro: ${error.response.data.mensagem}`);
    }
  };

  return (
    <div className="container-sign-up">
      <div className="left-sign-up">
        <div className="content-left">
          <h3>Cadastre-se</h3>

          <form>
            <div className="form-input">
              <div className="form-input-1">
                <input
                  id="input-name-sign-up"
                  type="text"
                  placeholder="Nome"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <input
                  id="input-email-sign-up"
                  type="text"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-input-2">
                <input
                  id="input-email-sign-up"
                  type="text"
                  placeholder="Telefone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <input
                  id="input-password-sign-up"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="btn-green" onClick={handleSignUp}>
              Cadastrar Usuário
            </button>
          </form>

          <span>
            Já tem cadastro?
            <Link to="/login">
              <a href="#">Clique aqui!</a>
            </Link>
          </span>
        </div>
      </div>

      <div className="right-sign-up">
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {imagem && <img src={imagem} alt="uploaded" />}
      </div>
    </div>
  );
};

export default SignUp;
