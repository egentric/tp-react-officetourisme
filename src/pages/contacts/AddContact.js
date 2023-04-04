import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AddContact = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de l'article
  const AddContact = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("topic", topic);
    formData.append("content", content);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/contacts`, formData)
      .then(navigate("/contacts"))
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
          <div className="col-12 col-sm-12 col-md-6 mt-5">
            <Row>
              <h2 className="mb-4 mt-5">Contactez-nous</h2>
            </Row>
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Envoyer un message</h4>
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
                  <Form onSubmit={AddContact}>
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
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="topic">
                          <Form.Label>Sujet</Form.Label>
                          <Form.Control
                            type="text"
                            value={topic}
                            onChange={(event) => {
                              setTopic(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="content">
                          <Form.Label>Contenu</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={content}
                            onChange={(event) => {
                              setContent(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Button
                      className="btn-2 mt-2 btn-sm"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Envoyer
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

export default AddContact;
