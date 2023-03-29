import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    displayContacts();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayContacts = async () => {
    await axios.get("http://localhost:8000/api/contacts").then((res) => {
      setContacts(res.data.data);
    });
  };
  const deleteContact = (id) => {
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`)
      .then(displayContacts);
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
                  <h4 className="card-title">Contacts</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Sujet</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.email}</td>
                          <td>{contact.topic}</td>
                          <td>
                            <Link
                              to={`/contacts/show/${contact.id}`}
                              className="btn btn-2 btn-sm me-2"
                            >
                              Voir
                            </Link>

                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteContact(contact.id);
                              }}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
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
export default Contacts;
