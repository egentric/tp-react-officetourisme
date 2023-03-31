import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowItem = () => {
  const { item } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [showItem, setShowItem] = useState("");

  useEffect(() => {
    displayShowItem();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowItem = async () => {
    await axios
      .get(`http://localhost:8000/api/items/${item}`)
      .then((res) => {
        // console.log(res.data);
        console.log("test");

        setShowItem(res.data[0]);

        setImage(res.data[0].pictureItem);
        console.log(showItem);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteShowItem = (id) => {
    axios.delete(`http://localhost:8000/api/items/${id}`).then(displayShowItem);
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
                  <h4 className="card-title">Article</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Titre</th>
                        <td>{showItem.titleItem}</td>
                      </tr>
                      <tr>
                        <th>Soustitre</th>
                        <td>{showItem.subtitleItem}</td>
                      </tr>
                      <tr>
                        <th>Contenu</th>
                        <td>{showItem.contentItem}</td>
                      </tr>
                      <tr>
                        <th>Nom de l'auteur</th>
                        <td>
                          {showItem.firstName} {showItem.lastName}
                        </td>
                      </tr>
                      <tr>
                        <th>Nom de la Photo</th>
                        <td>{showItem.pictureItem}</td>
                      </tr>
                      <tr>
                        <th>Photo</th>
                        <td>
                          <img
                            src={`http://localhost:8000/storage/uploads/items/${image}`}
                            alt={showItem.pictureItem}
                            width="75px"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>Actions</th>
                        <td>
                          <Button
                            className="btn-1 btn-sm me-2"
                            onClick={() => navigate(-1)}
                          >
                            Retour
                          </Button>

                          <Link
                            to={`/items/edit/${showItem.id}`}
                            className="btn btn-2 btn-sm me-2"
                          >
                            Edit
                          </Link>

                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => {
                              deleteShowItem(showItem.id);
                            }}
                          >
                            Supprimer
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
