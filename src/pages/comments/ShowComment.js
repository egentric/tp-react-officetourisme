import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const ShowComment = () => {
  const { comment } = useParams();
  const navigate = useNavigate();
  const [showComment, setShowComment] = useState([]);

  useEffect(() => {
    displayShowComment();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayShowComment = async () => {
    await axios
      .get(`http://localhost:8000/api/comments/${comment}`)
      .then((res) => {
        console.log(res.data);
        setShowComment(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteShowComment = (id) => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(() => {
        displayShowComment();
        navigate(-1); // Navigation à la page précédente
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
                  <h4 className="card-title">Commentaire</h4>
                  <hr />
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <th>Titre</th>
                        <td>{showComment.titleComment}</td>
                      </tr>
                      <tr>
                        <th>Contenu</th>
                        <td>{showComment.contentComment}</td>
                      </tr>
                      <tr>
                        <th>De l'article</th>
                        <td>{showComment.titleItem}</td>
                      </tr>
                      <tr>
                        <th>Nom de l'auteur</th>
                        <td>
                          {showComment.firstName} {showComment.lastName}
                        </td>
                      </tr>
                      <tr>
                        <th>Actions</th>
                        <td>
                          {/* <Link
                            to={`/comments/edit/${comment.id}`}
                            className="btn btn-1 btn-sm me-2"
                          >
                            Edit
                          </Link> */}
                          <Button
                            className="btn-1 btn-sm me-2"
                            onClick={() => navigate(-1)}
                          >
                            Retour
                          </Button>
                          <Button
                            className="btn-sm"
                            variant="danger"
                            onClick={() => {
                              deleteShowComment(showComment.id);
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

export default ShowComment;
