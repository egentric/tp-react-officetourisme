import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditItem = () => {
  const { item } = useParams();
  const navigate = useNavigate();
  const [titleItem, setTitleItem] = useState("");
  const [subtitleItem, setSubtitleItem] = useState("");
  const [contentItem, setContentItem] = useState("");
  const [pictureItem, setPictureItem] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [user_id, setUserId] = useState("");

  useEffect(() => {
    getItem();
  }, []);

  // GET - Récupère les valeurs de la fiche avec l'API
  const getItem = async () => {
    await axios.get(`http://localhost:8000/api/items/${item}`).then((res) => {
      console.log(res.data);
      setTitleItem(res.data.item.titleItem);
      setSubtitleItem(res.data.item.subtitleItem);
      setContentItem(res.data.item.contentItem);
      setUserId(res.data.item.user_id);
      console.log(res.data.item.titleItem);
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  };
  const changeHandler = (event) => {
    setPictureItem(event.target.files[0]);
  };
  //Fonction de modification d'article
  const updateItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "POST");
    formData.append("subtitleItem", subtitleItem);
    formData.append("titleItem", titleItem);
    formData.append("contentItem", contentItem);
    formData.append("user_id", user_id);

    if (pictureItem !== null) {
      formData.append("pictureItem", pictureItem);
    }
    await axios
      .post(`http://localhost:8000/api/items/${item}`, formData, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(navigate("/items"))
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
              <div className="col-12 col-sm-12 col-md-10">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Modifier un Article</h4>
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
                                data={contentItem}
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
                                  setContentItem(data);
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
                                rows={6}
                                value={contentItem}
                                onChange={(event) => {
                                  setContentItem(event.target.value);
                                }}
                              /> */}
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group
                              controlId="pictureItem"
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
export default EditItem;
