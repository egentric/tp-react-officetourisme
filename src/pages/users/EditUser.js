import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const EditUser = () => {
  const { user } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRole] = useState("");
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getUser();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getUser = async () => {
    await axios
      .get(`http://localhost:8000/api/users/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setFirstName(res.data.data.firstName);
        setLastName(res.data.data.lastName);
        setEmail(res.data.data.email);
        setRole(res.data.data.role_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fonction de modification d'article
  const updateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("role_id", role_id);

    await axios
      .post(`http://localhost:8000/api/users/${user}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/users"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-10">
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
                          <Form.Group controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                              type="text"
                              value={firstName}
                              onChange={(event) => {
                                setFirstName(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>

                        <Col>
                          <Form.Group controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                              type="text"
                              value={lastName}
                              onChange={(event) => {
                                setLastName(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="text"
                              value={email}
                              onChange={(event) => {
                                setEmail(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group controlId="Role">
                            <Form.Label>Role</Form.Label>
                            <Form.Check
                              type="switch"
                              id="custom-switch-user"
                              label="Utilisateur"
                              value="2"
                              checked={role_id === 2}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setRole(2);
                                }
                              }}
                            />
                            <Form.Check
                              type="switch"
                              id="custom-switch-admin"
                              label="Administrateur"
                              value="1"
                              checked={role_id === 1}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setRole(1);
                                }
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button
                        // variant="primary"
                        className="mt-2 btn-2 btn-sm me-2"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        Modifier
                      </Button>
                      <Button
                        className="btn-1 btn-sm me-2 mt-2"
                        onClick={() => navigate(-1)}
                      >
                        Retour
                      </Button>
                    </Form>
                  </div>
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
