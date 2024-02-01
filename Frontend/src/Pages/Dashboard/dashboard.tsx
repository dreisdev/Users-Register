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

const Dashboard = () => {
  const [dataPerson, setDataPerson] = useState<Person | undefined>();
  // const navigate = useNavigate();

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
  };

  const HandleDelete = () => {
    console.log("handleDelete");
  };
  return (
    <>
      <div className="container-main">
        <main>
          <button className="btn-green" id="btn-new-contact">
            Adicionar
          </button>

          <div className="table">
            <div className="table-header">
              <div className="header-column">
                <strong>Nome</strong>
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
                        <img src={Delete} alt="delete" onClick={HandleDelete} />
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
