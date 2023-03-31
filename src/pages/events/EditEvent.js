import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const EditEvent = () => {
  const navigate = useNavigate();
  const { event } = useParams();

  const [titleEvent, setTitleEvent] = useState("");
  const [subtitleEvent, setSubtitleEvent] = useState("");
  const [contentEvent, setContentEvent] = useState("");
  const [sites, setSites] = useState([]);

  const [checkedSites, setCheckedSites] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const [pictureEvent, setPictureEvent] = useState("");
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    getEvent();
    getSites();
  }, []);

  //Méthode pour récupérer les sites
  const getSites = async () => {
    await axios.get("http://localhost:8000/api/sites").then((res) => {
      setSites(res.data.data);
    });
  };
  // console.log(sites);
  // GET - Récupère les valeurs de la fiche avec l'API
  const getEvent = async () => {
    await axios
      .get(`http://localhost:8000/api/events/${event}`)
      .then((res) => {
        // console.log(res.data);
        setTitleEvent(res.data.titleEvent);
        setSubtitleEvent(res.data.subtitleEvent);
        setContentEvent(res.data.contentEvent);
        const ids = res.data.site.map((site) => site.id);
        setCheckedSites(ids);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (event) => {
    setPictureEvent(event.target.files[0]);
  };

  //Fonction de modification de l'article
  const updateEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("titleEvent", titleEvent);
    formData.append("subtitleEvent", subtitleEvent);
    formData.append("contentEvent", contentEvent);

    if (pictureEvent !== null) {
      formData.append("pictureEvent", pictureEvent);
    } // console.log(site_id);

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
      // console.log(pair[0] + ", " + pair[1]);
    }

    // Ajouter les valeurs cochées à formData
    for (const siteId of checkedSites) {
      formData.append("site_id[]", siteId);
    }

    await axios
      .post(`http://127.0.0.1:8000/api/events/${event}`, formData)
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
                    <h4 className="card-title">Modification d'un événement</h4>
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
                              <Form.Label>SousTitre de l'événement</Form.Label>
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
                                rows={8}
                                value={contentEvent}
                                onChange={(event) => {
                                  setContentEvent(event.target.value);
                                }}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <Row>
                          <Col>
                            <div className="mt-4">
                              <label htmlFor="discipline">Sites</label>
                              {sites.map((site) => (
                                <Form.Check
                                  key={site.id}
                                  type="checkbox"
                                  label={site.nameSite}
                                  value={site.id}
                                  defaultChecked={checkedSites.includes(
                                    site.id
                                  )}
                                  onChange={(event) =>
                                    setIsChecked(event.target.checked)
                                  }
                                />
                              ))}
                            </div>
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

export default EditEvent;
