import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AddEvent = () => {
  const navigate = useNavigate();
  const [titleEvent, setTitleEvent] = useState("");
  const [subtitleEvent, setSubtitleEvent] = useState("");
  const [contentEvent, setContentEvent] = useState("");

  const [pictureEvent, setPictureEvent] = useState("");
  const [validationError, setValidationError] = useState({});
  const changeHandler = (event) => {
    setPictureEvent(event.target.files[0]);
  };

  //Fonction d'ajout de l'article
  const AddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleEvent", titleEvent);
    formData.append("subtitleEvent", subtitleEvent);
    formData.append("contentEvent", contentEvent);
    formData.append("pictureEvent", pictureEvent);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/events`, formData)
      .then(navigate("/events"))
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
                <h4 className="card-title">Création d'un nouvel événement</h4>
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
                  <Form onSubmit={AddEvent}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleEvent">
                          <Form.Label>Titre de l'événement</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleEvent}
                            onChange={(event) => {
                              setTitleEvent(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="subtitleEvent">
                          <Form.Label>Soustitre de l'événement</Form.Label>
                          <Form.Control
                            type="text"
                            value={subtitleEvent}
                            onChange={(event) => {
                              setSubtitleEvent(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="contentEvent">
                          <Form.Label>Contenu de l'événement</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={contentEvent}
                            onChange={(event) => {
                              setContentEvent(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="pictureEvent" className="mb-3">
                          <Form.Label>Image</Form.Label>
                          <Form.Control type="file" onChange={changeHandler} />
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

export default AddEvent;
