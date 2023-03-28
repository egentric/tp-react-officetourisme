import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AddComment = () => {
  const navigate = useNavigate();
  const [titleComment, setTitleComment] = useState("");
  const [contentComment, setContentComment] = useState("");

  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de l'article
  const AddComment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleComment", titleComment);
    formData.append("contentComment", contentComment);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/comments`, formData)
      .then(navigate("/comments"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div>
      <Navigation />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
                  Création d'un nouveau Commentaire
                </h4>
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
                  <Form onSubmit={AddComment}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleComment">
                          <Form.Label>Titre du Commentaire</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleComment}
                            onChange={(event) => {
                              setTitleComment(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="contentComment">
                          <Form.Label>Contenu du Commentaire</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={contentComment}
                            onChange={(event) => {
                              setContentComment(event.target.value);
                            }}
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
                      Créer
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

export default AddComment;
