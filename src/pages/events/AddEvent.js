import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AddEvent = () => {
  const navigate = useNavigate();
  const [titleEvent, setTitleEvent] = useState("");
  const [subTitleEvent, setSubTitleEvent] = useState("");
  const [contentEvent, setContentEvent] = useState("");

  //   const [site_id, setSiteId] = useState("");
  const [sites, setSites] = useState([]);

  const [pictureEvent, setPictureEvent] = useState("");
  const [validationError, setValidationError] = useState({});

  const changeHandler = (event) => {
    setPictureEvent(event.target.files[0]);
  };

  useEffect(() => {
    getSites();
  }, []);
  //Méthode pour récupérer les sites
  const getSites = async () => {
    await axios.get("http://localhost:8000/api/sites").then((res) => {
      setSites(res.data.data);
    });
  };

  //Fonction d'ajout de l'article
  const AddEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleEvent", titleEvent);
    formData.append("subtitleEvent", subTitleEvent);
    formData.append("contentEvent", contentEvent);
    formData.append("pictureEvent", pictureEvent);
    // console.log(site_id);

    //Je récupère les valeurs des checkbox
    const checkSites = document.getElementsByName("sites");
    // console.log(checkSites.length);

    for (var i = 0; i < checkSites.length; i++) {
      if (checkSites[i].checked) {
        formData.append("site_id[]", checkSites[i].value);

        // console.log(idSite);
      }
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(sites);
    await axios
      .post(`http://127.0.0.1:8000/api/events`, formData)
      .then(navigate("/events"))
      .catch(({ response }) => {
        if (response.status != 200) {
          setValidationError(response.data);
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
                    <h4 className="card-title">
                      Création d'un nouvel événement
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
                            <Form.Group controlId="subTitleEvent">
                              <Form.Label>SousTitre de l'événement</Form.Label>
                              <Form.Control
                                type="text"
                                value={subTitleEvent}
                                onChange={(event) => {
                                  setSubTitleEvent(event.target.value);
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
                                rows={8}
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
                            <div className="mt-4">
                              <label htmlFor="discipline">Sites</label>
                              {sites.map((site) => (
                                <div key={site.id} className="form-check">
                                  <input
                                    name="sites"
                                    className="form-check-input"
                                    type="checkbox"
                                    value={site.id}
                                    id="flexCheckDefault"
                                  />
                                  <label
                                    className="form-check-label inline-block text-gray-800"
                                    htmlFor="flexCheckDefault"
                                  >
                                    {site.nameSite}
                                  </label>
                                </div>
                              ))}
                            </div>

                            {/* <Form.Group controlId="site">
                              <Form.Label htmlFor="disabledSelect">
                                Sites
                              </Form.Label>
                              {sites.map((site) => (
                                <div key={site.id} className="form-check">
                                  <Form.Check
                                    label={site.nameSite}
                                    name="sites"
                                    type="checkbox"
                                    value={site.id}
                                    id="flexCheckDefault"
                                  />
                                </div>
                              ))}
                            </Form.Group> */}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group
                              controlId="pictureEvent"
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

export default AddEvent;
