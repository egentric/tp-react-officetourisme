import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
// import Sidebar from "cdbreact/dist/components/Sidebar";

const Comments = () => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    displayComments();
  }, []);
  // Sans les crochets ça tourne en boucle

  const displayComments = async () => {
    await axios.get("http://localhost:8000/api/comments").then((res) => {
      setComments(res.data.data);
    });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`)
      .then(displayComments);
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
                  <h4 className="card-title">Commentaires</h4>
                  <hr />

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Titres</th>
                        <th>De l'articles</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments.map((comment) => (
                        <tr key={comment.id}>
                          <td>{comment.titleComment}</td>
                          <td>{comment.titleItem}</td>
                          <td>
                            {/*   <Link
                    to={`/comments/edit/${comment.id}`}
                    className="btn btn-success me-2"
                  >
                    Edit
                  </Link> */}
                            <Link
                              to={`/comments/show/${comment.id}`}
                              className="btn btn-2 btn-sm me-2"
                            >
                              Voir
                            </Link>

                            <Button
                              className="btn-sm"
                              variant="danger"
                              onClick={() => {
                                deleteComment(comment.id);
                              }}
                            >
                              Supprimer
                            </Button>
                          </td>
                        </tr>
                      ))}
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
export default Comments;
