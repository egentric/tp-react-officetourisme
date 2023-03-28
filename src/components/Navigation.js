import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "./Logo";

const navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="navOmbre fixed-top">
      <Container>
        <Navbar.Brand href="#home" className="logo">
          <Logo /> Guenrouet Tourisme
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" className="navLink">
              Articles
            </Nav.Link>
            <Nav.Link href="#link" className="navLink">
              Evénements
            </Nav.Link>
            <NavDropdown
              title="Nos Sites"
              id="basic-nav-dropdown"
              className="navLink"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link" className="navLink">
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

export default navigation;
