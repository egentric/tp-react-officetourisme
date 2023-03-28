import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Navigation from "../../components/Navigation";
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
    <div>
      <Navigation />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Email</th>
              <th>Sujet</th>
              <th>Contenus</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.email}</td>
                <td>{contact.topic}</td>
                <td>{contact.content}</td>
                <td>
                  <Button
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
  );
};
export default Contacts;