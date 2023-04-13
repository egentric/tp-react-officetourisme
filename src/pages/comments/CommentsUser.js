import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import Sidebar from "cdbreact/dist/components/Sidebar";

const CommentsUser = () => {
  const { user } = useParams();
  const [comments, setComments] = useState([]);

  // On récupère l'id du user
  // const [user, setUser] = useState([]);
  // const [role, setRole] = useState([]);

  // const displayUsers = async () => {
  //   await axios
  //     .get(`http://127.0.0.1:8000/api/current-user`, {
  //       headers: {
  //         Authorization: "Bearer" + localStorage.getItem("access_token"),
  //       },
  //     })
  //     .then((res) => {
  //       setUser(res.data);
  //       // setRole(res.data.role_id);
  //     });
  // };
  console.log(user);

  const displayComments = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/comments/user/${user}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setComments(res.data.data);
      });
  };
  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:8000/api/comments/${id}`, {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("access_token"),
        },
      })
      .then(displayComments);
  };

  useEffect(() => {
    // displayUsers();
    displayComments();
  }, []);
  // Sans les crochets ça tourne en boucle

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
export default CommentsUser;
