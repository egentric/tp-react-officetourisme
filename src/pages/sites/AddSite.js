import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  const [user_id, setUserId] = useState(1);

  const [pictureSite, setPictureSite] = useState("");
  const [validationError, setValidationError] = useState({});
  const changeHandler = (event) => {
    setPictureSite(event.target.files[0]);
  };

  // // ------------Affichage Select----------------------------------------//
  // état pour stocker les types de site
  const [types, setTypes] = useState([]);
  // Ajouter les types de site dans l'état "types" à partir d'une API ou d'une liste
  useEffect(() => {
    getTypes();
  }, []);
  //Méthode pour récupérer les sites
  const getTypes = async () => {
    await axios.get("http://localhost:8000/api/types").then((res) => {
      setTypes(res.data.data);
      // console.log(res.data.data);
    });
  };
  // // ------------Fin Affichage Select------------------------------------------//

  // // ------------Récupértion value du Select------------------------------------------//
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  // // ------------ Fin Récupértion value du Select------------------------------------------//

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
    formData.append("longitudeDegSite", longitudeDegSite);
    formData.append("latitudeDegSite", latitudeDegSite);
    formData.append("pictureSite", pictureSite);
    formData.append("user_id", user_id);

    formData.append("type_id", selectedValue);

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
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: "1", display: "inline-flex" }}>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-12">
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
                          {/* // // ------------Select---------------------------------// */}
                          <Col>
                            <Form.Group controlId="type">
                              <Form.Label>Type de site</Form.Label>
                              <Form.Select
                                value={selectedValue}
                                onChange={handleSelectChange}
                              >
                                <option>Sélectionner un type :</option>
                                {types.map((type) => (
                                  <option key={type.id} value={type.id}>
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
                              <CKEditor
                                editor={ClassicEditor}
                                config={{
                                  toolbar: [
                                    "heading",
                                    "|",
                                    "bold",
                                    "italic",
                                    "link",
                                    "bulletedList",
                                    "numberedList",
                                    "blockQuote",
                                  ],
                                }}
                                data="<p>Contenu</p>"
                                onReady={(editor) => {
                                  // You can store the "editor" and use when it is needed.
                                  console.log(
                                    "Editor is ready to use!",
                                    editor
                                  );
                                }}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  console.log({ event, editor, data });
                                  setDescriptionSite(data);
                                }}
                                onBlur={(event, editor) => {
                                  console.log("Blur.", editor);
                                }}
                                onFocus={(event, editor) => {
                                  console.log("Focus.", editor);
                                }}
                              />

                              {/* <Form.Control
                                as="textarea"
                                rows={8}
                                value={descriptionSite}
                                onChange={(event) => {
                                  setDescriptionSite(event.target.value);
                                }}
                              /> */}
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
                          className="btn-2 mt-2 btn-sm"
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
      </div>
    </div>
  );
};

export default AddSite;
