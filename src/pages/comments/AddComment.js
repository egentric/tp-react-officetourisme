import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "../../components/Navigation";

const AddComment = () => {
  const navigate = useNavigate();
  const { item_id } = useParams();
  const [titleComment, setTitleComment] = useState("");
  const [contentComment, setContentComment] = useState("");
  // const [item_id, setItemId] = useState("");

  const [validationError, setValidationError] = useState({});

  // On récupère l'id du user
  const [user, setUser] = useState([]);
  const [role, setRole] = useState([]);

  const displayUsers = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/current-user`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        setRole(res.data.role_id);
      });
  };
  // console.log(role);

  useEffect(() => {
    displayUsers();
  }, []); // Sans les crochets ça tourne en boucle

  //Fonction d'ajout de l'article
  const AddComment = async (e) => {
    e.preventDefault();
    const user_id = [];
    user_id.push(user.id);

    const formData = new FormData();
    formData.append("titleComment", titleComment);
    formData.append("contentComment", contentComment);
    formData.append("user_id", user_id);
    formData.append("item_id", item_id);
    console.log(item_id);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/comments`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/comments"))
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
                <h4 className="card-title">
                  Création d'un nouveau Commentaire
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
                  <Form onSubmit={AddComment}>
                    <Row>
                      <Col>
                        <Form.Group controlId="titleComment">
                          <Form.Label>Titre du Commentaire</Form.Label>
                          <Form.Control
                            type="text"
                            value={titleComment}
                            onChange={(event) => {
                              setTitleComment(event.target.value);
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="contentComment">
                          <Form.Label>Contenu du Commentaire</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={6}
                            value={contentComment}
                            onChange={(event) => {
                              setContentComment(event.target.value);
                            }}
                          />
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

export default AddComment;
