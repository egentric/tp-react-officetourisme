import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Events from "./Events";

const EditEvent = () => {
  const { event } = useParams();
  const navigate = useNavigate();
  const [titleEvent, setTitleEvent] = useState("");
  const [subtitleEvent, setSubtitleEvent] = useState("");
  const [contentEvent, setContentEvent] = useState("");
  const [pictureEvent, setPictureEvent] = useState(null);
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getEvent();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getEvent = async () => {
    await axios
      .get(`http://localhost:8000/api/events/${event}`)
      .then((res) => {
        console.log(res.data);
        setTitleEvent(res.data.titleEvent);
        setSubtitleEvent(res.data.subtitleEvent);
        setContentEvent(res.data.contentEvent);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (event) => {
    setPictureEvent(event.target.files[0]);
  };
  //Fonction de modification d'article
  const updateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("subtitleEventm", subtitleEvent);
    formData.append("titleEvent", titleEvent);
    formData.append("contentEvent", contentEvent);

    if (pictureEvent !== null) {
      formData.append("pictureEvent", pictureEvent);
    }
    await axios
      .post(`http://localhost:8000/api/events/${Events}`, formData)
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un événement</h4>
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
                  <Form onSubmit={updateEvent}>
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
export default EditEvent;
