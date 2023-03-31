import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AddItem = () => {
  const navigate = useNavigate();
  const [titleItem, setTitleItem] = useState("");
  const [subtitleItem, setSubtitleItem] = useState("");
  const [contentItem, setContentItem] = useState("");
  const [user_id, setUserId] = useState("");

  const [pictureItem, setPictureItem] = useState("");
  const [validationError, setValidationError] = useState({});
  const changeHandler = (event) => {
    setPictureItem(event.target.files[0]);
  };

  //Fonction d'ajout de l'article
  const AddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titleItem", titleItem);
    formData.append("subtitleItem", subtitleItem);
    formData.append("contentItem", contentItem);
    formData.append("pictureItem", pictureItem);
    formData.append("user_id", user_id);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/items`, formData)
      .then(navigate("/items"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: "1", display: "inline-flex" }}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Création d'un nouvel article</h4>
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
                    <Form onSubmit={AddItem}>
                      <Row>
                        <Col>
                          <Form.Group controlId="titleItem">
                            <Form.Label>Titre de l'article</Form.Label>
                            <Form.Control
                              type="text"
                              value={titleItem}
                              onChange={(event) => {
                                setTitleItem(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="subtitleItem">
                            <Form.Label>Soustitre de l'article</Form.Label>
                            <Form.Control
                              type="text"
                              value={subtitleItem}
                              onChange={(event) => {
                                setSubtitleItem(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="contentItem">
                            <Form.Label>Contenu de l'article</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={6}
                              value={contentItem}
                              onChange={(event) => {
                                setContentItem(event.target.value);
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="pictureItem" className="mb-3">
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
  );
};

export default AddItem;
