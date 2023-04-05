import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./Logo";
import axios from "axios";

const Navigation = ({ onSelect }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    displayTypes();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      setTypes(res.data.data);
    });
  };
  // const handleTypeSelection = (eventKey) => {
  //   const selectedType = types.find((type) => type.nameType === eventKey);
  //   onSelect(selectedType);
  // };

  return (
    <Navbar bg="light" expand="lg" className="navOmbre fixed-top">
      <Container>
        <Navbar.Brand href="/home" className="logo">
          <Logo /> Guenrouet Tourisme
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/items/affs" className="navLink">
              Articles
            </Nav.Link>
            <Nav.Link href="/events/affs" className="navLink">
              Evénements
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
            <Nav.Link href="#link" className="connex">
              Connexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
