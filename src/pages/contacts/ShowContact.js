import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ShowContact = () => {
  const { contact } = useParams();
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState([]);

  useEffect(() => {
    displayShowContact();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowContact = async () => {
    await axios
      .get(`http://localhost:8000/api/contacts/${contact}`)
      .then((res) => {
        console.log(res.data);
        setShowContact(res.data[0]);
        // console.log(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteShowContact = (id) => {
    axios.delete(`http://localhost:8000/api/contacts/${id}`).then(() => {
      displayShowContact();
      navigate(-1); // Navigation à la page précédente
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Contact</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Email</th>
                        <td>{showContact.email}</td>
                      </tr>
                      <tr>
                        <th>Contenu</th>
                        <td>{showContact.topic}</td>
                      </tr>
                      <tr>
                        <th>De l'article</th>
                        <td>{showContact.content}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{showContact.created_at}</td>
                      </tr>

                      <tr>
                        <th>Actions</th>
                        <td>
                          <Button
                            className="btn-1 btn-sm me-2"
                            onClick={() => navigate(-1)}
                          >
                            Retour
                          </Button>
                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => {
                              deleteShowContact(showContact.id);
                            }}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowContact;
