import React, { useState } from "react";
import { Person, Address, Contact } from "../../@types/personTypes";
import "./RegisterPerson.css";
import Delete from "../../assets/delete.svg";
import EditHeader from "../../assets/edit-header.svg";
import { useGlobal } from "../../Context/GlobalContext";
import api from "../../Api/fetchData";
import { GetToken, GetUserId } from "../../utils/storage";
import UseToast from "../../Hooks/useToast";
import { format } from "date-fns";

const RegisterPerson: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birth, setBirth] = useState<Date | null>(null);
  const [email, setEmail] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [rg, setRg] = useState<string>("");

  const [place, setPlace] = useState<string>("");
  const [numberHouse, setNumberHouse] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [nameContact, setNameContact] = useState<string>("");
  const [personContact, setPersonContact] = useState<string>("");
  const [typeContact, setTypeContact] = useState<string>("");

  const { user_Id, setUser_Id: handleUserIdChange } = useGlobal();

  const hadleBirthChange = (date: Date | null) => {
    setBirth(date);
  };

  const initialState: Person = {
    name,
    lastName,
    birth,
    email,
    cpf,
    rg,
    addresses: [],
    contacts: [],
  };

  const [formData, setFormData] = useState<Person>(initialState);

  const handleAddPerson = () => {
    const newPerson: Person = {
      name,
      lastName,
      birth,
      email,
      cpf,
      rg,
      addresses: [...formData.addresses],
      contacts: [...formData.contacts],
    };

    setFormData((prevData) => ({
      ...prevData,
      ...newPerson,
    }));

    handleUserIdChange(name);

    setName("");
    setLastName("");
    setBirth(null);
    setEmail("");
    setCpf("");
    setRg("");

    console.log("Dados do Person:", newPerson);
  };

  const handleAddAddress = () => {
    const newAddress: Address = {
      place,
      numberHouse,
      zipCode,
      complement,
      city,
      state,
    };

    setFormData((prevData) => ({
      ...prevData,
      addresses: [...prevData.addresses, newAddress],
    }));

    setPlace("");
    setNumberHouse("");
    setZipCode("");
    setComplement("");
    setCity("");
    setState("");
  };

  const handleAddContact = () => {
    const newContact: Contact = {
      nameContact,
      personContact,
      typeContact,
    };

    setFormData((prevData) => ({
      ...prevData,
      contacts: [...prevData.contacts, newContact],
    }));

    setNameContact("");
    setPersonContact("");
    setTypeContact("");
  };

  const handleRemoveWrapper =
    (type: "address" | "contact", index: number) => () => {
      handleRemove(type, index);
    };

  const handleRemove = (type: "address" | "contact", index: number) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (type === "address") {
        newData.addresses.splice(index, 1);
      } else if (type === "contact") {
        newData.contacts.splice(index, 1);
      }

      return newData;
    });
  };

  const clearFormTables = () => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: [],
      contacts: [],
    }));
  };

  const handleSubmit = async () => {
    try {
      const formattedBirth = birth
        ? format(birth, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
        : null;
      handleAddPerson();
      const token = GetToken();
      const userId = GetUserId();

      const response = await api.post(
        `/cadastroPF/${userId}`,
        {
          person: {
            name,
            lastName,
            birth: formattedBirth,
            email,
            cpf,
            rg,
            addresses: formData.addresses,
            contacts: formData.contacts,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      UseToast(`${response.data.mensagem}`);

      clearFormTables();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);

      UseToast(`Erro: ${error.response.data.mensagem}`, "error");
    }

    // console.log(formData);
    console.log(user_Id);
  };

  return (
    <div>
      <div className="container-sign-pf">
        <div className="left-sign-pf">
          <div className="content">
            <h3>Cadastrar Pessoa Física</h3>

            <form>
              <div className="form-input-person">
                <h2>Dados Pessoais</h2>
                <div className="form-input-person-1">
                  <input
                    id="input-name-sign-pf"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    id="input-last-sign-pf"
                    type="text"
                    placeholder="Sobrenome"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />

                  <input
                    id="input-birth-sign-up"
                    type="date"
                    placeholder="Data de Nascimento"
                    value={birth ? format(birth, "yyyy-MM-dd") : ""}
                    onChange={(e) => hadleBirthChange(new Date(e.target.value))}
                    required
                  />
                </div>

                <div className="form-input-person-2">
                  <input
                    id="input-email-sign-pf"
                    type="text"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    id="input-cpf-sign-up"
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                  <input
                    id="input-rg-sign-up"
                    type="text"
                    placeholder="RG"
                    value={rg}
                    onChange={(e) => setRg(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-input-person">
                <h2>Endereços</h2>
                <div className="form-input-person-1">
                  <input
                    id="input-place-sign-pf"
                    type="text"
                    placeholder="Logradouro"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required
                  />
                  <input
                    id="input-number-sign-pf"
                    type="text"
                    placeholder="Número"
                    value={numberHouse}
                    onChange={(e) => setNumberHouse(e.target.value)}
                    required
                  />

                  <input
                    id="input-ZipCode-sign-up"
                    type="text"
                    placeholder="CEP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-input-person-2">
                  <input
                    id="input-complement-sign-pf"
                    type="text"
                    placeholder="Complemento"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    required
                  />
                  <input
                    id="input-city-sign-up"
                    type="text"
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <input
                    id="input-state-sign-up"
                    type="text"
                    placeholder="Estado"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div className="newAddress">
                  <button onClick={handleAddAddress}>Adicionar Endereço</button>
                </div>

                <div className="address-added">
                  <h2>Endereços Adicionados</h2>

                  <div className="table">
                    <div className="table-header">
                      <div className="header-column">
                        <strong>Logradouro</strong>
                      </div>
                      <div className="header-column">
                        <strong>Número</strong>
                      </div>
                      <div className="header-column">
                        <strong>CEP</strong>
                      </div>

                      <div className="header-column">
                        <strong>Complemento</strong>
                      </div>

                      <div className="header-column">
                        <strong>Cidade</strong>
                      </div>

                      <div className="header-column">
                        <strong>Estado</strong>
                      </div>

                      <div className="line-column action">
                        <img src={EditHeader} alt="edit" />
                      </div>
                    </div>

                    <div className="table-body">
                      {formData.addresses.map((address, index) => (
                        <div className="table-line" key={index}>
                          <div className="line-column">
                            <span>{address.place}</span>
                          </div>
                          <div className="line-column">
                            <span>{address.numberHouse}</span>
                          </div>
                          <div className="line-column">
                            <span>{address.zipCode}</span>
                          </div>

                          <div className="line-column">
                            <span>{address.complement}</span>
                          </div>

                          <div className="line-column">
                            <span>{address.city}</span>
                          </div>

                          <div className="line-column">
                            <span>{address.state}</span>
                          </div>

                          <div className="line-column action">
                            <img
                              src={Delete}
                              alt="delete"
                              onClick={handleRemoveWrapper("address", index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-input-person">
                <h2>Contatos</h2>
                <div className="form-input-person-1">
                  <input
                    id="input-nameContact-sign-pf"
                    type="text"
                    placeholder="Nome"
                    value={nameContact}
                    onChange={(e) => setNameContact(e.target.value)}
                    required
                  />
                  <input
                    id="input-personContact-sign-pf"
                    type="text"
                    placeholder="Contato"
                    value={personContact}
                    onChange={(e) => setPersonContact(e.target.value)}
                    required
                  />

                  <input
                    id="input-typeContact-sign-up"
                    type="text"
                    placeholder="Tipo Contato"
                    value={typeContact}
                    onChange={(e) => setTypeContact(e.target.value)}
                    required
                  />
                </div>

                <div className="newContact">
                  <button onClick={handleAddContact}>Adicionar Contato</button>
                </div>

                <div className="address-added">
                  <h2>Contatos Adicionados</h2>

                  <div className="table">
                    <div className="table-header">
                      <div className="header-column">
                        <strong>Nome</strong>
                      </div>
                      <div className="header-column">
                        <strong>Contato</strong>
                      </div>
                      <div className="header-column">
                        <strong>Tipo Contato</strong>
                      </div>

                      <div className="line-column action">
                        <img src={EditHeader} alt="edit" />
                      </div>
                    </div>

                    <div className="table-body">
                      {formData.contacts.map((contact, index) => (
                        <div className="table-line" key={index}>
                          <div className="line-column">
                            <span>{contact.nameContact}</span>
                          </div>
                          <div className="line-column">
                            <span>{contact.personContact}</span>
                          </div>
                          <div className="line-column">
                            <span>{contact.typeContact}</span>
                          </div>

                          <div className="line-column action">
                            <img
                              src={Delete}
                              alt="delete"
                              onClick={handleRemoveWrapper("contact", index)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn-green" onClick={handleSubmit}>
                Cadastrar Pessoa Física
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPerson;
