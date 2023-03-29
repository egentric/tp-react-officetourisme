import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const EditType = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [nameType, setNameType] = useState("");
  const [validationError, setValidationError] = useState({});
  useEffect(() => {
    getType();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getType = async () => {
    await axios
      .get(`http://localhost:8000/api/types/${type}`)
      .then((res) => {
        console.log(res.data);
        setNameType(res.data.nameType);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Fonction de modification d'article
  const updateType = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("nameType", nameType);

    await axios
      .post(`http://localhost:8000/api/types/${type}`, formData)
      .then(navigate("/types"))
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
            <div className="col-12 col-sm-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Modifier un type</h4>
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
                    <Form onSubmit={updateType}>
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
                        // variant="primary"
                        className="mt-2 btn-2 btn-sm me-2"
                        size="lg"
                        block="block"
                        type="submit"
                      >
                        Modifier
                      </Button>
                      <Button
                        className="btn-1 btn-sm me-2 mt-2"
                        onClick={() => navigate(-1)}
                      >
                        Retour
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
export default EditType;
