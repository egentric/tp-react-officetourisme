import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [types, setTypes] = useState([]);
  const [events, setEvents] = useState([]);
  const [items, setItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [sites, setSites] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    displayTypes();
    displayEvents();
    displayItems();
    displayComments();
    displaySites();
    displayContacts();
    displayUsers();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      const allTypes = res.data.data;
      const lastThreeTypes = allTypes.slice(-3);
      setTypes(lastThreeTypes);
    });
  };

  const displayEvents = async () => {
    await axios.get("http://localhost:8000/api/events").then((res) => {
      const allEvents = res.data.data;
      const lastThreeEvents = allEvents.slice(-3);
      setEvents(lastThreeEvents);
    });
  };

  const displayItems = async () => {
    await axios.get("http://localhost:8000/api/items").then((res) => {
      const allItems = res.data.data;
      const lastThreeItems = allItems.slice(-3);
      setItems(lastThreeItems);
    });
  };
  const displayComments = async () => {
    await axios.get("http://localhost:8000/api/comments").then((res) => {
      const allComments = res.data.data;
      const lastThreeComments = allComments.slice(-3);
      setComments(lastThreeComments);
    });
  };
  const displaySites = async () => {
    await axios.get(`http://localhost:8000/api/sites`).then((res) => {
      const allSites = res.data.data;
      const lastThreeSites = allSites.slice(-3);
      setSites(lastThreeSites);
    });
  };
  const displayContacts = async () => {
    await axios.get("http://localhost:8000/api/contacts").then((res) => {
      const allContacts = res.data.data;
      const lastThreeContacts = allContacts.slice(-3);
      setContacts(lastThreeContacts);
    });
  };
  const displayUsers = async () => {
    await axios.get("http://localhost:8000/api/users").then((res) => {
      const allUsers = res.data.data;
      const lastThreeUsers = allUsers.slice(-3);
      setUsers(lastThreeUsers);
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <Row>
            {/* =======================EVENEMENTS======================= */}
            <div className="col-4 col-sm-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">événements</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Titres</th>
                        {/* <th>Soustitres</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event) => (
                        <tr key={event.id}>
                          <td>{event.titleEvent}</td>
                          {/* <td>{event.subtitleEvent}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* =======================ITEMS======================= */}
            <div className="col-4 col-sm-12 col-md-4">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">articles</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Titres</th>
                        {/* <th>Soustitres</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.titleItem}</td>
                          {/* <td>{item.subtitleItem}</td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* =======================COMMENTS======================= */}
            <div className="col-4 col-sm-12 col-md-4 ">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Commentaires</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Titres</th>
                        <th>De l'articles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments.map((comment) => (
                        <tr key={comment.id}>
                          <td>{comment.titleComment}</td>
                          <td>{comment.titleItem}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Row>
          <Row className="row justify-content-center">
            {/* =======================SITES======================= */}
            <div className="col-6 col-sm-12 col-md-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Sites</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Noms</th>
                        <th>Types</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sites.map((site) => (
                        <tr key={site.id}>
                          <td>{site.nameSite}</td>
                          <td>{site.type.nameType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* =======================TYPES======================= */}
            <div className="col-4 col-sm-12 col-md-4 mt-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Types</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Types</th>
                      </tr>
                    </thead>
                    <tbody>
                      {types.map((type) => (
                        <tr key={type.id}>
                          <td>{type.nameType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Row>
          <Row>
            {/* =======================Contact======================= */}
            <div className="col-6 col-sm-12 col-md-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Contacts</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Sujet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id}>
                          <td>{contact.email}</td>
                          <td>{contact.topic}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            {/* =======================Utilisateurs======================= */}
            <div className="col-6 col-sm-12 col-md-6 mt-3">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Utilisateurs</h4>
                  <hr />
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Prénoms</th>
                        <th>Noms</th>
                        <th>Roles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
