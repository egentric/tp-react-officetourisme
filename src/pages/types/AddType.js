import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const AddType = () => {
  const navigate = useNavigate();
  const [nameType, setNameType] = useState("");
  const [validationError, setValidationError] = useState({});

  //Fonction d'ajout de l'article
  const AddType = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nameType", nameType);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await axios
      .post(`http://127.0.0.1:8000/api/types`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/types"))
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
                    <h4 className="card-title">Création d'un nouveau Type</h4>
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
                      <Form onSubmit={AddType}>
                        <Row>
                          <Col>
                            <Form.Group controlId="nameType">
                              <Form.Label>Type</Form.Label>
                              <Form.Control
                                type="text"
                                value={nameType}
                                onChange={(event) => {
                                  setNameType(event.target.value);
                                }}
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

export default AddType;
