import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

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
  const [user_id, setUserId] = useState("");
  const [pictureSite, setPictureSite] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTypes();
    getSite();
  }, []);

  //Méthode pour récupérer les sites
  const getTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      setTypes(res.data.data);
      // console.log(res.data.data);
    });
  };

  // // ------------Récupértion value du Select------------------------------------------//
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // // ------------ Fin Récupértion value du Select------------------------------------------//

  // GET - Récupère les valeurs de la fiche avec l'API
  const getSite = async () => {
    await axios
      .get(`http://localhost:8000/api/sites/${site}`)
      .then((res) => {
        // console.log(res.data);
        setNameSite(res.data[0].nameSite);
        setDescriptionSite(res.data[0].descriptionSite);
        setEmailSite(res.data[0].emailSite);
        setWebsiteSite(res.data[0].websiteSite);
        setPhoneSite(res.data[0].phoneSite);
        setAddressSite(res.data[0].addressSite);
        setZipSite(res.data[0].zipSite);
        setCitySite(res.data[0].citySite);
        setLongitudeDegSite(res.data[0].longitudeDegSite);
        setLatitudeDegSite(res.data[0].latitudeDegSite);
        setUserId(res.data[0].user_id);
        setSelectedValue(res.data[0].type_id);
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
    formData.append("_method", "POST");
    formData.append("nameSite", nameSite);
    formData.append("descriptionSite", descriptionSite);
    formData.append("emailSite", emailSite);
    formData.append("websiteSite", websiteSite);
    formData.append("phoneSite", phoneSite);
    formData.append("addressSite", addressSite);
    formData.append("zipSite", zipSite);
    formData.append("citySite", citySite);
    formData.append("emailSite", emailSite);
    formData.append("longitudeDegSite", longitudeDegSite);
    formData.append("latitudeDegSite", latitudeDegSite);
    formData.append("citySite", citySite);
    formData.append("type_id", selectedValue);
    formData.append("user_id", user_id);

    if (pictureSite !== null) {
      formData.append("pictureSite", pictureSite);
    }
    // console.log(formData);
    // formData.forEach(function (value, key) {
    //   console.log(key + ": " + value);
    // });
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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Création d'un nouveau Site</h4>
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
                          {/* // // ------------Select---------------------------------// */}
                          <Col>
                            <Form.Group controlId="type">
                              <Form.Label>Type de site</Form.Label>
                              <Form.Select
                                value={selectedValue}
                                onChange={handleSelectChange}
                              >
                                {types.map((type) => (
                                  <option
                                    key={type.id}
                                    value={type.id}
                                    selected={type.id === setSelectedValue}
                                  >
                                    {type.nameType}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          {/* // // ------------Fin Select--------------------------------// */}
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
                            <Form.Group
                              controlId="pictureSite"
                              className="mb-3"
                            >
                              <Form.Label>Image</Form.Label>
                              <Form.Control
                                type="file"
                                onChange={changeHandler}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button
                          className="btn-1 btn-sm me-2 mt-2"
                          onClick={() => navigate(-1)}
                        >
                          Retour
                        </Button>
                        <Button
                          className="mt-2 btn-2 btn-sm"
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
      </div>
    </div>
  );
};

export default EditSite;
