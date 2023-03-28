import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";

const EditItem = () => {
  const { item } = useParams();
  const navigate = useNavigate();
  const [titleItem, setTitleItem] = useState("");
  const [subtitleItem, setSubtitleItem] = useState("");
  const [contentItem, setContentItem] = useState("");
  const [pictureItem, setPictureItem] = useState(null);
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getItem();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getItem = async () => {
    await axios
      .get(`http://localhost:8000/api/items/${item}`)
      .then((res) => {
        console.log(res.data);
        setTitleItem(res.data.titleItem);
        setSubtitleItem(res.data.subtitleItem);
        setContentItem(res.data.contentItem);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeHandler = (event) => {
    setPictureItem(event.target.files[0]);
  };
  //Fonction de modification d'article
  const updateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("subtitleItem", subtitleItem);
    formData.append("titleItem", titleItem);
    formData.append("contentItem", contentItem);

    if (pictureItem !== null) {
      formData.append("pictureItem", pictureItem);
    }
    await axios
      .post(`http://localhost:8000/api/items/${item}`, formData)
      .then(navigate("/items"))
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
                <h4 className="card-title">Modifier un article</h4>
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
                  <Form onSubmit={updateItem}>
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
export default EditItem;
