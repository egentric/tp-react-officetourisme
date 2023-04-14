import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navigation = ({ onSelect }) => {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // initialiser isConnected à false
  // On récupère l'id du user
  const [userId, setUserId] = useState("");

  const displayUsers = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUserId(res.data.id);
      });
  };

  // console.log(isConnected);
  useEffect(() => {
    displayTypes();
    displayUsers();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      setTypes(res.data.data);
    });
  };

  const removeToken = () => {
    localStorage.removeItem("access_token");
    // console.log("test");
    setIsConnected(false);
    navigate("/home");
  };
  // Vérifier si le token est présent dans localStorage et mettre à jour l'état isConnected en conséquence
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsConnected(true);
    }
  }, []);

  return (
    <Navbar bg="light" expand="lg" className="navOmbre fixed-top">
      <Container>
        <Navbar.Brand href="/home" className="logo">
          <Logo /> Guenrouet Tourisme
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isConnected && (
              <Nav.Link href={`/dashboard/${userId}`} className="navLink">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-speedometer2"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z" />
                  <path
                    fill-rule="evenodd"
                    d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
                  />
                </svg>
              </Nav.Link>
            )}
            <Nav.Link href="/items/affs" className="navLink">
              Articles
            </Nav.Link>
            <Nav.Link href="/events/affs" className="navLink">
              Événements
            </Nav.Link>
            <NavDropdown
              title="Nos Sites"
              id="basic-nav-dropdown"
              className="navLink"
            >
              {types.map((type) => (
                <div key={type.id}>
                  <NavDropdown.Item
                    href={`/sites/affs/${type.id}`}
                    eventKey={type.nameType}
                  >
                    {type.nameType}
                  </NavDropdown.Item>
                </div>
              ))}
            </NavDropdown>
            <Nav.Link href="/contacts/add" className="navLink">
              Contacts
            </Nav.Link>
            {isConnected ? (
              <Nav.Link className="connex" onClick={removeToken}>
                Déconnexion
              </Nav.Link>
            ) : (
              <Nav.Link href="/login" className="connex">
                Connexion
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
