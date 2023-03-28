import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowContact = () => {
  const [showContact, setShowContact] = useState([]);
  useEffect(() => {
    displayShowContact();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowContact = async () => {
    await axios.get("http://localhost:8000/api/contacts/${id}").then((res) => {
      setShowContact(res.data.data);
    });
  };
  const deleteShowContact = (id) => {
    axios
      .delete(`http://localhost:8000/api/contacts/${id}`)
      .then(displayShowContact);
  };

  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Sujet</th>
              <th>Contenu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {showContact.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.email}</td>
                <td>{contact.topic}</td>
                <td>{contact.content}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteShowContact(contact.id);
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
  );
};

export default ShowContact;
