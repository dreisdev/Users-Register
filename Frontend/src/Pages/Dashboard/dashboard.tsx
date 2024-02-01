import "./dashboard.css";

import Delete from "../../assets/delete.svg";
import Edit from "../../assets/edit.svg";
import EditHeader from "../../assets/edit-header.svg";
// import { useNavigate } from "react-router-dom";
import { GetToken, GetUserId } from "../../utils/storage";
import api from "../../Api/fetchData";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Person } from "../../@types/personTypes";
import UseToast from "../../Hooks/useToast";
import Modal from "../../Components/Modal/modal";

// import { useParams } from "react-router-dom";

const Dashboard = () => {
  const [dataPerson, setDataPerson] = useState<Person | undefined>();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = async () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    fetchPersonData();
  };
  // const navigate = useNavigate();

  // const { id } = useParams();

  const token = GetToken();
  const userId = GetUserId();

  const fetchPersonData = async () => {
    try {
      const response = await api.get(`/listaPF/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDataPerson(response.data.UserPersons.person);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Erro ao fazer a solicitação:",
        error.response.data.mensagem
      );
    }
  };

  useEffect(() => {
    fetchPersonData();
    console.log(dataPerson);
  }, [userId]);

  const HandleEdit = () => {
    console.log("handleEdit");

    openModal();
  };

  const HandleDelete = async (personId: string) => {
    console.log("id extraido:", personId);

    try {
      const response = await api.delete(`/excluirPF/${userId}/${personId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      UseToast(`${response.data.mensagem}`);

      fetchPersonData();

      console.log(response.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      UseToast(`Erro: ${error.response.data.mensagem}`, "error");
    }
  };

  return (
    <>
      <div className="container-main">
        <main>
          <button
            className="btn-green"
            id="btn-new-contact"
            onClick={() => openModal()}
          >
            Adicionar
          </button>

          <Modal isOpen={isModalOpen} onClose={closeModal} />

          <div className="table">
            <div className="table-header">
              <div className="header-column">
                <strong>Nome </strong>
              </div>
              <div className="header-column">
                <strong>Sobrenome</strong>
              </div>
              <div className="header-column">
                <strong>Email</strong>
              </div>

              <div className="header-column">
                <strong>Data de Nascimento</strong>
              </div>

              <div className="line-column action">
                <img src={EditHeader} alt="edit" />
              </div>
            </div>

            <div className="table-body">
              {Array.isArray(dataPerson)
                ? dataPerson.map((person: Person) => (
                    <div className="table-line" key={person._id}>
                      <div className="line-column">
                        <span>{person.name}</span>
                      </div>
                      <div className="line-column">
                        <span>{person.lastName}</span>
                      </div>
                      <div className="line-column">
                        <span>{person.email}</span>
                      </div>

                      <div className="line-column">
                        <span>
                          {person.birth
                            ? format(new Date(person.birth), "dd/MM/yyyy")
                            : "Data não inserida"}
                        </span>
                      </div>

                      <div className="line-column action">
                        <img src={Edit} alt="edit" onClick={HandleEdit} />
                        <img
                          src={Delete}
                          alt="delete"
                          onClick={() => HandleDelete(person._id as string)}
                        />
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
