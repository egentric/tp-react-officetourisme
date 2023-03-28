import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AddSite = () => {
  const navigate = useNavigate();
  const [nameSite, setNameSite] = useState("");
  const [descriptionSite, setDescriptionSite] = useState("");
  const [emailSite, setEmailSite] = useState("");
  const [websiteSite, setWebsiteSite] = useState("");
  const [phoneSite, setPhoneSite] = useState("");
  const [addressSite, setAddressSite] = useState("");
  const [zipSite, setZipSite] = useState("");
  const [citySite, setCitySite] = useState("");
  const [longitudeDegSite, setLongitudeDegSite] = useState("");
  const [latitudeDegSite, setLatitudeDegSite] = useState("");

  const [pictureSite, setPictureSite] = useState("");
  const [validationError, setValidationError] = useState({});
  const changeHandler = (event) => {
    setPictureSite(event.target.files[0]);
  };

  //Fonction d'ajout de l'article
  const AddSite = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameSite", nameSite);
    formData.append("descriptionSite", descriptionSite);
    formData.append("emailSite", emailSite);
    formData.append("websiteSite", websiteSite);
    formData.append("phoneSite", phoneSite);
    formData.append("addressSite", addressSite);
    formData.append("zipSite", zipSite);
    formData.append("citySite", citySite);
    formData.append("emailSite", emailSite);
    formData.append("citySite", citySite);
    formData.append("pictureSite", pictureSite);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/sites`, formData)
      .then(navigate("/sites"))
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
                <h4 className="card-title">Création d'un nouvel Site</h4>
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
                  <Form onSubmit={AddSite}>
                    <Row>
                      <Col>
                        <Form.Group controlId="nameSite">
                          <Form.Label>Nom du site</Form.Label>
                          <Form.Control
                            type="text"
                            value={nameSite}
                            onChange={(event) => {
                              setNameSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group controlId="descriptionSite">
                          <Form.Label>Description du site</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={8}
                            value={descriptionSite}
                            onChange={(event) => {
                              setDescriptionSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="emailSite">
                          <Form.Label>email</Form.Label>
                          <Form.Control
                            type="text"
                            value={emailSite}
                            onChange={(event) => {
                              setEmailSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="websiteSite">
                          <Form.Label>Site internet</Form.Label>
                          <Form.Control
                            type="text"
                            value={websiteSite}
                            onChange={(event) => {
                              setWebsiteSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="phoneSite">
                          <Form.Label>Téléphone</Form.Label>
                          <Form.Control
                            type="text"
                            value={phoneSite}
                            onChange={(event) => {
                              setPhoneSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="addressSite">
                          <Form.Label>Adresse</Form.Label>
                          <Form.Control
                            type="text"
                            value={addressSite}
                            onChange={(event) => {
                              setAddressSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="zipSite">
                          <Form.Label>Code Postal</Form.Label>
                          <Form.Control
                            type="text"
                            value={zipSite}
                            onChange={(event) => {
                              setZipSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="citySite">
                          <Form.Label>Ville</Form.Label>
                          <Form.Control
                            type="text"
                            value={citySite}
                            onChange={(event) => {
                              setCitySite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="longitudeDegSite">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="text"
                            value={longitudeDegSite}
                            onChange={(event) => {
                              setLongitudeDegSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="latitudeDegSite">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                            type="text"
                            value={latitudeDegSite}
                            onChange={(event) => {
                              setLatitudeDegSite(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="pictureSite" className="mb-3">
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

export default AddSite;
