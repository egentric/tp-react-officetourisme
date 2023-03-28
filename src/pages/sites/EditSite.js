import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";

const EditSite = () => {
  const { site } = useParams();
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
  useEffect(() => {
    getSite();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getSite = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/${site}`)
      .then((res) => {
        console.log(res.data);
        setNameSite(res.data.nameSite);
        setDescriptionSite(res.data.descriptionSite);
        setEmailSite(res.data.emailSite);
        setWebsiteSite(res.data.websiteSite);
        setPhoneSite(res.data.phoneSite);
        setAddressSite(res.data.addressSite);
        setZipSite(res.data.zipSite);
        setCitySite(res.data.citySite);
        setLongitudeDegSite(res.data.longitudeDegSite);
        setLatitudeDegSite(res.data.latitudeDegSite);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (event) => {
    setPictureSite(event.target.files[0]);
  };
  //Fonction de modification d'article
  const updateSite = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
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

    if (pictureSite !== null) {
      formData.append("pictureSite", pictureSite);
    }
    await axios
      .post(`http://localhost:8000/api/sites/${site}`, formData)
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
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Modifier un Site</h4>
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
                  <Form onSubmit={updateSite}>
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
export default EditSite;
