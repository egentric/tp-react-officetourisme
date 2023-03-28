import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [firstNameUser, setFirstNameUser] = useState("");
  const [lastNameUser, setLastNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [roleUser, setRoleUser] = useState(null);
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`)
      .then((res) => {
        console.log(res.data);
        setFirstNameUser(res.data.firstNameUser);
        setLastNameUser(res.data.lastNameUser);
        setEmailUser(res.data.emailUser);
        setRoleUser(res.data.roleUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fonction de modification d'article
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("firstNameUser", firstNameUser);
    formData.append("lastNameUser", lastNameUser);
    formData.append("emailUser", emailUser);
    formData.append("roleUser", roleUser);

    await axios
      .post(`http://localhost:8000/api/users/${user}`, formData)
      .then(navigate("/users"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <Navigation />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un utilisateur</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={updateUser}>
                    <Row>
                      <Col>
                        <Form.Group controlId="firstNameUser">
                          <Form.Label>Prénom</Form.Label>
                          <Form.Control
                            type="text"
                            value={firstNameUser}
                            onChange={(event) => {
                              setFirstNameUser(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group controlId="lastNameUser">
                          <Form.Label>Nom</Form.Label>
                          <Form.Control
                            type="text"
                            value={lastNameUser}
                            onChange={(event) => {
                              setLastNameUser(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="emailUser">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            value={emailUser}
                            onChange={(event) => {
                              setEmailUser(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="RoleUser">
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Utilisateur"
                            value="user"
                          />
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Administrateur"
                            value="admin"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      variant="primary"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Modifier
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
